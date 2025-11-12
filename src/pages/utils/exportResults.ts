/**
 * Export utilities for test results (JSON and CSV formats)
 * Uses native browser APIs (Blob, URL.createObjectURL)
 */

import type { TestResults, CSVRow } from '../UserTest.types';

/**
 * Converts TestResults to flattened CSV row format
 * @param results - Complete test results object
 * @returns Flattened object suitable for CSV export
 */
function resultsToCSVRow(results: TestResults): CSVRow {
  const controlMetrics = results.variants.control;
  const buttonMetrics = results.variants.button;

  return {
    sessionId: results.sessionId,
    timestamp: results.timestamp,
    variantOrder: results.variantOrder.join(' → '),
    totalTimeMs: results.totalTimeMs,
    // Intro task
    introName: results.introTask.name,
    introEmail: results.introTask.email,
    introDurationMs: results.introTask.durationMs,
    // Control variant
    control_order: controlMetrics?.order ?? 0,
    control_timeMs: controlMetrics?.timeOnTaskMs ?? 0,
    control_avgSpeed: controlMetrics?.scrollMetrics.averageSpeed ?? 0,
    control_maxSpeed: controlMetrics?.scrollMetrics.maxSpeed ?? 0,
    control_prematureClicks: controlMetrics?.interactionMetrics.prematureClicks ?? 0,
    control_pauses: controlMetrics?.scrollMetrics.pauses.length ?? 0,
    control_directionChanges: controlMetrics?.scrollMetrics.directionChanges ?? 0,
    control_timeToClick: controlMetrics?.interactionMetrics.timeToClickAfterEnabledMs ?? 0,
    // Button variant (scroll-gated)
    button_order: buttonMetrics?.order ?? 0,
    button_timeMs: buttonMetrics?.timeOnTaskMs ?? 0,
    button_avgSpeed: buttonMetrics?.scrollMetrics.averageSpeed ?? 0,
    button_maxSpeed: buttonMetrics?.scrollMetrics.maxSpeed ?? 0,
    button_prematureClicks: buttonMetrics?.interactionMetrics.prematureClicks ?? 0,
    button_pauses: buttonMetrics?.scrollMetrics.pauses.length ?? 0,
    button_directionChanges: buttonMetrics?.scrollMetrics.directionChanges ?? 0,
    button_timeToClick: buttonMetrics?.interactionMetrics.timeToClickAfterEnabledMs ?? 0,
  };
}

/**
 * Converts CSV row object to CSV string format
 * @param row - Flattened CSV row data
 * @returns CSV string with header and data row
 */
function csvRowToString(row: CSVRow): string {
  // Define column headers
  const headers = Object.keys(row);

  // Build header row
  const headerRow = headers.join(',');

  // Build data row (escape values with commas or quotes)
  const dataRow = headers
    .map((key) => {
      const value = row[key as keyof CSVRow];
      const stringValue = String(value);

      // Escape values containing commas, quotes, or newlines
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    })
    .join(',');

  return `${headerRow}\n${dataRow}`;
}

/**
 * Exports test results as JSON file download
 * @param results - Complete test results object
 * @param filename - Optional custom filename (default: auto-generated)
 */
export function exportAsJSON(results: TestResults, filename?: string): void {
  // Pretty-print JSON with 2-space indentation
  const jsonString = JSON.stringify(results, null, 2);

  // Create Blob from JSON string
  const blob = new Blob([jsonString], { type: 'application/json' });

  // Generate filename with timestamp if not provided
  const defaultFilename = `user-test-results-${results.sessionId.slice(0, 8)}-${Date.now()}.json`;
  const downloadFilename = filename ?? defaultFilename;

  // Trigger download
  downloadFile(blob, downloadFilename);

  console.log('[exportResults] JSON export completed:', downloadFilename);
}

/**
 * Exports test results as CSV file download
 * @param results - Complete test results object
 * @param filename - Optional custom filename (default: auto-generated)
 */
