import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Folder, ExternalLink, Lock } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface Project {
  title: string;
  description: string;
  tech: string[];
  domain: string;
  github?: string;
  demo?: string;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <TiltCard
      className="group relative flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-6 shadow-sm hover:border-accent/50 hover:shadow-accent-glow cursor-pointer"
    >
      <div>
        {/* Card Top */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg text-accent group-hover:border-accent/40 transition-colors">
            <Folder className="h-5 w-5" />
          </div>
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
            {project.domain}
          </span>
        </div>

        {/* Card Content */}
        <h4 className="mb-3 font-heading text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
          {project.title}
        </h4>
        <p className="mb-6 font-body text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>
      </div>

      {/* Card Tech & Footer */}
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t, idx) => (
            <span key={idx} className="rounded bg-bg border border-border/80 px-2 py-0.5 font-body text-[11px] text-text-secondary">
              {t}
            </span>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-border/30 pt-4 mt-2">
          {project.github === 'private' ? (
            <div className="flex items-center gap-1.5 font-body text-xs text-text-muted select-none">
              <Lock className="h-3.5 w-3.5 text-text-muted/65" />
              <span>Private Code</span>
            </div>
          ) : project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-body text-xs text-text-secondary hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>Source Code</span>
            </a>
          ) : (
            <div className="w-1" />
          )}

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-body text-xs text-accent hover:underline font-bold transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </TiltCard>
  );
};

export const Projects: React.FC = () => {
  const { ref, inView } = useScrollReveal(0.1);

  const projectsData: Project[] = [
    {
      title: 'INAC (AI-powered Law Chatbot)',
      description: 'Full-stack AI chatbot developed at smartData Enterprises. Implemented UI components, Python scraper modules for cleaning raw legal text datasets, and fine-tuning parameters. Integrated autonomous agentic layers for decision-making and context awareness.',
      tech: ['React (Vite)', 'Node.js', 'Python', 'Web Scraping', 'AI Agentic Layer'],
      domain: 'AI-powered Chatbot',
      github: 'private',
    },
    {
      title: 'Lip-syncing Avatar (POC)',
      description: 'Developed a real-time lip-syncing 3D avatar application. Converts user text to speech (TTS) synthesis, animating avatar lips/mouth shapes in exact alignment with generated audio output streams with low latency optimizations.',
      tech: ['React', 'Python', 'FastAPI', 'TTS Systems', '3D Animation Sync'],
      domain: 'Artificial Intelligence',
      github: 'private',
    },
    {
      title: 'Farmer-Merchant Integration',
      description: 'Streamlined farmer-merchant booking schedules and cold storage capacities using Django. Designed secure portals, booking feedback surveys, inventory logs, and automatic transaction SMS alerts.',
      tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript'],
      domain: 'Cold Storage Automation',
      github: 'https://github.com/sanjana-jaiswal/Farmer-Merchant-Booking',
    },
    {
      title: 'Full-Stack User Management System',
      description: 'Designed a React + TypeScript user manager system supporting secure login, role permission structures, and Nodemailer email triggers. Incorporates PDF exports via React-PDF Renderer.',
      tech: ['ReactJS', 'TypeScript', 'Node.js', 'Nodemailer', 'React-PDF'],
      domain: 'Full-Stack Web Dev',
      github: 'https://github.com/sanjana-jaiswal/User-Management-System',
    },
    {
      title: 'AI Music Recommendation Engine',
      description: 'Designed a recommendation system utilizing collaborative filtering algorithms. Computes user interest ratings and cosine similarity matrices on music metadata. Deployed with Streamlit.',
      tech: ['Python', 'Streamlit', 'Collaborative Filtering', 'Cosine Similarity'],
      domain: 'Recommender Systems',
      github: 'https://github.com/sanjana-jaiswal/AI-Music-Recommender',
    },
    {
      title: 'Kidney Disease Prediction System',
      description: 'Constructed an ML diagnostic support platform to calculate Chronic Kidney Disease risk coefficients using clinical files. Leverages Python data preprocessing and scikit-learn estimators.',
      tech: ['Python', 'Scikit-Learn', 'Pandas', 'Data Preprocessing'],
      domain: 'Predictive Health Tech',
      github: 'https://github.com/sanjana-jaiswal/Kidney-Disease-Prediction',
    },
  ];

  return (
    <section id="projects" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ghost Numeral Background */}
      <div className="absolute right-6 bottom-0 font-heading text-[18rem] md:text-[26rem] font-black text-white/[0.015] select-none pointer-events-none leading-none z-0">
        03
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
              03. Portfolio
            </h2>
            <h3 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Other Highlights
            </h3>
            <p className="mt-2 font-body text-base text-text-muted">
              A collection of AI-integrated web applications and machine learning projects.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full flex flex-col"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
