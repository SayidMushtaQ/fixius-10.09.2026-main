"use client";
import { useEffect, useState } from "react";

// Define a mapping of Tailwind CSS breakpoints to their pixel values
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type BreakpointKey = keyof typeof breakpoints;

const getBreakpointValue = (breakpoint: BreakpointKey): number => {
  return breakpoints[breakpoint] || 0;
};

// Custom hook
export function useResponsive(
  breakpoint: BreakpointKey = 'md',
  query: 'up' | 'down' | 'between' = 'down',
  endBreakpoint?:BreakpointKey
) {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    // Function to check window size
    const handleResize = () => {
      const breakpointValue = getBreakpointValue(breakpoint);
      const endBreakpointValue = endBreakpoint ? getBreakpointValue(endBreakpoint) : Infinity;

      if (query === 'up') {
        setIsSidebarVisible(window.innerWidth >= breakpointValue);
      } else if (query === 'down') {
        setIsSidebarVisible(window.innerWidth < breakpointValue);
      } else if (query === 'between') {
        setIsSidebarVisible(window.innerWidth >= breakpointValue && window.innerWidth < endBreakpointValue);
      } else {
        // Default behavior: 'only'
        setIsSidebarVisible(window.innerWidth >= breakpointValue && window.innerWidth < endBreakpointValue);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint, query, endBreakpoint]);

  return { isSidebarVisible, isSidebarOpen, setIsSidebarOpen };
}
