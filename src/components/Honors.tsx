import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Trophy, Award, X, Eye } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface Honor {
  title: string;
  issuer: string;
  year: string;
  description: string;
  type: string; // 'rank' | 'leadership'
  image: string;
}

export const Honors: React.FC = () => {
  const { ref, inView } = useScrollReveal(0.15);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const honorsData: Honor[] = [
    {
      title: 'Class Rank 1 & Academic Gold Medal',
      issuer: 'Graduation College',
      year: '2025',
      description: 'Awarded the official Class Rank 1 certificate and the prestigious Academic Gold Medal for graduating at the top of the department, recognizing overall academic excellence and outstanding coursework performance.',
      type: 'rank',
      image: '/Firstrank.jpeg',
    },
    {
      title: 'Leadership Excellence Certificate',
      issuer: 'Graduation College',
      year: '2025',
      description: 'Awarded in recognition of exceptional leadership, active campus contributions, and demonstrating initiative in driving team collaborations and college projects.',
      type: 'leadership',
      image: '/Leadership.jpeg',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'rank':
        return <Trophy className="h-6 w-6" />;
      case 'leadership':
        return <Award className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

  return (
    <section id="honors" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ghost Numeral Background */}
      <div className="absolute right-6 bottom-0 font-heading text-[18rem] md:text-[26rem] font-black text-white/[0.015] select-none pointer-events-none leading-none z-0">
        08
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
              08. Achievements
            </h2>
            <h3 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Honors & Awards
            </h3>
            <p className="mt-2 font-body text-base text-text-muted">
              Academic honors, leadership recognition, and graduation milestones.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {honorsData.map((honor, idx) => (
              <TiltCard
                key={idx}
                onClick={() => {
                  if (honor.image) {
                    setActiveImage(honor.image);
                  }
                }}
                className={`group relative flex flex-col justify-between rounded-xl border bg-surface p-8 shadow-md transition-all duration-300 ${
                  honor.image
                    ? 'border-border/80 hover:border-accent/50 cursor-pointer hover:shadow-accent-glow'
                    : 'border-border/50 cursor-default'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-bg text-accent group-hover:border-accent/40 group-hover:text-accent-hover transition-colors">
                      {getIcon(honor.type)}
                    </div>
                    <span className="font-body text-xs font-bold text-text-muted px-3 py-1 rounded-full border border-border bg-bg">
                      {honor.year}
                    </span>
                  </div>

                  {/* Title and Issuer */}
                  <div className="mb-4">
                    <h4 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors leading-snug">
                      {honor.title}
                    </h4>
                    <p className="mt-1 font-body text-xs font-semibold text-accent uppercase tracking-wider">
                      {honor.issuer}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mb-6 font-body text-sm leading-relaxed text-text-secondary">
                    {honor.description}
                  </p>
                </div>

                {/* Action Link (if image exists) */}
                {honor.image && (
                  <div className="flex items-center gap-2 border-t border-border/50 pt-4 font-body text-xs font-bold text-accent group-hover:text-accent-hover transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>VIEW CERTIFICATE</span>
                  </div>
                )}
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={activeImage}
                alt="Honors Certificate"
                className="max-h-[80vh] max-w-[85vw] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
