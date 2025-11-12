/**
 * Intro task: Sign-up form for Apple app download
 * Collects basic information before Terms of Service review
 */

import { useState, useRef, useEffect, type FormEvent } from 'react';
import type { IntroTaskProps, IntroTaskData } from '../UserTest.types';

/**
 * @description Sign-up form for Apple app download context
 * @param onComplete - Callback with completed form data
 * @returns Sign-up form component
 * @example
 * <IntroTask onComplete={(data) => handleIntroComplete(data)} />
 */
export function IntroTask({ onComplete }: IntroTaskProps): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; terms?: string }>({});

  const startTimeRef = useRef<number>(Date.now());

  // Reset start time on mount
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; terms?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateForm()) {
      const endTime = Date.now();
      const durationMs = endTime - startTimeRef.current;

      const data: IntroTaskData = {
        name: name.trim(),
        email: email.trim(),
        agreedToTerms,
        completedAt: new Date().toISOString(),
        durationMs,
      };

      onComplete(data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Download Apple App
          </h1>
          <p className="text-center text-gray-600">
            Enter your information to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="john@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Terms agreement */}
          <div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className={`mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                  errors.terms ? 'border-red-500' : ''
                }`}
                aria-invalid={!!errors.terms}
                aria-describedby={errors.terms ? 'terms-error' : undefined}
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                I agree to receive communications about this app and understand that I will need
                to review the full Terms of Service before downloading.
              </label>
            </div>
            {errors.terms && (
              <p id="terms-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.terms}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Continue to Terms of Service
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-500">
          Your information is used for research purposes only and will not be shared.
        </p>
      </div>
    </div>
  );
}
