'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

// Other components (e.g. a pinned scroll section that needs to jump the
// user out programmatically) need the live instance to drive scroll
// through Lenis itself — calling window.scrollTo directly fights its RAF
// loop and gets overwritten on the next frame.
let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};
