'use client';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      {/* Geometric light beam similar to RELIK reference */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              transparent 0%,
              transparent 60%,
              rgba(74, 222, 128, 0.03) 70%,
              rgba(74, 222, 128, 0.06) 80%,
              transparent 90%
            )
          `,
        }}
      />
    </div>
  );
}