export function exportAsCSV(results: TestResults, filename?: string): void {
  // Convert to CSV row format
  const csvRow = resultsToCSVRow(results);

  // Convert to CSV string
  const csvString = csvRowToString(csvRow);

  // Create Blob from CSV string
  const blob = new Blob([csvString], { type: 'text/csv' });

  // Generate filename with timestamp if not provided
  const defaultFilename = `user-test-results-${results.sessionId.slice(0, 8)}-${Date.now()}.csv`;
  const downloadFilename = filename ?? defaultFilename;

  // Trigger download
  downloadFile(blob, downloadFilename);

  console.log('[exportResults] CSV export completed:', downloadFilename);
}

/**
 * Triggers browser download of Blob content
 * @param blob - Data to download
 * @param filename - Download filename
 */
function downloadFile(blob: Blob, filename: string): void {
  // Create object URL from Blob
  const url = URL.createObjectURL(blob);

  // Create temporary anchor element
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';

  // Append to DOM, click, and cleanup
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Revoke object URL after download starts
  // Use setTimeout to ensure download initiates first
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Logs test results to browser console with formatting
 * @param results - Complete test results object
 */
export function logResultsToConsole(results: TestResults): void {
  console.group('📊 User Test Results');
  console.log('Session ID:', results.sessionId);
  console.log('Timestamp:', results.timestamp);
  console.log('Variant Order:', results.variantOrder.join(' → '));
  console.log('Total Time:', `${(results.totalTimeMs / 1000).toFixed(2)}s`);

  console.group('📝 Intro Task');
  console.log('Name:', results.introTask.name);
  console.log('Email:', results.introTask.email);
  console.log('Duration:', `${(results.introTask.durationMs / 1000).toFixed(2)}s`);
  console.groupEnd();

  // Log control variant metrics
  if (results.variants.control) {
    const control = results.variants.control;
    console.group(`🔵 Control Variant (Order: ${control.order})`);
    console.log('Time on Task:', `${(control.timeOnTaskMs / 1000).toFixed(2)}s`);
    console.log('Avg Scroll Speed:', `${control.scrollMetrics.averageSpeed.toFixed(1)} px/s`);
    console.log('Max Scroll Speed:', `${control.scrollMetrics.maxSpeed.toFixed(1)} px/s`);
    console.log('Premature Clicks:', control.interactionMetrics.prematureClicks);
    console.log('Scroll Pauses:', control.scrollMetrics.pauses.length);
    console.log('Direction Changes:', control.scrollMetrics.directionChanges);
    console.log('Time to Click After Enabled:', `${(control.interactionMetrics.timeToClickAfterEnabledMs / 1000).toFixed(2)}s`);
    console.groupEnd();
  }

  // Log button variant metrics
  if (results.variants.button) {
    const button = results.variants.button;
    console.group(`🟢 Button Variant (Scroll-Gated) (Order: ${button.order})`);
    console.log('Time on Task:', `${(button.timeOnTaskMs / 1000).toFixed(2)}s`);
    console.log('Avg Scroll Speed:', `${button.scrollMetrics.averageSpeed.toFixed(1)} px/s`);
    console.log('Max Scroll Speed:', `${button.scrollMetrics.maxSpeed.toFixed(1)} px/s`);
    console.log('Premature Clicks:', button.interactionMetrics.prematureClicks);
    console.log('Scroll Pauses:', button.scrollMetrics.pauses.length);
    console.log('Direction Changes:', button.scrollMetrics.directionChanges);
    console.log('Time to Click After Enabled:', `${(button.interactionMetrics.timeToClickAfterEnabledMs / 1000).toFixed(2)}s`);
    console.groupEnd();
  }

  console.log('Full Results Object:', results);
  console.groupEnd();
}

/**
 * Exports results in multiple formats (console + downloads)
 * @param results - Complete test results object
 */
export function exportAllFormats(results: TestResults): void {
  // Log to console first
  logResultsToConsole(results);

  // Export as JSON
  exportAsJSON(results);

  // Export as CSV
  exportAsCSV(results);
}
