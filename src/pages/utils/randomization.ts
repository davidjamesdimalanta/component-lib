/**
 * Randomization utilities for A/B testing
 * Uses native browser APIs (crypto.randomUUID, Math.random)
 */

import type { VariantOrder, ButtonVariant } from '../UserTest.types';

/**
 * Generates a unique session identifier using Web Crypto API
 * @returns UUID v4 string (e.g., "550e8400-e29b-41d4-a716-446655440000")
 */
export function generateSessionId(): string {
  // Use crypto.randomUUID() for cryptographically secure UUIDs
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers (not cryptographically secure)
  console.warn('[randomization] crypto.randomUUID not available, using fallback');
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Randomly assigns variant order for within-subjects testing
 * @returns Tuple of [first variant, second variant] with randomized order
 * @example
 * const order = randomizeVariantOrder();
 * // Returns either ['control', 'button'] or ['button', 'control'] with 50/50 probability
 */
export function randomizeVariantOrder(): VariantOrder {
  const controlFirst = Math.random() < 0.5;

  if (controlFirst) {
    return ['control', 'button'];
  }

  return ['button', 'control'];
}

/**
 * Gets the variant for a specific test number (1 or 2) based on assigned order
 * @param order - The randomized variant order
 * @param testNumber - Which test (1 = first, 2 = second)
 * @returns The variant to display for this test
 * @example
 * const order = ['button', 'control'];
 * getVariantForTest(order, 1); // Returns 'button'
 * getVariantForTest(order, 2); // Returns 'control'
 */
export function getVariantForTest(
  order: VariantOrder,
  testNumber: 1 | 2
): ButtonVariant {
  return order[testNumber - 1];
}

/**
 * Determines the order number (1 or 2) for a given variant based on the assigned order
 * @param order - The randomized variant order
 * @param variant - The variant to find
 * @returns 1 if this variant appears first, 2 if second
 * @example
 * const order = ['button', 'control'];
 * getOrderForVariant(order, 'button');  // Returns 1
 * getOrderForVariant(order, 'control'); // Returns 2
 */
export function getOrderForVariant(
  order: VariantOrder,
  variant: ButtonVariant
): 1 | 2 {
  const index = order.indexOf(variant);
  return (index + 1) as 1 | 2;
}

/**
 * Formats variant order as human-readable string
 * @param order - The variant order tuple
 * @returns Formatted string (e.g., "control → bar")
 */
export function formatVariantOrder(order: VariantOrder): string {
  return `${order[0]} → ${order[1]}`;
}
