import React from 'react';

const SHAPES = ['✦', '✧', '🌸', '✨', '🪔'];

export function Sparkles() {
  const sparkles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${15 + Math.random() * 25}s`,
    animationDelay: `-${Math.random() * 30}s`,
    fontSize: `${0.8 + Math.random() * 1.2}rem`,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    opacity: 0.2 + Math.random() * 0.5,
    isPrimary: Math.random() > 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className={`sparkle ${s.isPrimary ? 'text-primary' : 'text-secondary'}`}
          style={{
            left: s.left,
            animationDuration: s.animationDuration,
            animationDelay: s.animationDelay,
            fontSize: s.fontSize,
            opacity: s.opacity,
          }}
        >
          {s.shape}
        </div>
      ))}
    </div>
  );
}
