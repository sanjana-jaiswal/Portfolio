import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { LogoLoop } from './LogoLoop';
import { Code2, Brain, Database, Cloud, Cpu, UserCheck, Mic } from 'lucide-react';
import { FaAws } from 'react-icons/fa';
import {
  SiPython,
  SiDjango,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiGit,
  SiJira,
  SiPostgresql,
  SiDocker,
  SiCloudflare
} from 'react-icons/si';

import { TiltCard } from './TiltCard';

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  skills: string[];
}

export const Skills: React.FC = () => {
  const { ref, inView } = useScrollReveal(0.15);

  const skillGroups: SkillGroup[] = [
    {
      category: 'AI & Agents (GenAI)',
      icon: <Brain className="h-5 w-5 text-accent" />,
      skills: ['Agentic AI', 'AI Agents', 'Vapi Voice Agents', 'Agentic RAG with Guardrails', 'RAG Systems', 'Generative AI'],
    },
    {
      category: 'Languages & Web Stack',
      icon: <Code2 className="h-5 w-5 text-accent" />,
      skills: ['Python', 'Django', 'ReactJS', 'TypeScript', 'Node.js', 'REST APIs'],
    },
    {
      category: 'Databases & Vector DBs',
      icon: <Database className="h-5 w-5 text-accent" />,
      skills: ['PostgreSQL', 'SQLAlchemy', 'Milvus', 'Pinecone', 'MongoDB', 'MySQL', 'Prisma'],
    },
    {
      category: 'Automation & Workflows',
      icon: <Cpu className="h-5 w-5 text-accent" />,
      skills: ['n8n Automation', 'API Integration', 'Custom Workflows', 'Automation Scripts'],
    },
    {
      category: 'Cloud & DevOps',
      icon: <Cloud className="h-5 w-5 text-accent" />,
      skills: ['AWS (EC2, ECS, Amplify)', 'Cloudflare', 'Docker Containers', 'AWS Secrets Manager', 'Jenkins CI/CD', 'Git / GitHub'],
    },
    {
      category: 'Professional Skills',
      icon: <UserCheck className="h-5 w-5 text-accent" />,
      skills: ['Leadership', 'Teamwork', 'Problem Solving', 'Collaboration'],
    },
  ];

  const techLogos = [
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiPython className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">Python</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiDjango className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">Django</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiReact className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">React</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiTypescript className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">TypeScript</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiNodedotjs className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">Node.js</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><FaAws className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">AWS</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiCloudflare className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">Cloudflare</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiDocker className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">Docker</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiPostgresql className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">PostgreSQL</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><Cpu className="h-6 w-6 text-accent" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">n8n</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><Mic className="h-6 w-6 text-accent" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">Vapi</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiMongodb className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">MongoDB</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiGit className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">Git</span></div> },
    { node: <div className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors"><SiJira className="h-7 w-7" /><span className="font-heading text-xs font-semibold uppercase tracking-wider">Jira</span></div> },
  ];

  return (
    <section id="skills" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ghost Numeral Background */}
      <div className="absolute right-6 bottom-0 font-heading text-[18rem] md:text-[26rem] font-black text-white/[0.015] select-none pointer-events-none leading-none z-0">
        06
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* LogoLoop Marquee at the Top of Headings */}
          <div className="mb-10 w-full overflow-hidden py-5 bg-transparent">
            <LogoLoop
              logos={techLogos}
              speed={35}
              direction="left"
              logoHeight={28}
              gap={40}
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="#0a0a0a" // Blends with the standard background color
              scaleOnHover={true}
            />
          </div>

          {/* Header */}
          <div className="mb-12">
            <h2 className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-accent">
              06. Competencies
            </h2>
            <h3 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Skills & Expertise
            </h3>
          </div>

          {/* Skills Categories Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, idx) => {
              const isPrimary = group.category === 'AI & Agents (GenAI)';
              return (
                <TiltCard
                  key={idx}
                  className={`rounded-xl border p-6 shadow-sm cursor-pointer ${
                    isPrimary
                      ? 'border-accent bg-surface/90 shadow-accent-glow'
                      : 'border-border bg-surface hover:border-accent/30'
                  }`}
                >
                  {/* Category Header */}
                  <div className="mb-5 flex items-center justify-between border-b border-border/40 pb-3">
                    <div className="flex items-center gap-3">
                      {group.icon}
                      <h4 className="font-heading text-base font-bold text-text-primary">
                        {group.category}
                      </h4>
                    </div>
                    {isPrimary && (
                      <span className="rounded bg-accent/15 px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/20">
                        Primary Focus
                      </span>
                    )}
                  </div>

                  {/* Pills List */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <motion.span
                        key={sIdx}
                        whileHover={{ scale: 1.05 }}
                        className="rounded bg-bg border border-border/80 hover:border-accent hover:text-accent transition-all px-3 py-1 font-body text-xs text-text-secondary select-none"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
