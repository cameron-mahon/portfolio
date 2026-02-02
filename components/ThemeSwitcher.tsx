'use client';

import { useState, useEffect } from 'react';

const themes = [
  { id: 'dark-green', label: 'Dark/Green' },
  { id: 'light-orange', label: 'Light/Orange' },
  { id: 'light-blue', label: 'Light/Blue' },
  { id: 'light-grey', label: 'Light/Grey' },
];

export default function ThemeSwitcher() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const theme = themes[current].id;
    if (theme === 'dark-green') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [current]);

  const next = () => setCurrent((c) => (c + 1) % themes.length);

  return (
    <button
      onClick={next}
      className="fixed top-4 right-4 z-50 px-3 py-1.5 text-xs font-mono rounded"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        color: 'var(--accent)',
      }}
    >
      {themes[current].label} →
    </button>
  );
}
