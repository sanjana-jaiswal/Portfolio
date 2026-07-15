import React, { useRef, useEffect, useState } from 'react';
import { Terminal as TerminalIcon, RotateCcw } from 'lucide-react';

interface LogLine {
  id: string;
  text: string;
  type: 'info' | 'agent' | 'success' | 'warn';
  timestamp: string;
}

export const SyndraGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [currentStep, setCurrentStep] = useState(0); // 0 to 6
  const [isRunning, setIsRunning] = useState(true);

  // Steps configuration for the simulation
  const steps = [
    {
      activeNode: 't1-t4',
      log: 'User request received: "Analyze GenAI developer adoption trends & generate report"',
      logType: 'info' as const,
      nodeStatus: { t1: 'active', t2: 'active', t3: 'active', t4: 'active' }
    },
    {
      activeNode: 't1-t4-success',
      log: '[web_search] t1 (web_search) completed successfully. Found 12 papers.\n[web_search] t2 (web_search) completed successfully. Extracted API logs.\n[web_search] t3 (web_search) completed successfully. Crawled dev forum.\n[web_search] t4 (web_search) completed successfully. Analyzed GitHub repo metrics.',
      logType: 'success' as const,
      nodeStatus: { t1: 'success', t2: 'success', t3: 'success', t4: 'success' }
    },
    {
      activeNode: 't5',
      log: '[Orchestrator] Input parameters gathered. Dispatching t5 (code) agent to compile results...',
      logType: 'agent' as const,
      nodeStatus: { t1: 'success', t2: 'success', t3: 'success', t4: 'success', t5: 'active' }
    },
    {
      activeNode: 't5-success',
      log: '[code] t5 (code) finished compilation. Generated 3 linecharts and formatted data tables.',
      logType: 'success' as const,
      nodeStatus: { t1: 'success', t2: 'success', t3: 'success', t4: 'success', t5: 'success' }
    },
    {
      activeNode: 't6',
      log: '[Reporter] Merging context windows and compiling final report...',
      logType: 'agent' as const,
      nodeStatus: { t1: 'success', t2: 'success', t3: 'success', t4: 'success', t5: 'success', t6: 'active' }
    },
    {
      activeNode: 'done',
      log: '[System] Report compiled successfully: syndra_adoption_report.pdf [4.2MB].',
      logType: 'success' as const,
      nodeStatus: { t1: 'success', t2: 'success', t3: 'success', t4: 'success', t5: 'success', t6: 'success' }
    },
    {
      activeNode: 'idle',
      log: 'System sleeping. Awaiting next orchestration cycle.',
      logType: 'info' as const,
      nodeStatus: { t1: 'idle', t2: 'idle', t3: 'idle', t4: 'idle', t5: 'idle', t6: 'idle' }
    }
  ];

  // Helper to format timestamp
  const getTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  // Add logs on step transitions
  useEffect(() => {
    if (!isRunning) return;

    const currentStepConfig = steps[currentStep];
    const newLogs = currentStepConfig.log.split('\n').map((line, idx) => ({
      id: `${currentStep}-${idx}-${Date.now()}`,
      text: line,
      type: currentStepConfig.logType,
      timestamp: getTimestamp()
    }));

    if (currentStep === 0) {
      setLogs(newLogs);
    } else {
      setLogs(prev => [...prev, ...newLogs]);
    }

    // Schedule next step
    const timer = setTimeout(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, currentStep === 6 ? 4000 : 2500); // Wait longer at idle state before loop restart

    return () => clearTimeout(timer);
  }, [currentStep, isRunning]);

  // Auto-scroll logs inside terminal container without window hijack
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Handle canvas rendering and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 270);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = 270;
    };
    window.addEventListener('resize', handleResize);

    // Nodes positions (centered relative to canvas width/height)
    const getNodes = () => {
      const activeStatus = steps[currentStep].nodeStatus as any;
      return [
        { id: 't1', label: 't1 (web_search)', x: width * 0.18, y: height * 0.15, status: activeStatus.t1 || 'idle' },
        { id: 't2', label: 't2 (web_search)', x: width * 0.18, y: height * 0.38, status: activeStatus.t2 || 'idle' },
        { id: 't3', label: 't3 (web_search)', x: width * 0.18, y: height * 0.62, status: activeStatus.t3 || 'idle' },
        { id: 't4', label: 't4 (web_search)', x: width * 0.18, y: height * 0.85, status: activeStatus.t4 || 'idle' },
        { id: 't5', label: 't5 (code)', x: width * 0.5, y: height * 0.5, status: activeStatus.t5 || 'idle' },
        { id: 't6', label: 't6 (report)', x: width * 0.82, y: height * 0.5, status: activeStatus.t6 || 'idle' },
      ];
    };

    // Connections (edges)
    const connections = [
      { from: 't1', to: 't5' },
      { from: 't2', to: 't5' },
      { from: 't3', to: 't5' },
      { from: 't4', to: 't5' },
      { from: 't5', to: 't6' },
    ];

    let pulseOffset = 0;

    const draw = () => {
      ctx.fillStyle = '#161616';
      ctx.fillRect(0, 0, width, height);

      const currentNodes = getNodes();
      const nodeMap = new Map(currentNodes.map(n => [n.id, n]));

      // 1. Draw Connection Lines (Edges)
      connections.forEach(({ from, to }) => {
        const startNode = nodeMap.get(from);
        const endNode = nodeMap.get(to);
        if (!startNode || !endNode) return;

        // Determine link styling based on node execution status
        let isPathActive = false;
        if (startNode.status === 'success' && endNode.status === 'active') {
          isPathActive = true;
        } else if (startNode.status === 'active' && endNode.id === 't5') {
          isPathActive = true;
        }

        ctx.beginPath();
        ctx.moveTo(startNode.x, startNode.y);

        // Render curved paths matching design upload
        if (startNode.id.startsWith('t') && endNode.id === 't5') {
          const controlX = (startNode.x + endNode.x) / 2;
          const controlY = startNode.y;
          ctx.quadraticCurveTo(controlX, controlY, endNode.x, endNode.y);
          ctx.setLineDash([4, 4]);
        } else if (startNode.id === 't5' && endNode.id === 't6') {
          const controlX = (startNode.x + endNode.x) / 2;
          const controlY = startNode.y - 30; // slightly upward curve
          ctx.quadraticCurveTo(controlX, controlY, endNode.x, endNode.y);
          ctx.setLineDash([]);
        } else {
          ctx.lineTo(endNode.x, endNode.y);
          ctx.setLineDash([]);
        }

        ctx.lineWidth = isPathActive ? 2 : 1;
        ctx.strokeStyle = isPathActive ? 'rgba(255, 106, 26, 0.5)' : '#2C2C2C';
        ctx.stroke();
        ctx.setLineDash([]); // Reset default dash

        // 2. Draw Moving Glowing Pulses along active connections
        if (isPathActive) {
          const t = (pulseOffset % 100) / 100;
          let pulseX = startNode.x;
          let pulseY = startNode.y;

          if (startNode.id.startsWith('t') && endNode.id === 't5') {
            const controlX = (startNode.x + endNode.x) / 2;
            const controlY = startNode.y;
            pulseX = (1 - t) * (1 - t) * startNode.x + 2 * (1 - t) * t * controlX + t * t * endNode.x;
            pulseY = (1 - t) * (1 - t) * startNode.y + 2 * (1 - t) * t * controlY + t * t * endNode.y;
          } else if (startNode.id === 't5' && endNode.id === 't6') {
            const controlX = (startNode.x + endNode.x) / 2;
            const controlY = startNode.y - 30;
            pulseX = (1 - t) * (1 - t) * startNode.x + 2 * (1 - t) * t * controlX + t * t * endNode.x;
            pulseY = (1 - t) * (1 - t) * startNode.y + 2 * (1 - t) * t * controlY + t * t * endNode.y;
          }

          // Pulse glow
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#FF8C42';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FF6A1A';
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        }
      });

      pulseOffset = (pulseOffset + 1.2) % 100;

      // 3. Draw Nodes
      currentNodes.forEach(node => {
        // Colors based on status
        let circleColor = '#161616';
        let strokeColor = '#2C2C2C';
        let textColor = '#A0A0A0';
        let glowSize = 0;

        if (node.status === 'active') {
          circleColor = '#1D1310';
          strokeColor = '#FF6A1A';
          textColor = '#F4F1EC';
          glowSize = 10 + Math.sin(Date.now() / 150) * 4; // pulsing glow
        } else if (node.status === 'success') {
          circleColor = '#101612';
          strokeColor = '#10B981';
          textColor = '#F4F1EC';
        }

        // Draw shadow/glow
        if (glowSize > 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
          ctx.shadowBlur = glowSize;
          ctx.shadowColor = '#FF6A1A';
          ctx.fillStyle = 'rgba(255, 106, 26, 0.1)';
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }

        // Base Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = circleColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        // 4. Draw Custom Icons inside Nodes (Search, Laptop/Code, Report/Chart)
        if (node.id.startsWith('t') && node.id !== 't5' && node.id !== 't6') {
          // Search Icon (Magnifying Glass)
          ctx.strokeStyle = node.status === 'active' || node.status === 'success' ? '#F4F1EC' : '#5A5A5A';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(node.x - 2, node.y - 2, 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(node.x + 1, node.y + 1);
          ctx.lineTo(node.x + 5, node.y + 5);
          ctx.stroke();
        } else if (node.id === 't5') {
          // Laptop Icon
          ctx.strokeStyle = node.status === 'active' || node.status === 'success' ? '#F4F1EC' : '#5A5A5A';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(node.x - 6, node.y - 6, 12, 8);
          ctx.beginPath();
          ctx.moveTo(node.x - 9, node.y + 3);
          ctx.lineTo(node.x + 9, node.y + 3);
          ctx.stroke();
        } else if (node.id === 't6') {
          // Report Icon (Bar Chart)
          ctx.fillStyle = node.status === 'active' || node.status === 'success' ? '#F4F1EC' : '#5A5A5A';
          ctx.fillRect(node.x - 5, node.y - 3, 2.5, 7);
          ctx.fillRect(node.x - 1, node.y - 6, 2.5, 10);
          ctx.fillRect(node.x + 3, node.y - 1, 2.5, 5);
        }

        // Node Title Text (Label below the node)
        ctx.font = '500 10px Inter';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 28);

        // Status Badges at the top-right of the node
        if (node.status === 'success') {
          ctx.beginPath();
          ctx.arc(node.x + 11, node.y - 11, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#10B981';
          ctx.fill();
          ctx.strokeStyle = '#161616';
          ctx.lineWidth = 1;
          ctx.stroke();
          // Checkmark
          ctx.font = 'bold 7px Arial';
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.fillText('✓', node.x + 11, node.y - 9);
        } else if (node.status === 'active') {
          ctx.beginPath();
          ctx.arc(node.x + 11, node.y - 11, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFA500';
          ctx.fill();
          ctx.strokeStyle = '#161616';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(node.x + 11, node.y - 11, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#2C2C2C';
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [currentStep]);

  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface overflow-hidden shadow-xl">
      {/* Panel Top Header Bar */}
      <div className="flex items-center justify-between border-b border-border bg-[#1F1F1F]/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#EF4444]/80" />
            <span className="h-3 w-3 rounded-full bg-[#F59E0B]/80" />
            <span className="h-3 w-3 rounded-full bg-[#10B981]/80" />
          </div>
          <span className="ml-2 font-heading text-xs font-bold uppercase tracking-wider text-text-secondary">
            Syndra // Agent Execution DAG
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center justify-center rounded bg-[#2c2c2c] px-2.5 py-1 text-[10px] font-bold uppercase text-text-primary hover:bg-[#3d3d3d] transition-colors"
          >
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={() => {
              setCurrentStep(0);
              setLogs([]);
              setIsRunning(true);
            }}
            className="flex h-5 w-5 items-center justify-center rounded bg-[#2c2c2c] text-text-primary hover:bg-[#3d3d3d] transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* DAG Visualization Canvas */}
      <div className="relative border-b border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" />
        <div className="absolute bottom-2 right-3 font-body text-[10px] text-text-muted">
          * Simulated live dependency telemetry node-mesh
        </div>
      </div>

      {/* Telemetry Log Terminal */}
      <div className="flex flex-col bg-[#080808] p-4">
        <div className="mb-2 flex items-center gap-1.5 font-body text-xs font-semibold text-accent">
          <TerminalIcon className="h-3.5 w-3.5" />
          <span>CONSOLE TELEMETRY OUTPUT</span>
        </div>

        <div
          ref={terminalContainerRef}
          className="h-32 overflow-y-auto font-mono text-[11px] leading-relaxed text-[#00FF66]/80 space-y-1.5 pr-2 select-text"
        >
          {logs.map((log) => {
            let color = 'text-[#00FF66]/80'; // default success/good info
            if (log.type === 'info') color = 'text-text-secondary';
            if (log.type === 'agent') color = 'text-accent';
            if (log.type === 'warn') color = 'text-yellow-500';

            return (
              <div key={log.id} className="flex items-start gap-2 border-b border-white/[0.02] pb-0.5">
                <span className="text-text-muted flex-shrink-0">[{log.timestamp}]</span>
                <span className={`whitespace-pre-line ${color}`}>{log.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
