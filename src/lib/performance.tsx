// Performance testing utility for DevX Web App
// This utility can be used to measure and verify the performance improvements made

import { useState, useEffect, useRef } from 'react';

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    renderTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    timeToInteractive: 0,
  });
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    const updateFPS = () => {
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      
      frameCountRef.current++;
      
      if (delta >= 1000) { // Update every second
        const fps = Math.round((frameCountRef.current * 1000) / delta);
        setMetrics(prev => ({ ...prev, fps }));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      
      animationFrameRef.current = requestAnimationFrame(updateFPS);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateFPS);
    
    // Monitor core web vitals
    if ('PerformanceObserver' in window) {
      const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, firstContentfulPaint: entry.startTime }));
          } else if (entry.entryType === 'largest-contentful-paint') {
            setMetrics(prev => ({ ...prev, largestContentfulPaint: entry.startTime }));
          } else if (entry.entryType === 'layout-shift') {
            setMetrics(prev => ({ 
              ...prev, 
              cumulativeLayoutShift: prev.cumulativeLayoutShift + (entry as any).value 
            }));
          }
        });
      });
      
      perfObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
    }
    
    // Time to interactive can be estimated
    if ('navigator' in window && 'connection' in navigator) {
      // This is a simplified approach - in a real app you'd have more complex logic
      window.addEventListener('load', () => {
        const timeToInteractive = performance.now();
        setMetrics(prev => ({ ...prev, timeToInteractive }));
      });
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return metrics;
};

// Component for displaying performance metrics during development
export const PerformanceMonitor = () => {
  const metrics = usePerformanceMetrics();
  
  // Only show in development or if explicitly enabled
  if (process.env.NODE_ENV !== 'development' && !(window as any).showPerfMonitor) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-green-400 font-mono text-xs p-2 rounded z-[9999]">
      <div>FPS: {metrics.fps}</div>
      <div>FCP: {metrics.firstContentfulPaint.toFixed(0)}ms</div>
      <div>LCP: {metrics.largestContentfulPaint.toFixed(0)}ms</div>
      <div>CLS: {metrics.cumulativeLayoutShift.toFixed(4)}</div>
      <div>TTI: {metrics.timeToInteractive.toFixed(0)}ms</div>
    </div>
  );
};

// Function to measure render time of components
export const measureRenderTime = (componentName: string, startMark: string = 'start', endMark: string = 'end') => {
  if (process.env.NODE_ENV === 'development') {
    performance.mark(startMark);
    setTimeout(() => {
      performance.mark(endMark);
      performance.measure(componentName, startMark, endMark);
      const measure = performance.getEntriesByName(componentName)[0];
      if (measure) {
        console.log(`${componentName} render time: ${measure.duration.toFixed(2)}ms`);
      }
    }, 0);
  }
};