/**
 * Main User Test orchestrator component
 * Manages A/B test flow and coordinates all phases
 */

import { useState, useEffect, useRef } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { IntroTask } from './components/IntroTask';
import { ToSTestTask } from './components/ToSTestTask';
import { DownloadTask } from './components/DownloadTask';
import { ResultsScreen } from './components/ResultsScreen';
import {
  generateSessionId,
  randomizeVariantOrder,
  getVariantForTest,
  getOrderForVariant,
} from './utils/randomization';
import type {
  TestPhase,
  VariantOrder,
  IntroTaskData,
  VariantMetrics,
  DownloadTaskData,
  TestResults,
} from './UserTest.types';

/**
 * @description Main orchestrator for A/B user testing
 * @returns Complete user test flow with metrics collection
 * @example
 * <UserTest />
 */
export function UserTest(): JSX.Element {
  // Phase management
  const [phase, setPhase] = useState<TestPhase>('welcome');

  // Session data
  const [sessionId] = useState(() => generateSessionId());
  const [variantOrder] = useState<VariantOrder>(() => randomizeVariantOrder());

  // Timing
  const testStartTimeRef = useRef<number | null>(null);

  // Collected data
  const [introData, setIntroData] = useState<IntroTaskData | null>(null);
  const [test1Metrics, setTest1Metrics] = useState<VariantMetrics | null>(null);
  const [test2Metrics, setTest2Metrics] = useState<VariantMetrics | null>(null);
  const [downloadData, setDownloadData] = useState<DownloadTaskData | null>(
    null
  );

  // Log session initialization
  useEffect(() => {
    console.log('[UserTest] Session initialized');
    console.log('Session ID:', sessionId);
    console.log('Variant Order:', variantOrder.join(' → '));
  }, [sessionId, variantOrder]);

  // Handle welcome screen completion
  const handleWelcomeComplete = (): void => {
    console.log('[UserTest] Welcome complete, moving to intro task');
    setPhase('intro');
  };

  // Handle intro task completion
  const handleIntroComplete = (data: IntroTaskData): void => {
    console.log('[UserTest] Intro task complete');
    console.log('Participant:', data.name, '-', data.email);
    setIntroData(data);
    testStartTimeRef.current = Date.now();
    setPhase('test1');
  };

  // Handle test 1 completion
  const handleTest1Complete = (metrics: VariantMetrics): void => {
    console.log('[UserTest] Test 1 complete');
    console.log('Variant:', metrics.variant);
    console.log('Time on task:', metrics.timeOnTaskMs, 'ms');

    // Update metrics with correct order
    const metricsWithOrder: VariantMetrics = {
      ...metrics,
      order: getOrderForVariant(variantOrder, metrics.variant),
    };

    setTest1Metrics(metricsWithOrder);
    setPhase('test2');
  };

  // Handle test 2 completion
  const handleTest2Complete = (metrics: VariantMetrics): void => {
    console.log('[UserTest] Test 2 complete');
    console.log('Variant:', metrics.variant);
    console.log('Time on task:', metrics.timeOnTaskMs, 'ms');

    // Update metrics with correct order
    const metricsWithOrder: VariantMetrics = {
      ...metrics,
      order: getOrderForVariant(variantOrder, metrics.variant),
    };

    setTest2Metrics(metricsWithOrder);
    setPhase('download');
  };

  // Handle download task completion
  const handleDownloadComplete = (data: DownloadTaskData): void => {
    console.log('[UserTest] Download task complete');
    setDownloadData(data);
    setPhase('results');
  };

  // Handle restart
  const handleRestart = (): void => {
    window.location.reload();
  };

  // Build final results
  const buildResults = (): TestResults | null => {
    if (
      !introData ||
      !test1Metrics ||
      !test2Metrics ||
      !downloadData ||
      !testStartTimeRef.current
    ) {
      return null;
    }

    const endTime = Date.now();
    const totalTimeMs = endTime - testStartTimeRef.current;

    // Organize metrics by variant (not by order)
    const controlMetrics =
      test1Metrics.variant === 'control' ? test1Metrics : test2Metrics;
    const buttonMetrics =
      test1Metrics.variant === 'button' ? test1Metrics : test2Metrics;

    return {
      sessionId,
      timestamp: new Date().toISOString(),
      variantOrder,
      totalTimeMs,
      introTask: introData,
      variants: {
        control: controlMetrics,
        button: buttonMetrics,
      },
      downloadTask: downloadData,
    };
  };

  // Render appropriate phase
  const renderPhase = (): JSX.Element => {
    switch (phase) {
      case 'welcome':
        return <WelcomeScreen onStart={handleWelcomeComplete} />;

      case 'intro':
        return <IntroTask onComplete={handleIntroComplete} />;

      case 'test1': {
        const variant = getVariantForTest(variantOrder, 1);
        return (
          <ToSTestTask
            key="test1"
            variant={variant}
            onComplete={handleTest1Complete}
          />
        );
      }

      case 'test2': {
        const variant = getVariantForTest(variantOrder, 2);
        return (
          <ToSTestTask
            key="test2"
            variant={variant}
            onComplete={handleTest2Complete}
          />
        );
      }

      case 'download':
        return <DownloadTask onComplete={handleDownloadComplete} />;

      case 'results': {
        const results = buildResults();
        if (!results) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-600 font-semibold mb-2">
                  Error building results
                </p>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Restart
                </button>
              </div>
            </div>
          );
        }
        return (
          <ResultsScreen
            results={results}
            onRestart={handleRestart}
            onExportJSON={() => {}}
            onExportCSV={() => {}}
          />
        );
      }

      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <p>Unknown phase: {phase}</p>
          </div>
        );
    }
  };

  return <div className="user-test">{renderPhase()}</div>;
}
