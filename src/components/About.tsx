import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const About: React.FC = () => {
  const { ref, inView } = useScrollReveal(0.15);
  const [shouldReduceMotion, setShouldReduceMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleQueryChange);
    return () => mediaQuery.removeEventListener('change', handleQueryChange);
  }, []);

  return (
    <section id="about" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ghost Numeral Background to fill bottom dead space */}
      <div className="absolute right-6 bottom-0 font-heading text-[18rem] md:text-[26rem] font-black text-white/[0.015] select-none pointer-events-none leading-none z-0">
        01
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12"
        >
          {/* Left Column - Stats & Focus */}
          <div className="lg:col-span-5 flex flex-col justify-center relative pl-6 border-l border-border/40">
            {/* Bright accent line at the top of the container border to anchor the numbering */}
            <div className="absolute left-[-1.5px] top-0 h-12 w-[2px] bg-accent shadow-accent-glow" />

            <h2 className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-accent">
              01. About Me
            </h2>
            <h3 className="mb-8 font-heading text-3xl font-bold text-text-primary sm:text-4xl leading-tight">
              Engineering Intelligent Full-Stack Systems
            </h3>
            
            {/* Asymmetric layout of stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Featured Focus: Agentic AI Card (Spans full width, highlighted border) */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                className="col-span-2 rounded-lg border border-accent/40 bg-surface/40 p-6 shadow-md hover:border-accent hover:shadow-accent-glow transition-all duration-300 cursor-default"
              >
                <div className="font-body text-xs text-accent/80 font-bold uppercase tracking-wider mb-1.5">Focus</div>
                <div className="font-heading text-2xl font-black text-text-primary">Generative & Agentic AI</div>
              </motion.div>

              {/* Standard Core Stack Card */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                className="col-span-1 rounded-lg border border-border bg-surface p-5 shadow-sm hover:border-accent/40 hover:shadow-accent-glow/50 transition-all duration-300 cursor-default"
              >
                <div className="font-body text-xs text-text-muted mb-1">Core Stack</div>
                <div className="font-heading text-base font-bold text-text-primary">Python · MERN</div>
              </motion.div>

              {/* Standard Education Card */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                className="col-span-1 rounded-lg border border-border bg-surface p-5 shadow-sm hover:border-accent/40 hover:shadow-accent-glow/50 transition-all duration-300 cursor-default"
              >
                <div className="font-body text-xs text-text-muted mb-1">Education</div>
                <div className="font-heading text-sm font-bold text-text-primary leading-tight">Bachelors of Computer Applications (2022-2025)</div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Bio & Avatar */}
          <div className="lg:col-span-7 flex flex-col lg:flex-row gap-12 items-center justify-center">
            {/* Bio Text with improved typographic hierarchy */}
            <div className="flex-1 order-2 lg:order-1">
              {/* Paragraph 1 - Prominent opening statement */}
              <p className="font-body text-lg font-light leading-relaxed text-text-primary mb-6">
                I am a Software Analyst at <span className="font-semibold text-accent">smartData Enterprises</span> (since Oct 2025), having previously trained under the LBSIMDS x smartData Enterprises program.{' '}
                <span className="text-base text-text-secondary font-normal block mt-2">
                  My expertise bridges the gap between sophisticated backend AI agent logic and modern, responsive frontend user interfaces.
                </span>
              </p>

              {/* Paragraph 2 - Styled as a stylized pull-quote block */}
              <blockquote className="my-8 border-l-2 border-accent pl-4 font-heading text-base font-semibold italic text-accent/90 leading-relaxed bg-accent/5 py-4 pr-4 rounded-r-lg">
                "With a deep focus on Agentic AI, Large Language Models, and full-stack systems, I design and deploy autonomous AI agent architectures, RAG pipelines with guardrails, custom n8n workflows, and interactive web applications."
              </blockquote>

              {/* Paragraph 3 - Standard size supportive detail */}
              <p className="font-body text-sm leading-relaxed text-text-secondary">
                I am highly detail-oriented and committed to continuous learning. Whether optimizing database queries, orchestrating multi-agent environments, or styling interactive interfaces in React, I strive for efficiency, clean code, and premium user experiences.
              </p>
            </div>

            {/* Profile Avatar visual anchor */}
            <div className="relative group flex-shrink-0 order-1 lg:order-2">
              {/* Glow backdrop effect */}
              <div className="absolute -inset-2 rounded-full bg-accent/10 opacity-50 blur-lg group-hover:bg-accent/20 transition-all duration-300" />
              
              {/* Slowly rotating dashed border ring */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-dashed border-accent/30"
              />

              {/* Orbiting dot signal marker */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-accent-glow" />
              </motion.div>

              {/* Avatar circular frame */}
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-accent bg-surface font-heading text-4xl font-extrabold text-accent">
                SJ
              </div>

              {/* Thin layout gradient wire bridge linking the avatar back to the bio column */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent to-accent/35 hidden lg:block" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
