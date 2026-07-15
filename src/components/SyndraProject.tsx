import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SyndraGraph } from './SyndraGraph';

export const SyndraProject: React.FC = () => {
  const { ref, inView } = useScrollReveal(0.1);

  const capabilities = [
    'Multi-agent orchestration & coordination',
    'Dynamic task dependency management',
    'Parallel execution of agent sub-workflows',
    'Execution visibility via interactive DAG visualizations',
    'Agent telemetry, logs, and traceability outputs',
    'Automated report generation and source attribution',
  ];

  return (
    <section id="syndra" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ghost Numeral Background */}
      <div className="absolute right-6 bottom-0 font-heading text-[18rem] md:text-[26rem] font-black text-white/[0.015] select-none pointer-events-none leading-none z-0">
        02
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="mb-12">
            <h2 className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-accent">
              02. Recent Project
            </h2>
            <h3 className="font-heading text-3xl font-bold text-text-primary sm:text-5xl">
              Syndra
            </h3>
            <p className="mt-2 font-body text-base text-text-muted">
              Multi-Agent AI Automation & Orchestration Platform
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {['SerpApi', 'Python', 'Redis', 'FastAPI', 'React', 'Tailwind CSS'].map((tech, idx) => (
                  <span key={idx} className="rounded bg-accent/10 border border-accent/20 px-2.5 py-0.5 font-body text-xs font-semibold text-accent">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href="https://github.com/sanjana-jaiswal/Syndra.git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1 font-body text-xs font-bold text-text-primary hover:border-accent hover:text-accent hover:shadow-accent-glow transition-all"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>View Repository</span>
              </a>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Project Copy */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="font-body text-base leading-relaxed text-text-secondary mb-6">
                  Syndra started out as weekend curiosity about AI agents and grew into an ongoing project exploring how independent, specialized agents can coordinate work — moving beyond simple single-turn chat interfaces to structured multi-agent workflows.
                </p>
                <p className="font-body text-base leading-relaxed text-text-secondary mb-8">
                  Concept: Provide a high-level goal, which the coordinator decomposes into dependent sub-tasks. Specialized agents are then assigned tasks, executing them sequentially or in parallel, while tracking metadata and outputs.
                </p>

                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-text-primary mb-4">
                  Key Capabilities
                </h4>
                <ul className="space-y-3 mb-8">
                  {capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-body text-sm text-text-secondary">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Authenticity Note */}
              <div className="rounded-lg border border-border/80 bg-surface/50 p-4 border-l-4 border-l-accent">
                <h5 className="font-heading text-xs font-bold text-text-primary mb-1 uppercase tracking-wider">
                  Development Stage: Active Experiment
                </h5>
                <p className="font-body text-xs text-text-muted">
                  Honestly built as an ongoing learning experiment. Highlighting authenticity in tech design: testing architectures, refining coordination loops, and learning dependency parsing firsthand.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Graphic & Terminal Dashboard */}
            <div className="lg:col-span-7">
              <SyndraGraph />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
