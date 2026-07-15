import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Heart } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface VolunteerActivity {
  role: string;
  organization: string;
  details: string;
}

export const ExtraCurricular: React.FC = () => {
  const { ref, inView } = useScrollReveal(0.15);

  const activities: VolunteerActivity[] = [
    {
      role: 'NSS Volunteer (2 Years)',
      organization: 'National Service Scheme',
      details: 'Organized and participated in community development camps, public health awareness drives, and rural cleanliness projects.',
    },
    {
      role: 'NGO Volunteer',
      organization: 'Youth Empowerment Group',
      details: 'Assisted in community development initiatives and volunteered as an academic tutor providing educational support for underprivileged students.',
    },
  ];

  return (
    <section id="extra-curricular" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ghost Numeral Background */}
      <div className="absolute right-6 bottom-0 font-heading text-[18rem] md:text-[26rem] font-black text-white/[0.015] select-none pointer-events-none leading-none z-0">
        09
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
              09. Engagement
            </h2>
            <h3 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Extra-Curricular Activities
            </h3>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {activities.map((act, idx) => (
              <TiltCard
                key={idx}
                className="group relative flex items-start gap-4 rounded-xl border border-border bg-surface p-6 shadow-sm hover:border-accent/40 cursor-pointer"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-bg text-accent group-hover:border-accent/40 transition-colors">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                    {act.role}
                  </h4>
                  <h5 className="font-heading text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                    {act.organization}
                  </h5>
                  <p className="font-body text-sm leading-relaxed text-text-secondary">
                    {act.details}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
