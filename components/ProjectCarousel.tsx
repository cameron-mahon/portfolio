'use client';

import { useRef, useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '@/lib/projects';

export default function ProjectCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => Math.min(projects.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to active card
  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.children;
      if (cards[activeIndex]) {
        (cards[activeIndex] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="w-full">
      {/* Cards container */}
      <div
        ref={containerRef}
        className="flex justify-center gap-4 overflow-x-auto pb-4 px-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => setActiveIndex(index)}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      {/* Subtle indicator dots */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              width: index === activeIndex ? '12px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: index === activeIndex ? 'rgba(74, 222, 128, 0.6)' : 'rgba(74, 222, 128, 0.2)',
              transition: 'all 0.2s',
            }}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
