import { useEffect } from 'react';

export function usePreventScroll(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    // Save current scroll position
    const scrollPos = window.scrollY;
    
    // Prevent scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    // For iOS Safari
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPos}px`;
    document.body.style.width = '100%';

    return () => {
      // Restore scrolling
      document.body.style.overflow = originalStyle;
      
      // For iOS Safari
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPos);
    };
  }, [isActive]);
}
