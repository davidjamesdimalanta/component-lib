/**
 * Hook for tracking detailed scroll behavior metrics
 * Tracks speed, milestones, pauses, and direction changes
 */

import { useEffect, useRef, useState } from 'react';
import type { ScrollMetrics, ScrollSpeedSample, ScrollPause, ScrollMilestones } from '../UserTest.types';

interface UseScrollMetricsOptions {
  containerRef: React.RefObject<HTMLElement>;
  enabled: boolean;
  onComplete?: (metrics: ScrollMetrics) => void;
}

interface UseScrollMetricsReturn {
  metrics: ScrollMetrics;
  currentProgress: number;
  isComplete: boolean;
}

const SAMPLE_INTERVAL_MS = 100; // Sample scroll position every 100ms
const PAUSE_THRESHOLD_PX_PER_S = 10; // Speed below this is considered a pause
const PAUSE_MIN_DURATION_MS = 500; // Minimum pause duration to record

/**
 * Tracks comprehensive scroll behavior metrics within a container
 * @param options - Configuration options
 * @returns Current metrics, progress percentage, and completion status
 */
export function useScrollMetrics({
  containerRef,
  enabled,
  onComplete,
}: UseScrollMetricsOptions): UseScrollMetricsReturn {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Refs for tracking state between samples
  const startTimeRef = useRef<number | null>(null);
  const firstScrollTimeRef = useRef<number | null>(null);
  const lastPositionRef = useRef(0);
  const lastTimestampRef = useRef<number | null>(null);
  const lastDirectionRef = useRef<'down' | 'up'>('down');
  const pauseStartRef = useRef<{ time: number; position: number } | null>(null);

  // Accumulated metrics
  const speedSamplesRef = useRef<ScrollSpeedSample[]>([]);
  const milestonesRef = useRef<ScrollMilestones>({});
  const pausesRef = useRef<ScrollPause[]>([]);
  const directionChangesRef = useRef(0);
  const maxDepthRef = useRef(0);

  // Build final metrics object
  const buildMetrics = (): ScrollMetrics => {
    // Filter out invalid speeds (Infinity, NaN, negative, or zero)
    const speeds = speedSamplesRef.current
      .map((s) => s.pixelsPerSecond)
      .filter((speed) => Number.isFinite(speed) && speed > 0);

    const averageSpeed = speeds.length > 0
      ? speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length
      : 0;
    const maxSpeed = speeds.length > 0 ? Math.max(...speeds) : 0;

    return {
      timeToFirstScrollMs: firstScrollTimeRef.current ?? 0,
      milestones: milestonesRef.current,
      speedSamples: speedSamplesRef.current,
      averageSpeed: Number.isFinite(averageSpeed) ? averageSpeed : 0,
      maxSpeed: Number.isFinite(maxSpeed) ? maxSpeed : 0,
      pauses: pausesRef.current,
      directionChanges: directionChangesRef.current,
      finalDepthPercent: maxDepthRef.current,
    };
  };

  const [metrics, setMetrics] = useState<ScrollMetrics>(buildMetrics());

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;

    // Record start time
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    // Calculate scroll progress percentage
    const calculateProgress = (): number => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) return 100;
      return Math.min(100, (scrollTop / maxScroll) * 100);
    };

    // Record milestone timestamp if not already recorded
    const recordMilestone = (progress: number, timestamp: number): void => {
      const milestones = milestonesRef.current;

      if (progress >= 25 && !milestones.percent25) {
        milestones.percent25 = timestamp - (startTimeRef.current ?? timestamp);
      }
      if (progress >= 50 && !milestones.percent50) {
        milestones.percent50 = timestamp - (startTimeRef.current ?? timestamp);
      }
      if (progress >= 75 && !milestones.percent75) {
        milestones.percent75 = timestamp - (startTimeRef.current ?? timestamp);
      }
      if (progress >= 100 && !milestones.percent100) {
        milestones.percent100 = timestamp - (startTimeRef.current ?? timestamp);
      }
    };

    // Detect and record pause
    const recordPauseIfNeeded = (speed: number, timestamp: number, position: number): void => {
      if (speed < PAUSE_THRESHOLD_PX_PER_S) {
        // Potentially in a pause
        if (!pauseStartRef.current) {
          pauseStartRef.current = { time: timestamp, position };
        }
      } else {
        // Moving fast enough, end pause if one was ongoing
        if (pauseStartRef.current) {
          const duration = timestamp - pauseStartRef.current.time;
          if (duration >= PAUSE_MIN_DURATION_MS) {
            pausesRef.current.push({
              timestamp: pauseStartRef.current.time - (startTimeRef.current ?? 0),
              durationMs: duration,
              position: pauseStartRef.current.position,
            });
          }
          pauseStartRef.current = null;
        }
      }
    };

    // Sample scroll position and calculate metrics
    const sampleScroll = (): void => {
      const timestamp = Date.now();
      const currentPosition = container.scrollTop;
      const progress = calculateProgress();

      // Record first scroll
      if (!firstScrollTimeRef.current && currentPosition > 0) {
        firstScrollTimeRef.current = timestamp - (startTimeRef.current ?? timestamp);
      }

      // Update max depth
      if (progress > maxDepthRef.current) {
        maxDepthRef.current = progress;
      }

      // Calculate speed if we have a previous sample
      if (lastTimestampRef.current !== null) {
        const timeDelta = timestamp - lastTimestampRef.current;

        // Skip samples with insufficient time delta (prevents division by zero)
        if (timeDelta < 10) {
          // Less than 10ms - unreliable measurement, skip this sample
          return;
        }

        const positionDelta = currentPosition - lastPositionRef.current;
        const speed = Math.abs(positionDelta) / (timeDelta / 1000); // px/s

        // Filter out unrealistic/invalid speeds
        if (!Number.isFinite(speed) || speed > 10000) {
          // Skip this sample (likely an error or unrealistic measurement)
          return;
        }

        // Record speed sample
        speedSamplesRef.current.push({
          timestamp: timestamp - (startTimeRef.current ?? timestamp),
          pixelsPerSecond: speed,
          scrollPosition: currentPosition,
        });

        // Detect direction change
        const currentDirection = positionDelta >= 0 ? 'down' : 'up';
        if (currentDirection !== lastDirectionRef.current && Math.abs(positionDelta) > 5) {
          directionChangesRef.current++;
          lastDirectionRef.current = currentDirection;
        }

        // Record pause if applicable
        recordPauseIfNeeded(speed, timestamp, currentPosition);
      }

      // Record milestones
      recordMilestone(progress, timestamp);

      // Update tracking refs
      lastPositionRef.current = currentPosition;
      lastTimestampRef.current = timestamp;

      // Update state
      setCurrentProgress(progress);

      // Check completion
      if (progress >= 100 && !isComplete) {
        setIsComplete(true);
        const finalMetrics = buildMetrics();
        setMetrics(finalMetrics);
        onComplete?.(finalMetrics);
      }
    };

    // Set up sampling interval
    const intervalId = setInterval(sampleScroll, SAMPLE_INTERVAL_MS);

    // Also sample on scroll events for immediate feedback
    const handleScroll = (): void => {
      sampleScroll();
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    // Initial sample
    sampleScroll();

    return () => {
      clearInterval(intervalId);
      container.removeEventListener('scroll', handleScroll);

      // Finalize any ongoing pause
      if (pauseStartRef.current && lastTimestampRef.current) {
        const duration = lastTimestampRef.current - pauseStartRef.current.time;
        if (duration >= PAUSE_MIN_DURATION_MS) {
          pausesRef.current.push({
            timestamp: pauseStartRef.current.time - (startTimeRef.current ?? 0),
            durationMs: duration,
            position: pauseStartRef.current.position,
          });
        }
      }
    };
  }, [enabled, containerRef, isComplete, onComplete]);

  // Reset metrics when re-enabled
  useEffect(() => {
    if (enabled) {
      // Reset all refs
      startTimeRef.current = null;
      firstScrollTimeRef.current = null;
      lastPositionRef.current = 0;
      lastTimestampRef.current = null;
      lastDirectionRef.current = 'down';
      pauseStartRef.current = null;
      speedSamplesRef.current = [];
      milestonesRef.current = {};
      pausesRef.current = [];
      directionChangesRef.current = 0;
      maxDepthRef.current = 0;

      setCurrentProgress(0);
      setIsComplete(false);
      setMetrics(buildMetrics());
    }
  }, [enabled]);

  return {
    metrics,
    currentProgress,
    isComplete,
  };
}
