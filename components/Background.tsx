'use client';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10" style={{ background: 'var(--background)' }}>
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              transparent 0%,
              transparent 60%,
              var(--accent-subtle) 70%,
              var(--accent-subtle-2) 80%,
              transparent 90%
            )
          `,
        }}
      />
    </div>
  );
}
