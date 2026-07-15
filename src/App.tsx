import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SyndraProject } from './components/SyndraProject';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Honors } from './components/Honors';
import { ExtraCurricular } from './components/ExtraCurricular';
import { Contact } from './components/Contact';
import LiquidEther from './components/LiquidEther';

function App() {
  return (
    <div className="relative min-h-screen isolate text-text-primary selection:bg-accent selection:text-bg">
      {/* Background Liquid Ether */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden opacity-30">
        <LiquidEther
          colors={['#FF6A1A', '#FF8C42', '#B33600']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Navigation Header */}
      <Header />

      {/* Main Page Layout Grid */}
      <main>
        <Hero />
        <About />
        <SyndraProject />
        <Projects />
        <Timeline />
        <Education />
        <Skills />
        <Certifications />
        <Honors />
        <ExtraCurricular />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-surface/30 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="font-body text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Sanjana Jaiswal
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
