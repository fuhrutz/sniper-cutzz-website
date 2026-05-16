'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number>(0);
  const rawPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const loop = () => {
      setPos({ x: rawPos.current.x, y: rawPos.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const handleHover = () => setHovered(true);
    const handleLeave = () => setHovered(false);
    const interactives = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  const size = hovered ? 48 : clicked ? 20 : 32;
  const opacity = hovered ? 0.6 : 1;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      animate={{ x: pos.x - size / 2, y: pos.y - size / 2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.3 }}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        style={{ opacity }}
      >
        {/* Outer circle */}
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="#CCFF00"
          strokeWidth={hovered ? 1.5 : 1}
          opacity={0.8}
        />
        {/* Crosshair lines */}
        <line x1="16" y1="2" x2="16" y2="10" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="22" x2="16" y2="30" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="16" x2="10" y2="16" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="16" x2="30" y2="16" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx="16" cy="16" r={clicked ? 2.5 : 1.5} fill="#CCFF00" />
        {/* Inner circle (subtle) */}
        <circle cx="16" cy="16" r="5" stroke="#CCFF00" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </motion.div>
  );
}
