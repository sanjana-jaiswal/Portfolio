import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { Mail, MapPin, Download, Send, Check } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Contact: React.FC = () => {
  const { ref, inView } = useScrollReveal(0.15);
  
  // TODO: Replace 'YOUR_FORM_ID' with your Formspree form ID
  const FORMSPREE_FORM_ID: string = 'xykrzorw';
  
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID === 'YOUR_FORM_ID' ? 'mock-id' : FORMSPREE_FORM_ID);
  const [mockSuccess, setMockSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (FORMSPREE_FORM_ID === 'YOUR_FORM_ID') {
      setMockSuccess(true);
      return;
    }
    handleSubmit(e);
  };

  const isFormSubmitted = state.succeeded || mockSuccess;

  return (
    <section id="contact" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ghost Numeral Background */}
      <div className="absolute right-6 bottom-0 font-heading text-[18rem] md:text-[26rem] font-black text-white/[0.015] select-none pointer-events-none leading-none z-0">
        10
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
              10. Contact
            </h2>
            <h3 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Get In Touch
            </h3>
            <p className="mt-2 font-body text-base text-text-muted">
              Have a project or opportunity? Let's connect.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Contact info & Resume */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <p className="font-body text-base leading-relaxed text-text-secondary">
                  Feel free to reach out via the form, send an email, or connect via LinkedIn. I'm always open to discussing GenAI agent architectures, full-stack web projects, or analytical positions.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 font-body text-sm text-text-secondary">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">Email</div>
                      <a href="mailto:sanjanajaiswalbst@gmail.com" className="hover:text-accent transition-colors">
                        sanjanajaiswalbst@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-body text-sm text-text-secondary">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">Location</div>
                      <span>Lucknow, Uttar Pradesh, India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials & Resume */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/sanjana-jaiswal-423208273"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:border-accent hover:text-accent hover:shadow-accent-glow transition-all"
                    title="LinkedIn"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/sanjana-jaiswal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:border-accent hover:text-accent hover:shadow-accent-glow transition-all"
                    title="GitHub"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>


                </div>

                {/* Resume Download */}
                <a
                  href="/Sanjana_Jaiswal_Resume.pdf"
                  download="Sanjana_Jaiswal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 font-body text-sm font-bold text-text-primary hover:border-accent hover:text-accent hover:shadow-accent-glow transition-all"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-border bg-surface p-8 shadow-lg relative overflow-hidden">
                {isFormSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#101612] border border-[#10B981] text-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                      <Check className="h-8 w-8" />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-text-primary mb-2">
                      Message Sent Successfully
                    </h4>
                    <p className="font-body text-sm text-text-muted max-w-sm">
                      Thank you for reaching out. I have received your submission and will get back to you shortly.
                    </p>
                    {FORMSPREE_FORM_ID === 'YOUR_FORM_ID' && (
                      <div className="mt-6 rounded border border-yellow-600/30 bg-yellow-950/20 px-4 py-2 font-body text-[11px] text-yellow-500 max-w-md">
                        * Note: Form submission is currently running in test/mock mode because 'YOUR_FORM_ID' hasn't been updated yet.
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-heading text-xs font-bold uppercase tracking-wider text-text-secondary">
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          className="w-full rounded-lg border border-border bg-bg px-4 py-3 font-body text-sm text-text-primary outline-none focus:border-accent transition-colors"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-heading text-xs font-bold uppercase tracking-wider text-text-secondary">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          className="w-full rounded-lg border border-border bg-bg px-4 py-3 font-body text-sm text-text-primary outline-none focus:border-accent transition-colors"
                          placeholder="jane@example.com"
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-500 font-body" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="font-heading text-xs font-bold uppercase tracking-wider text-text-secondary">
                        Subject / Reason
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full rounded-lg border border-border bg-bg px-4 py-3 font-body text-sm text-text-primary outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                      >
                        <option value="Collaboration">Collaboration / Project</option>
                        <option value="Job opportunity">Job Opportunity</option>
                        <option value="Just saying hi">Just Saying Hi</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="font-heading text-xs font-bold uppercase tracking-wider text-text-secondary">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full rounded-lg border border-border bg-bg px-4 py-3 font-body text-sm text-text-primary outline-none focus:border-accent transition-colors resize-none"
                        placeholder="Write your message here..."
                      />
                      <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-red-500 font-body" />
                    </div>

                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-body text-sm font-bold text-bg hover:bg-accent-hover disabled:opacity-50 transition-all hover:shadow-accent-glow-strong"
                    >
                      {state.submitting ? 'Sending...' : 'Send Message'}
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
