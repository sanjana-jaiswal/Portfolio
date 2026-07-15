import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ShieldCheck, X, Eye } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
  skills: string[];
  image?: string;
}

export const Certifications: React.FC = () => {
  const { ref, inView } = useScrollReveal(0.15);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const certificationsData: Certification[] = [
    {
      title: 'Full Stack Development with AI & ML',
      issuer: 'Karvatech Solutions',
      year: '2025',
      description: 'Comprehensive training program specializing in building end-to-end full-stack systems integrated with AI models. Developed responsive React interfaces, FastAPI/Python backends, and implemented machine learning APIs and RAG pipelines.',
      skills: ['ReactJS', 'Python', 'FastAPI', 'Machine Learning', 'RAG Pipelines', 'Full-Stack'],
      image: '/Karvatech.jpeg',
    },
    {
      title: 'Industrial Training (Python with Django)',
      issuer: 'Softpro India Pvt. Ltd',
      year: '2024',
      description: 'Intensive industrial training focused on server-side web development using the Django framework. Designed relational database schemas, developed secure user authentication systems, and built RESTful API endpoints.',
      skills: ['Python', 'Django', 'REST APIs', 'PostgreSQL', 'Auth', 'MVC Architecture'],
      image: '/softpro.jpeg',
    },
  ];

  return (
    <section id="certifications" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ghost Numeral Background */}
      <div className="absolute right-6 bottom-0 font-heading text-[18rem] md:text-[26rem] font-black text-white/[0.015] select-none pointer-events-none leading-none z-0">
        07
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
              07. Credentials
            </h2>
            <h3 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Certifications & Training
            </h3>
            <p className="mt-2 font-body text-base text-text-muted">
              Professional credentials, technical training, and institutional validation.
            </p>
          </div>

          {/* Grid Layout */}
          <div className={`grid grid-cols-1 gap-6 ${certificationsData.length === 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 'md:grid-cols-3'}`}>
            {certificationsData.map((cert, idx) => (
              <TiltCard
                key={idx}
                onClick={() => {
                  if (cert.image) {
                    setActiveImage(cert.image);
                  }
                }}
                className={`group relative flex flex-col justify-between rounded-xl border bg-surface p-8 shadow-md transition-all duration-300 ${
                  cert.image
                    ? 'border-border/80 hover:border-accent/50 cursor-pointer hover:shadow-accent-glow'
                    : 'border-border/50 cursor-default'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-bg text-accent group-hover:border-accent/40 group-hover:text-accent-hover transition-colors">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <span className="font-body text-xs font-bold text-text-muted px-3 py-1 rounded-full border border-border bg-bg">
                      {cert.year}
                    </span>
                  </div>

                  {/* Title and Issuer */}
                  <div className="mb-4">
                    <h4 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors leading-snug">
                      {cert.title}
                    </h4>
                    <p className="mt-1 font-body text-xs font-semibold text-accent uppercase tracking-wider">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mb-6 font-body text-sm leading-relaxed text-text-secondary">
                    {cert.description}
                  </p>
                </div>

                {/* Skills & Action */}
                <div>
                  {/* Skill Badges */}
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded bg-bg border border-border/80 px-2.5 py-0.5 font-body text-[10px] text-text-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  {cert.image && (
                    <div className="flex items-center gap-2 border-t border-border/50 pt-4 font-body text-xs font-bold text-accent group-hover:text-accent-hover transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>VIEW CERTIFICATE</span>
                    </div>
                  )}
                </div>
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
                alt="Certificate"
                className="max-h-[80vh] max-w-[85vw] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
