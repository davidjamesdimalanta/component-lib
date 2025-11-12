/**
 * Hook for tracking button interaction metrics
 * Tracks clicks, hovers, and focus events on the accept button
 */

import { useEffect, useRef, useState } from 'react';
import type { InteractionMetrics, InteractionEvent } from '../UserTest.types';

interface UseInteractionMetricsOptions {
  buttonRef: React.RefObject<HTMLButtonElement>;
  buttonEnabled: boolean;
  enabled: boolean;
  onComplete?: (metrics: InteractionMetrics) => void;
}

interface UseInteractionMetricsReturn {
  metrics: InteractionMetrics;
  recordClick: () => void;
}

/**
 * Tracks user interactions with the accept button
 * @param options - Configuration options
 * @returns Current metrics and manual recording functions
 */
export function useInteractionMetrics({
  buttonRef,
  buttonEnabled,
  enabled,
  onComplete,
}: UseInteractionMetricsOptions): UseInteractionMetricsReturn {
  const startTimeRef = useRef<number | null>(null);
  const buttonEnabledTimeRef = useRef<number | null>(null);
  const clickTimeRef = useRef<number | null>(null);

  // Accumulated event tracking
  const eventsRef = useRef<InteractionEvent[]>([]);
  const prematureClicksRef = useRef(0);
  const prematureHoversRef = useRef(0);
  const focusEventsRef = useRef(0);

  // Build metrics object
  const buildMetrics = (): InteractionMetrics => {
    const timeButtonEnabledMs = buttonEnabledTimeRef.current
      ? (clickTimeRef.current ?? Date.now()) - buttonEnabledTimeRef.current
      : 0;

    const timeToClickAfterEnabledMs = buttonEnabledTimeRef.current && clickTimeRef.current
      ? clickTimeRef.current - buttonEnabledTimeRef.current
      : 0;

    return {
      prematureClicks: prematureClicksRef.current,
      prematureHovers: prematureHoversRef.current,
      focusEvents: focusEventsRef.current,
      timeButtonEnabledMs,
      timeToClickAfterEnabledMs,
      allEvents: [...eventsRef.current],
    };
  };

  const [metrics, setMetrics] = useState<InteractionMetrics>(buildMetrics());

  // Record an interaction event
  const recordEvent = (type: 'click' | 'hover' | 'focus'): void => {
    const timestamp = Date.now() - (startTimeRef.current ?? Date.now());

    eventsRef.current.push({
      timestamp,
      type,
      buttonEnabled,
    });

    // Update counters based on type and button state
    if (type === 'click' && !buttonEnabled) {
      prematureClicksRef.current++;
    } else if (type === 'hover' && !buttonEnabled) {
      prematureHoversRef.current++;
    } else if (type === 'focus') {
      focusEventsRef.current++;
    }

    // Update metrics state
    setMetrics(buildMetrics());
  };

  // Manual click recording (called when button is actually clicked)
  const recordClick = (): void => {
    if (!clickTimeRef.current) {
      clickTimeRef.current = Date.now();
      const finalMetrics = buildMetrics();
      setMetrics(finalMetrics);
      onComplete?.(finalMetrics);
    }
  };

  // Track when button becomes enabled
  useEffect(() => {
    if (enabled && buttonEnabled && !buttonEnabledTimeRef.current) {
      buttonEnabledTimeRef.current = Date.now();
      setMetrics(buildMetrics());
    }
  }, [enabled, buttonEnabled]);

  // Set up event listeners on button
  useEffect(() => {
    if (!enabled || !buttonRef.current) return;

    const button = buttonRef.current;

    // Record start time
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    // Click handler (captures both enabled and disabled clicks)
    const handleClick = (): void => {
      recordEvent('click');
    };

    // Hover handler
    const handleMouseEnter = (): void => {
      recordEvent('hover');
    };

    // Focus handler
    const handleFocus = (): void => {
      recordEvent('focus');
    };

    // Attach event listeners
    button.addEventListener('click', handleClick);
    button.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    button.addEventListener('focus', handleFocus);

    return () => {
      button.removeEventListener('click', handleClick);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('focus', handleFocus);
    };
  }, [enabled, buttonRef, buttonEnabled]);

  // Reset metrics when re-enabled
  useEffect(() => {
    if (enabled) {
      startTimeRef.current = null;
      buttonEnabledTimeRef.current = null;
      clickTimeRef.current = null;
      eventsRef.current = [];
      prematureClicksRef.current = 0;
      prematureHoversRef.current = 0;
      focusEventsRef.current = 0;
      setMetrics(buildMetrics());
    }
  }, [enabled]);

  return {
    metrics,
    recordClick,
  };
}
