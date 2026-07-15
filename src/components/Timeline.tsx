import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calendar } from 'lucide-react';

interface TimelineItem {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
}

export const Timeline: React.FC = () => {
  const { ref, inView } = useScrollReveal(0.1);

  const timelineData: TimelineItem[] = [
    {
      role: 'Software Analyst — GenAI & Full-Stack Engineering',
      company: 'smartData Enterprises',
      period: 'Since Oct 2025',
      description: 'Building production-grade AI-driven full-stack web applications utilizing Python, AI/ML models, and the MERN stack. Responsible for engineering automated chatbot components, semantic searches, web scraper pipelines, exception handlers, and security protocols. Utilizing Jira for collaborative sprints and agile task delivery.',
      highlights: ['INAC law chatbot architecture', 'Real-time Lip-syncing 3D avatar POC', 'Model fine-tuning and data preprocessing pipelines'],
    },
    {
      role: 'Training Program — Full Stack with AI & ML',
      company: 'Karvatech Solutions',
      period: '2025 (6-Month Program)',
      description: 'Completed comprehensive instruction and hands-on coding modules in full-stack web design, API composition, database hooks, and integration of predictive ML models into frontend client layers.',
    },
    {
      role: 'Industrial Training — Python with Django',
      company: 'Softpro India Pvt. Ltd',
      period: '2024 (90-Day Program)',
      description: 'Gained practical workspace experience implementing relational databases, custom views, and user authorization sequences in Django alongside classic frontend styling (HTML, CSS, JS).',
    },
  ];

  return (
    <section id="journey" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ghost Numeral Background */}
      <div className="absolute right-6 bottom-0 font-heading text-[18rem] md:text-[26rem] font-black text-white/[0.015] select-none pointer-events-none leading-none z-0">
        04
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="mb-16">
            <h2 className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-accent">
              04. Timeline
            </h2>
            <h3 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Professional Journey
            </h3>
            <p className="mt-2 font-body text-base text-text-muted">
              A review of my career milestones, training programs, and industry projects.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative ml-4 md:ml-6 border-l border-border pl-6 md:pl-10 space-y-12">
            {/* Animated Progressive Connecting Line Accent */}
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: '100%' } : {}}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute left-0 top-0 w-[2px] origin-top bg-gradient-to-b from-accent via-accent/60 to-transparent"
            />

            {timelineData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative group"
              >
                {/* Node Dot Icon */}
                <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full border border-border bg-surface text-accent group-hover:border-accent transition-colors shadow-sm">
                  <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-accent animate-pulse" />
                </span>

                {/* Timeline Card Content */}
                <div className="rounded-xl border border-border bg-surface p-6 shadow-sm group-hover:border-border/80 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h4 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
                      {item.role}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#201612] px-3 py-1 font-body text-xs font-semibold text-accent">
                      <Calendar className="h-3 w-3" />
                      {item.period}
                    </span>
                  </div>

                  <h5 className="mb-4 font-heading text-sm font-semibold text-text-secondary">
                    {item.company}
                  </h5>

                  <p className="font-body text-sm leading-relaxed text-text-secondary mb-4">
                    {item.description}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="space-y-1.5 border-t border-border/40 pt-4 mt-2">
                      <div className="font-heading text-xs font-bold text-text-primary uppercase tracking-wider">
                        Key Deliverables
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {item.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-2 font-body text-xs text-text-secondary">
                            <span className="h-1 w-1 rounded-full bg-accent" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
