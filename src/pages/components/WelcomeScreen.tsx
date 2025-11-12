/**
 * Welcome and consent screen for user testing
 * Explains study purpose and obtains informed consent
 */

import type { WelcomeScreenProps } from '../UserTest.types';

/**
 * @description Welcome screen that explains the user test and obtains consent
 * @param onStart - Callback when user agrees to participate
 * @returns Welcome screen component with study information
 * @example
 * <WelcomeScreen onStart={() => setPhase('intro')} />
 */
export function WelcomeScreen({ onStart }: WelcomeScreenProps): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Experience Study
          </h1>
          <p className="text-lg text-gray-600">
            Help us improve app download experiences
          </p>
        </div>

        <div className="space-y-6 text-gray-700 mb-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              What You'll Do
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Fill out a brief sign-up form for an Apple app</li>
              <li>
                Review and accept Terms of Service (twice, using different
                interfaces)
              </li>
              <li>Complete the app download process</li>
            </ol>
            <p className="mt-3 text-sm text-gray-600">
              <strong>Estimated time:</strong> 3-5 minutes
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              What We're Testing
            </h2>
            <p>
              We're comparing two different ways of presenting Terms of Service
              agreements to understand which provides a better user experience.
              You'll complete the same task twice with different interface
              designs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Privacy & Data Collection
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Your interactions will be recorded (scroll behavior, clicks,
                timing)
              </li>
              <li>
                Data is anonymous and identified only by a random session ID
              </li>
              <li>Results will be shown to you at the end</li>
              <li>You can download your data as JSON or CSV files</li>
              <li>No personal information is shared or stored permanently</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Participation is completely voluntary</li>
              <li>You may close this window at any time to stop</li>
              <li>This is for research purposes only</li>
            </ul>
          </section>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>By clicking "I Agree, Start Test"</strong> you consent to
              participate in this study and understand that your interactions
              will be recorded for research purposes.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={onStart}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              I Agree, Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
