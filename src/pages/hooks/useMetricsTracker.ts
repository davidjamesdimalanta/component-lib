/**
 * Main metrics tracker hook that combines scroll and interaction metrics
 * Provides unified interface for tracking complete variant metrics
 */

import { useRef } from 'react';
import type { VariantMetrics, ButtonVariant, ScrollMetrics, InteractionMetrics } from '../UserTest.types';
import { useScrollMetrics } from './useScrollMetrics';
import { useInteractionMetrics } from './useInteractionMetrics';

interface UseMetricsTrackerOptions {
  variant: ButtonVariant;
  order: 1 | 2;
  containerRef: React.RefObject<HTMLElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
  buttonEnabled: boolean;
  enabled: boolean;
  onComplete?: (metrics: VariantMetrics) => void;
}

interface UseMetricsTrackerReturn {
  scrollMetrics: ScrollMetrics;
  interactionMetrics: InteractionMetrics;
  currentProgress: number;
  isScrollComplete: boolean;
  completeTask: () => void;
}

/**
 * Coordinates tracking of all metrics for a single variant test
 * @param options - Configuration options
 * @returns Combined metrics and task completion handler
 */
export function useMetricsTracker({
  variant,
  order,
  containerRef,
  buttonRef,
  buttonEnabled,
  enabled,
  onComplete,
}: UseMetricsTrackerOptions): UseMetricsTrackerReturn {
  const startTimeRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  // Record start time when enabled
  if (enabled && !startTimeRef.current) {
    startTimeRef.current = Date.now();
  }

  // Track scroll behavior
  const {
    metrics: scrollMetrics,
    currentProgress,
    isComplete: isScrollComplete,
  } = useScrollMetrics({
    containerRef,
    enabled,
  });

  // Track button interactions
  const {
    metrics: interactionMetrics,
    recordClick,
  } = useInteractionMetrics({
    buttonRef,
    buttonEnabled,
    enabled,
  });

  // Complete the task and compile final metrics
  const completeTask = (): void => {
    if (!endTimeRef.current) {
      endTimeRef.current = Date.now();

      // Record the click
      recordClick();

      // Build final variant metrics
      const startTime = startTimeRef.current ?? Date.now();
      const endTime = endTimeRef.current;

      const variantMetrics: VariantMetrics = {
        variant,
        order,
        startTime,
        endTime,
        timeOnTaskMs: endTime - startTime,
        scrollMetrics,
        interactionMetrics,
      };

      onComplete?.(variantMetrics);
    }
  };

  return {
    scrollMetrics,
    interactionMetrics,
    currentProgress,
    isScrollComplete,
    completeTask,
  };
}
