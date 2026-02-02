'use client';

import Image from 'next/image';

export default function PhotoPanel() {
  return (
    <div
      className="aspect-square h-full max-h-[400px] overflow-hidden"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 0 30px var(--accent-muted)',
      }}
    >
      {/* Image - square */}
      <div className="relative w-full h-full">
        <Image
          src="/profile.jpeg"
          alt="Cameron Mahon"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, var(--accent-muted) 0%, rgba(0,0,0,0.3) 100%)',
          }}
        />
      </div>
    </div>
  );
}
