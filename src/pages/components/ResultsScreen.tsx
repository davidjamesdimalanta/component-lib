/**
 * Results screen - displays test metrics and export options
 * Shows comparison between control and bar variants
 */

import { useEffect } from 'react';
import type { ResultsScreenProps } from '../UserTest.types';
import {
  exportAsJSON,
  exportAsCSV,
  logResultsToConsole,
} from '../utils/exportResults';

/**
 * @description Results summary screen with export functionality
 * @param results - Complete test results
 * @param onExportJSON - Callback to trigger JSON export
 * @param onExportCSV - Callback to trigger CSV export
 * @param onRestart - Optional callback to restart the test
 * @returns Results display component
 */
export function ResultsScreen({
  results,
  onRestart,
}: ResultsScreenProps): JSX.Element {
  // Log results to console on mount
  useEffect(() => {
    logResultsToConsole(results);
  }, [results]);

  const controlMetrics = results.variants.control;
  const buttonMetrics = results.variants.button;

  const handleExportJSON = (): void => {
    exportAsJSON(results);
  };

  const handleExportCSV = (): void => {
    exportAsCSV(results);
  };

  const formatTime = (ms: number): string => {
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatSpeed = (pxPerSec: number): string => {
    return `${pxPerSec.toFixed(1)} px/s`;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Test Complete!
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Thank you for participating. Here are your results.
          </p>

          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Session ID</div>
              <div className="text-xs font-mono text-gray-900">
                {results.sessionId.slice(0, 8)}...
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Total Time</div>
              <div className="text-lg font-bold text-gray-900">
                {formatTime(results.totalTimeMs)}
              </div>
            </div>
          </div>
        </div>

        {/* Variant Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Control Variant */}
          {controlMetrics && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <h2 className="text-xl font-bold text-gray-900">
                  Control (Standard Button)
                </h2>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Tested {controlMetrics.order === 1 ? 'first' : 'second'}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Time on Task</span>
                  <span className="font-semibold text-gray-900">
                    {formatTime(controlMetrics.timeOnTaskMs)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Avg Scroll Speed</span>
                  <span className="font-semibold text-gray-900">
                    {formatSpeed(controlMetrics.scrollMetrics.averageSpeed)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Max Scroll Speed</span>
                  <span className="font-semibold text-gray-900">
                    {formatSpeed(controlMetrics.scrollMetrics.maxSpeed)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Premature Clicks</span>
                  <span className="font-semibold text-gray-900">
                    {controlMetrics.interactionMetrics.prematureClicks}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Scroll Pauses</span>
                  <span className="font-semibold text-gray-900">
                    {controlMetrics.scrollMetrics.pauses.length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Direction Changes</span>
                  <span className="font-semibold text-gray-900">
                    {controlMetrics.scrollMetrics.directionChanges}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Button Variant (Scroll-Gated) */}
          {buttonMetrics && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <h2 className="text-xl font-bold text-gray-900">
                  Button (Scroll-Gated)
                </h2>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Tested {buttonMetrics.order === 1 ? 'first' : 'second'}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Time on Task</span>
                  <span className="font-semibold text-gray-900">
                    {formatTime(buttonMetrics.timeOnTaskMs)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Avg Scroll Speed</span>
                  <span className="font-semibold text-gray-900">
                    {formatSpeed(buttonMetrics.scrollMetrics.averageSpeed)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Max Scroll Speed</span>
                  <span className="font-semibold text-gray-900">
                    {formatSpeed(buttonMetrics.scrollMetrics.maxSpeed)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Premature Clicks</span>
                  <span className="font-semibold text-gray-900">
                    {buttonMetrics.interactionMetrics.prematureClicks}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Scroll Pauses</span>
                  <span className="font-semibold text-gray-900">
                    {buttonMetrics.scrollMetrics.pauses.length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Direction Changes</span>
                  <span className="font-semibold text-gray-900">
                    {buttonMetrics.scrollMetrics.directionChanges}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Export Your Data
          </h2>
          <p className="text-gray-600 mb-6">
            Download your complete test results for further analysis. Results
            have also been logged to the browser console (press F12 to view).
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              type="button"
              onClick={handleExportJSON}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Download JSON
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Download CSV
            </button>
            {onRestart && (
              <button
                type="button"
                onClick={onRestart}
                className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Start New Test
              </button>
            )}
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Your data has been logged to the console.
              Open Developer Tools (F12 or Cmd+Option+I) and check the Console
              tab to see detailed metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
