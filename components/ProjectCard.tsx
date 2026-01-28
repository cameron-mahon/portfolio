'use client';

interface ProjectCardProps {
  title: string;
  description: string;
  url: string | null;
  status: 'live' | 'upcoming';
}

export default function ProjectCard({ title, description, url, status }: ProjectCardProps) {
  const isClickable = status === 'live' && url;

  const content = (
    <div
      className="p-5 h-full flex flex-col justify-between min-h-[140px]"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(74, 222, 128, 0.4)',
        boxShadow: '0 0 20px rgba(74, 222, 128, 0.08)',
      }}
    >
      <div>
        <h3 className="text-base font-medium mb-1" style={{ color: '#4ade80' }}>{title}</h3>
        {description && (
          <p className="text-sm" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>{description}</p>
        )}
      </div>

      <div className="mt-3">
        {status === 'upcoming' && (
          <span className="text-xs" style={{ color: 'rgba(74, 222, 128, 0.3)' }}>[ coming soon ]</span>
        )}
        {status === 'live' && (
          <span className="text-xs" style={{ color: 'rgba(74, 222, 128, 0.6)' }}>→ enter</span>
        )}
      </div>
    </div>
  );

  if (isClickable) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block flex-shrink-0 w-[260px] md:w-[300px] transition-all duration-200 hover:scale-[1.02]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="block flex-shrink-0 w-[260px] md:w-[300px] opacity-50">
      {content}
    </div>
  );
}
