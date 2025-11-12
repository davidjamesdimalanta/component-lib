/**
 * Download task component - final step after ToS acceptance
 * Simulates app download completion
 */

import { useState } from 'react';
import type { DownloadTaskProps, DownloadTaskData } from '../UserTest.types';

/**
 * @description Download completion screen after ToS acceptance
 * @param onComplete - Callback when download task is finished
 * @returns Download success screen component
 * @example
 * <DownloadTask onComplete={(data) => handleDownloadComplete(data)} />
 */
export function DownloadTask({ onComplete }: DownloadTaskProps): JSX.Element {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDownload = (): void => {
    setIsDownloading(true);

    // Simulate download progress
    setTimeout(() => {
      setIsDownloading(false);
      setIsComplete(true);

      // Complete the task
      const data: DownloadTaskData = {
        completedAt: new Date().toISOString(),
        downloadInitiated: true,
      };

      // Delay slightly before calling onComplete to show success state
      setTimeout(() => {
        onComplete(data);
      }, 1000);
    }, 2000); // 2 second simulated download
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {!isComplete ? (
          <>
            <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 mx-auto">
              <svg
                className="w-10 h-10 text-green-600"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-900 mb-3">
              Terms Accepted!
            </h1>
            <p className="text-center text-gray-600 mb-8">
              You're ready to download the Apple app. Click below to begin.
            </p>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                isDownloading
                  ? 'bg-blue-400 cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isDownloading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Downloading...
                </span>
              ) : (
                'Download App'
              )}
            </button>

            <p className="mt-6 text-xs text-center text-gray-500">
              This is a simulated download for research purposes only.
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 mx-auto">
              <svg
                className="w-10 h-10 text-green-600"
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-900 mb-3">
              Download Complete!
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Thank you for participating. Preparing your results...
            </p>

            <div className="flex items-center justify-center">
              <div className="animate-pulse flex gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
