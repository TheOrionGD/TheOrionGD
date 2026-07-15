import React, { useRef, useState, useEffect } from 'react';

interface SpatialCellProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // Maximum rotation in degrees
}

export const SpatialCell: React.FC<SpatialCellProps> = ({ 
  children, 
  className = '', 
  maxRotation = 8 
}) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cellRef.current) return;

    const el = cellRef.current;
    const rect = el.getBoundingClientRect();
    
    // Position of mouse cursor relative to the cell's center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Normalize coordinates (-1 to 1)
    const normalizedX = x / (rect.width / 2);
    const normalizedY = y / (rect.height / 2);

    // rotateX is driven by relative vertical coordinate (Y)
    // rotateY is driven by relative horizontal coordinate (X)
    setRotate({
      x: -normalizedY * maxRotation,
      y: normalizedX * maxRotation
    });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const style: React.CSSProperties = isHovered && !isMobile
    ? {
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.08s ease-out',
      }
    : isMobile
      ? {
          transition: 'transform 0.5s ease',
        }
      : {
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        };

  return (
    <div
      ref={cellRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spatial-pane ${isMobile ? 'spatial-oscillate' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
