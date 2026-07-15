import React, { useState, useEffect } from 'react';

export const CursorGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if device supports mouse pointer/hover
    const checkTouch = () => {
      const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
      setIsSupported(!isMobile);
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    if (isSupported) {
      window.addEventListener('mousemove', updatePosition);
      document.body.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isSupported]);

  if (!isSupported || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-0 w-[550px] h-[550px] rounded-full filter blur-[80px] opacity-25 transition-transform duration-150 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'radial-gradient(circle, rgba(255,130,130,0.18) 0%, rgba(190,228,208,0.12) 50%, rgba(255,255,255,0) 100%)',
      }}
    />
  );
};
