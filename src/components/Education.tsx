import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GraduationCap, Award } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  ranking: string;
  notes?: string;
}

export const Education: React.FC = () => {
  const { ref, inView } = useScrollReveal(0.15);

  const educationData: EducationItem[] = [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'University of Lucknow',
      period: '2022–2025',
      ranking: 'Ranked 1st in Program',
      notes: 'Received multiple academic awards. Earned extracurricular certifications in Python Web Development and Machine Learning.',
    },
    {
      degree: 'Intermediate (Class 12 - PCB)',
      institution: 'SVM Rambagh-Basti',
      period: '2021–2022',
      ranking: 'Top Rank in Class 12',
      notes: 'Recognized for academic excellence in Computer Science.',
    },
    {
      degree: 'High School (Class 10)',
      institution: 'SVM Rambagh-Basti',
      period: '2019–2020',
      ranking: 'Top 5% of Class',
      notes: 'Scored top marks in computer fundamentals and science disciplines.',
    },
  ];

  return (
    <section id="education" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ghost Numeral Background */}
      <div className="absolute right-6 bottom-0 font-heading text-[18rem] md:text-[26rem] font-black text-white/[0.015] select-none pointer-events-none leading-none z-0">
        05
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
              05. Education
            </h2>
            <h3 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Academic Background
            </h3>
          </div>

          {/* Education Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {educationData.map((edu, idx) => (
              <SpotlightCard
                key={idx}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface p-6 shadow-sm hover:border-accent/40 transition-colors"
                spotlightColor="rgba(255, 106, 26, 0.15)"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg text-accent group-hover:border-accent/40 transition-colors">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="font-body text-xs font-semibold text-text-muted">
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="mb-1 font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="mb-4 font-heading text-sm text-text-secondary">
                    {edu.institution}
                  </p>
                  
                  {edu.notes && (
                    <p className="font-body text-xs leading-relaxed text-text-muted">
                      {edu.notes}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-border/40 pt-4 text-accent">
                  <Award className="h-4 w-4" />
                  <span className="font-body text-xs font-bold uppercase tracking-wider">
                    {edu.ranking}
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
