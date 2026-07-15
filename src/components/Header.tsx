import React from 'react';
import GooeyNav from './GooeyNav';

export const Header: React.FC = () => {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Syndra', href: '#syndra' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Skills', href: '#skills' },
    { label: 'Honors', href: '#honors' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-40 flex justify-center md:justify-end pointer-events-none px-4 md:px-6">
      <div className="pointer-events-auto flex items-center justify-start md:justify-center rounded-full bg-surface/80 backdrop-blur-md px-4 md:px-2 py-1 shadow-lg max-w-full overflow-x-auto scrollbar-none">
        <GooeyNav items={navItems} />
      </div>
    </header>
  );
};
