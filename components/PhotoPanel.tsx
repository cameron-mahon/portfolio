'use client';

import Image from 'next/image';

export default function PhotoPanel() {
  return (
    <div
      className="aspect-square h-[85%] overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(74, 222, 128, 0.5)',
        boxShadow: '0 0 30px rgba(74, 222, 128, 0.1)',
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
        {/* Subtle green tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(74, 222, 128, 0.03) 0%, rgba(0,0,0,0.3) 100%)',
          }}
        />
      </div>
    </div>
  );
}
