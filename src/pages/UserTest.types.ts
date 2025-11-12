/**
 * TypeScript type definitions for User Testing A/B experiment
 */

/**
 * Test phase progression states
 */
export type TestPhase =
  | 'welcome'
  | 'intro'
  | 'test1'
  | 'test2'
  | 'download'
  | 'results';

/**
 * Button variant types for A/B testing
 */
export type ButtonVariant = 'control' | 'button';

/**
 * Variant order assignment for counterbalancing
 */
export type VariantOrder = [ButtonVariant, ButtonVariant];

/**
 * Scroll milestone timestamps
 */
export interface ScrollMilestones {
  percent25?: number;
  percent50?: number;
  percent75?: number;
  percent100?: number;
}

/**
 * Scroll speed sample with timestamp
 */
export interface ScrollSpeedSample {
  timestamp: number;
  pixelsPerSecond: number;
  scrollPosition: number;
}

/**
 * Scroll hesitation/pause detection
 */
export interface ScrollPause {
  timestamp: number;
  durationMs: number;
  position: number;
}

/**
 * Comprehensive scroll behavior metrics
 */
export interface ScrollMetrics {
  timeToFirstScrollMs: number;
  milestones: ScrollMilestones;
  speedSamples: ScrollSpeedSample[];
  averageSpeed: number;
  maxSpeed: number;
  pauses: ScrollPause[];
  directionChanges: number;
  finalDepthPercent: number;
}

/**
 * Button interaction event
 */
export interface InteractionEvent {
  timestamp: number;
  type: 'click' | 'hover' | 'focus';
  buttonEnabled: boolean;
}

/**
 * Button interaction metrics
 */
export interface InteractionMetrics {
  prematureClicks: number;
  prematureHovers: number;
  focusEvents: number;
  timeButtonEnabledMs: number;
  timeToClickAfterEnabledMs: number;
  allEvents: InteractionEvent[];
}

/**
 * Metrics for a single variant test
 */
export interface VariantMetrics {
  variant: ButtonVariant;
  order: 1 | 2;
  startTime: number;
  endTime: number;
  timeOnTaskMs: number;
  scrollMetrics: ScrollMetrics;
  interactionMetrics: InteractionMetrics;
}

/**
 * Intro task completion data
 */
export interface IntroTaskData {
  name: string;
  email: string;
  agreedToTerms: boolean;
  completedAt: string;
  durationMs: number;
}

/**
 * Download task completion data
 */
export interface DownloadTaskData {
  completedAt: string;
  downloadInitiated: boolean;
}

/**
 * Complete test session results
 */
export interface TestResults {
  sessionId: string;
  timestamp: string;
  variantOrder: VariantOrder;
  totalTimeMs: number;
  introTask: IntroTaskData;
  variants: {
    control: VariantMetrics | null;
    button: VariantMetrics | null;
  };
  downloadTask: DownloadTaskData | null;
}

/**
 * Flattened CSV row format
 */
export interface CSVRow {
  sessionId: string;
  timestamp: string;
  variantOrder: string;
  totalTimeMs: number;
  // Intro task
  introName: string;
  introEmail: string;
  introDurationMs: number;
  // Control variant
  control_order: number;
  control_timeMs: number;
  control_avgSpeed: number;
  control_maxSpeed: number;
  control_prematureClicks: number;
  control_pauses: number;
  control_directionChanges: number;
  control_timeToClick: number;
  // Button variant (scroll-gated)
  button_order: number;
  button_timeMs: number;
  button_avgSpeed: number;
  button_maxSpeed: number;
  button_prematureClicks: number;
  button_pauses: number;
  button_directionChanges: number;
  button_timeToClick: number;
}

/**
 * Props for ToSTestTask component
 */
export interface ToSTestTaskProps {
  variant: ButtonVariant;
  onComplete: (metrics: VariantMetrics) => void;
  onMetricsUpdate?: (partial: Partial<VariantMetrics>) => void;
}

/**
 * Props for IntroTask component
 */
export interface IntroTaskProps {
  onComplete: (data: IntroTaskData) => void;
}

/**
 * Props for DownloadTask component
 */
export interface DownloadTaskProps {
  onComplete: (data: DownloadTaskData) => void;
}

/**
 * Props for ResultsScreen component
 */
export interface ResultsScreenProps {
  results: TestResults;
  onExportJSON: () => void;
  onExportCSV: () => void;
  onRestart?: () => void;
}

/**
 * Props for WelcomeScreen component
 */
export interface WelcomeScreenProps {
  onStart: () => void;
}
