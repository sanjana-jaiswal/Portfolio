import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { useMagneticButton } from '../hooks/useMagneticButton';
import { RotatingText } from './RotatingText';
import GradientText from './GradientText';


export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const workBtnRef = useMagneticButton(0.25);
  const contactBtnRef = useMagneticButton(0.25);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse interactive coordinates
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particles array
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      speed: number;
      angle: number;
      r: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        speed: 0.5 + Math.random() * 1.5,
        angle: Math.random() * Math.PI * 2,
        r: 1 + Math.random() * 2,
      });
    }

    const animate = () => {
      // Clear canvas using transparent clearing to show the WebGL backdrop below
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw faint floating particle orbs
      particles.forEach((p) => {
        // Subtle orbital floating motion
        p.angle += 0.005;
        p.x = p.baseX + Math.cos(p.angle) * 30;
        p.y = p.baseY + Math.sin(p.angle) * 30;

        // Interaction with mouse pointer
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.x -= (dx / dist) * force * 15;
          p.y -= (dy / dist) * force * 15;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 106, 26, 0.15)'; // Ambient rust color
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden py-24">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="mx-auto w-full max-w-7xl px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Heading Name */}
          <h1 className="mb-4 font-heading text-5xl font-extrabold tracking-tight text-text-primary sm:text-7xl lg:text-8xl">
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="inline-block"
            >
              <GradientText
                colors={["#FF6A1A", "#FF8C42", "#FF6A1A", "#B33600", "#FF6A1A"]}
                animationSpeed={6}
                showBorder={false}
                className="p-0 select-none bg-transparent justify-start mx-0 max-w-none cursor-default"
              >
                Sanjana Jaiswal
              </GradientText>
            </motion.div>
          </h1>

          {/* Title */}
          <h2 className="mb-6 font-heading text-2xl font-semibold text-text-secondary sm:text-4xl flex flex-wrap items-center gap-x-2">
            <span className="text-text-secondary">GenAI &</span>
            <RotatingText
              texts={['Full-Stack Engineer', 'Agentic AI Developer', 'RAG Architect', 'n8n Workflow Automations']}
              mainClassName="text-accent inline-flex overflow-hidden py-0.5"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
              splitBy="words"
              auto
              loop
            />
          </h2>

          {/* Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mb-10 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            I build autonomous AI agent architectures, intelligent data processing workflows, and premium full-stack web applications using Python, ML, and the MERN stack.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <button
              ref={workBtnRef}
              onClick={() => handleScrollTo('syndra')}
              className="group flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-body text-sm font-bold text-bg shadow-lg shadow-accent/15 transition-all hover:bg-accent-hover hover:shadow-accent-glow-strong"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              ref={contactBtnRef}
              onClick={() => handleScrollTo('contact')}
              className="flex items-center gap-2 rounded-lg border border-border bg-surface/80 px-6 py-3 font-body text-sm font-bold text-text-primary backdrop-blur-sm transition-all hover:border-accent hover:bg-surface hover:text-accent hover:shadow-accent-glow"
            >
              Get in Touch
              <Mail className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative side accent line */}
      <div className="absolute right-0 bottom-0 top-0 w-[1px] bg-gradient-to-b from-transparent via-border/50 to-transparent" />
    </section>
  );
};
