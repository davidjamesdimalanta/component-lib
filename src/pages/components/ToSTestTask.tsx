/**
 * ToS Test Task component - displays Terms of Service with metrics tracking
 * Supports both control (regular button) and bar (progress indicator) variants
 */

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type FormEvent,
} from 'react';
import { ScrollProgressButton } from '../../components/ScrollProgressButton';
import { useScrollProgress } from '../../components/ScrollProgressButton/useScrollProgress';
import { useMetricsTracker } from '../hooks/useMetricsTracker';
import type { ToSTestTaskProps } from '../UserTest.types';

/**
 * Apple ToS content component (reusable)
 */
const AppleToSContent = (): JSX.Element => (
  <>
    <h2 className="text-xl font-semibold mb-4">
      Apple Media Services Terms and Conditions
    </h2>

    <h3 className="text-lg font-semibold mb-3">A. INTRODUCTION</h3>
    <p className="mb-4">
      These terms establish a binding contract between you and Apple for using
      their services, which include purchasing, licensing, renting, or
      subscribing to content and apps. The agreement applies to services like
      the App Store, Apple Music, Apple TV, Apple Books, and similar platforms.
      Services are available in your country of residence ("Home Country"),
      which you specify when creating an account. You'll need compatible
      hardware, current software, and internet access to use these services.
    </p>

    <h3 className="text-lg font-semibold mb-3">
      B. PAYMENTS, TAXES, AND REFUNDS
    </h3>
    <p className="mb-4">
      Transactions occur between you and Apple or the content provider. Apple
      charges your selected payment method for paid transactions and applicable
      taxes. You can use Touch ID or Face ID for authentication. Apple may
      charge alternate payment methods if your primary one fails. Pre-orders are
      charged upon delivery unless cancelled beforehand.
    </p>
    <p className="mb-4">
      <strong>All Transactions are final.</strong> If technical issues prevent
      delivery, your remedy is replacement or refund. Apple reserves the right
      to suspend payments or refuse refunds if fraud or abuse is suspected.
    </p>

    <h3 className="text-lg font-semibold mb-3">C. ACCOUNT</h3>
    <p className="mb-4">
      An Apple Account is required for accessing services. You must be at least
      thirteen years old (or the equivalent minimum age in your region) to
      create an account. Parents or guardians can create accounts for minors
      using Family Sharing or through educational institutions. You're
      responsible for maintaining account confidentiality and security.
    </p>

    <h3 className="text-lg font-semibold mb-3">D. PRIVACY</h3>
    <p className="mb-4">
      Service usage is governed by Apple's Privacy Policy, available at their
      legal privacy webpage.
    </p>

    <h3 className="text-lg font-semibold mb-3">E. ACCESSIBILITY</h3>
    <p className="mb-4">
      Information about accessibility features is available on Apple's
      accessibility labels webpage.
    </p>

    <h3 className="text-lg font-semibold mb-3">
      F. SERVICES AND CONTENT USAGE RULES
    </h3>
    <p className="mb-3">
      <strong>General Rules:</strong>
    </p>
    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>Services and content are for personal, noncommercial use only</li>
      <li>
        You may use content from up to five different Apple Accounts per device
      </li>
      <li>
        Maximum ten devices (five computers) can be signed in simultaneously per
        account
      </li>
      <li>Devices can switch accounts once every ninety days</li>
      <li>
        Manipulating play counts, downloads, ratings, or reviews is prohibited
      </li>
      <li>Scraping, copying, or monitoring content is forbidden</li>
      <li>Back up your content regularly</li>
      <li>Don't tamper with security technologies</li>
      <li>Access services only through Apple's official software</li>
    </ul>

    <p className="mb-3">
      <strong>Audio and Video Content:</strong>
    </p>
    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>DRM-free content works on reasonable numbers of your devices</li>
      <li>DRM-protected content: up to five computers and synced devices</li>
      <li>
        Rentals: single device viewing, playable within thirty days, completable
        within forty-eight hours
      </li>
      <li>Audio playlists can be burned to disc up to seven times</li>
      <li>
        Purchased content remains available for download/access, though removal
        is possible
      </li>
    </ul>

    <h3 className="text-lg font-semibold mb-3">
      G. TERMINATION AND SUSPENSION OF SERVICES
    </h3>
    <p className="mb-4">
      Apple may terminate your account or suspend services without notice if you
      violate the agreement. You remain liable for all charges through
      termination. Apple reserves the right to modify, suspend, or discontinue
      services at any time without liability.
    </p>

    <h3 className="text-lg font-semibold mb-3">H. DOWNLOADS</h3>
    <p className="mb-4">
      Content download amounts may be limited, and some content expires after
      being downloaded or first played. Previously purchased content can be
      redownloaded to devices using the same Apple Account, provided it remains
      available on the service. Content may be removed from services and become
      inaccessible.
    </p>

    <h3 className="text-lg font-semibold mb-3">I. SUBSCRIPTIONS</h3>
    <p className="mb-4">
      Subscriptions auto-renew until cancelled. You'll be notified of price
      increases and must consent to continue. Charges occur within twenty-four
      hours before the billing period. If payment fails, you remain responsible
      for amounts owed. Free trials cannot be combined with Apple One free
      offers (excluding iCloud). Free trials for Apple subscriptions expire even
      if you subscribe to Apple One.
    </p>

    <h3 className="text-lg font-semibold mb-3">
      J. CONTENT AND SERVICE AVAILABILITY
    </h3>
    <p className="mb-4">
      Terms applicable to services unavailable in your region don't apply until
      availability changes. Content availability varies by country and may
      differ when traveling.
    </p>

    <h3 className="text-lg font-semibold mb-3">
      K. THIRD-PARTY DEVICES AND EQUIPMENT
    </h3>
    <p className="mb-4">
      Some features may be unavailable on non-Apple devices. Apple may
      automatically download updates to software on third-party equipment.
    </p>

    <h3 className="text-lg font-semibold mb-3">
      L. YOUR SUBMISSIONS TO OUR SERVICES
    </h3>
    <p className="mb-4">
      You may submit comments, ratings, reviews, pictures, videos, and podcasts.{' '}
      <em>
        "Except to the extent prohibited by law, you hereby grant Apple a
        worldwide, royalty-free, perpetual, nonexclusive license to use the
        materials you submit."
      </em>
    </p>
    <p className="mb-3">
      <strong>Submissions Guidelines prohibit:</strong>
    </p>
    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>Unauthorized or unlicensed content</li>
      <li>Objectionable, offensive, unlawful, or deceptive material</li>
      <li>Personal or confidential information of others</li>
      <li>Requests for minor information</li>
      <li>Impersonation or misrepresentation</li>
      <li>Spam or unsolicited advertising</li>
      <li>Compensated ratings or reviews</li>
      <li>Dishonest, abusive, or misleading reviews</li>
      <li>Illegal or fraudulent activity</li>
    </ul>

    <h3 className="text-lg font-semibold mb-3">M. FAMILY SHARING</h3>
    <p className="mb-4">
      The organizer must be at least eighteen years old and the parent/guardian
      of minors. Up to six family members can share eligible subscriptions and
      content.
    </p>
    <p className="mb-4">
      <strong>Purchase Sharing:</strong> The organizer pays for all family
      member transactions using their payment methods. Family members act as the
      organizer's agents.
    </p>
    <p className="mb-4">
      <strong>Ask to Buy:</strong> Allows organizers to approve transactions by
      family members under eighteen. It's enabled by default for those under
      thirteen and cannot be reactivated after the member turns eighteen.
    </p>
    <p className="mb-4">
      <strong>Rules:</strong> One family per person, max twice yearly joins,
      same Home Country required, device changes allowed once per ninety days.
    </p>

    <h3 className="text-lg font-semibold mb-3">
      N. SEASON PASS AND MULTI-PASS
    </h3>
    <p className="mb-4">
      Full price charges immediately upon purchase. Content remains downloadable
      for ninety days after the last episode becomes available. If fewer
      episodes than planned are delivered, Apple credits the account for missing
      episodes.
    </p>

    <h3 className="text-lg font-semibold mb-3">
      O. ADDITIONAL APP STORE TERMS
    </h3>
    <p className="mb-4">
      <strong>License:</strong> Apps are licensed, not sold. Apple acts as an
      agent for third-party developers.{' '}
      <em>
        "Apple is a third-party beneficiary of the Standard EULA or Custom EULA
        applicable to each Third Party App and may therefore enforce such
        agreement."
      </em>
    </p>
    <p className="mb-4">
      <strong>In-App Purchases:</strong> Consumed purchases cannot be
      transferred between devices. Authentication is required; additional
      purchases within fifteen minutes don't require re-authentication unless
      you've requested password confirmation for every purchase.
    </p>
    <p className="mb-4">
      <strong>App Maintenance:</strong> Apple supports only Apple Apps;
      developers support third-party apps.
    </p>

    <h3 className="text-lg font-semibold mb-3">
      P. ADDITIONAL TERMS FOR APP STORE, APPLE BOOKS, APPLE PODCASTS, AND SELECT
      CONTENT
    </h3>
    <p className="mb-4">
      Some content comes from third-party providers displayed during purchase.
      Apple acts as the agent; content providers are responsible for their
      content and claims.
    </p>

    <h3 className="text-lg font-semibold mb-3">
      Q. ADDITIONAL APPLE MUSIC TERMS
    </h3>
    <p className="mb-4">
      iCloud Music Library lets you access matched or uploaded songs, playlists,
      and videos across devices. You can upload up to one hundred thousand
      songs. When membership ends, access to iCloud Music Library is lost.
    </p>

    <h3 className="text-lg font-semibold mb-3">
      R. ADDITIONAL APPLE FITNESS+ TERMS
    </h3>
    <p className="mb-4 italic">
      "Apple Fitness+ is for entertainment and/or informational purposes only
      and is not intended to provide any medical advice."
    </p>

    <h3 className="text-lg font-semibold mb-3">S. RESELLER MEMBERSHIP</h3>
    <p className="mb-4">
      Resellers like wireless carriers may sell service memberships. The
      reseller is the merchant of record and handles billing. Your purchase
      relationship is governed by the reseller's terms, not this agreement.
    </p>

    <h3 className="text-lg font-semibold mb-3">T. MISCELLANEOUS TERMS</h3>
    <p className="mb-4">
      <strong>Definition of Apple:</strong> Apple entities vary by region: Apple
      Inc. (United States and Puerto Rico), Apple Canada Inc. (Canada), Apple
      Services Latam LLC (Mexico, Central/South America, Caribbean), Apple
      Services Pte. Ltd. (Multiple Asian regions), iTunes K.K. (Japan), Apple
      Pty Limited (Australia and New Zealand), Apple Distribution International
      Ltd. (All other regions).
    </p>
    <p className="mb-4">
      <strong>Contract Changes:</strong> Apple may modify terms at any time;
      continued use constitutes acceptance.
    </p>
    <p className="mb-4">
      <strong>Intellectual Property:</strong> Services contain proprietary
      information protected by copyright and intellectual property laws. No
      portion may be transferred, reproduced, or exploited without express
      authorization. Apple trademarks cannot be used without permission.
    </p>
    <p className="mb-4">
      <strong>Copyright:</strong> Apple owns most service and content
      copyrights. Copyright infringement claims should be directed to the
      copyright agent at the provided address. Apple may disable accounts of
      repeat infringers.
    </p>
    <p className="mb-4">
      <strong>Warranties and Liability:</strong>{' '}
      <em>
        "THE SERVICES AND ALL CONTENT DELIVERED TO YOU THROUGH THE SERVICES ARE
        (EXCEPT AS EXPRESSLY STATED BY APPLE) PROVIDED 'AS IS' AND 'AS
        AVAILABLE' FOR YOUR USE, WITHOUT WARRANTIES OF ANY KIND."
      </em>
    </p>
    <p className="mb-4">
      Apple isn't responsible for service interruptions, errors, or content
      unavailability.{' '}
      <em>
        "APPLE DOES NOT GUARANTEE, REPRESENT, OR WARRANT THAT YOUR USE OF THE
        SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE."
      </em>
    </p>
    <p className="mb-4">
      Apple has no liability for indirect, incidental, punitive, special, or
      consequential damages. You're responsible for backing up your system and
      content. Apple isn't liable for data charges or security breaches.
    </p>
    <p className="mb-4">
      <strong>Indemnity:</strong> You agree to indemnify Apple and release it
      from liability for decisions regarding content removal, access suspension,
      or investigation of violations.
    </p>
    <p className="mb-4">
      <strong>Statutory Exceptions:</strong> Public institutions may have
      provisions modified or invalidated under applicable law.
    </p>
    <p className="mb-4">
      <strong>Governing Law:</strong> California law applies except for EU, UK,
      Swiss, Norwegian, and Icelandic citizens, whose disputes fall under their
      local jurisdiction laws.
    </p>
    <p className="text-sm text-muted-foreground mt-6">
      Last Updated: September 15, 2025
    </p>
  </>
);

/**
 * @description ToS test task with metrics tracking for A/B testing
 * @param variant - Button variant to test (control or bar)
 * @param onComplete - Callback with collected metrics
 * @returns ToS task component with metrics tracking
 */
export function ToSTestTask({
  variant,
  onComplete,
}: ToSTestTaskProps): JSX.Element {
  const [isScrollComplete, setIsScrollComplete] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // For control variant, use basic scroll progress
  const scrollProgress = useScrollProgress(container);

  const handleContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      containerRef.current = node;
      setContainer(node);
    }
  }, []);

  // Set up metrics tracking
  const { completeTask, isScrollComplete: barScrollComplete } =
    useMetricsTracker({
      variant,
      order: 1, // Will be updated by parent
      containerRef,
      buttonRef,
      buttonEnabled: isScrollComplete, // Will be updated in effect
      enabled: true,
      onComplete,
    });

  // Track scroll completion for both variants
  useEffect(() => {
    if (variant === 'control' && scrollProgress >= 100) {
      setIsScrollComplete(true);
    } else if (variant === 'button' && barScrollComplete) {
      setIsScrollComplete(true);
    }
  }, [variant, scrollProgress, barScrollComplete]);

  // Handle form submission
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    completeTask();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-4">
            Please read the complete terms of service below.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Scrollable ToS container */}
          <div
            ref={handleContainerRef}
            className="border rounded-lg p-6 h-96 overflow-y-auto bg-white hide-scrollbar mb-6"
          >
            <AppleToSContent />
          </div>

          {/* Button below scrollable container - for both variants */}
          {variant === 'control' && (
            <div className="flex gap-4">
              <button
                ref={buttonRef}
                type="submit"
                disabled={!isScrollComplete}
                className={`flex-1 px-6 py-3 min-h-[2.75rem] rounded-lg font-medium transition-colors ${
                  isScrollComplete
                    ? 'bg-gray-800 text-white hover:bg-black cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Accept
              </button>
              <button
                type="button"
                className="px-6 py-3 min-h-[2.75rem] rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                onClick={() => alert('Cancelled (demo only)')}
              >
                Cancel
              </button>
            </div>
          )}

          {/* Scroll-gated button variant */}
          {variant === 'button' && container && (
            <div className="flex gap-4">
              <ScrollProgressButton
                mode="scroll-gated"
                variant="button"
                shape="rectangular"
                buttonText="Accept"
                buttonColor="bg-[#2b2b2b]"
                fillColor="bg-[#000000]"
                container={container}
                completionThreshold={100}
                className="flex-1"
                type="submit"
              />
              <button
                type="button"
                className="px-6 py-3 min-h-[2.75rem] rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                onClick={() => alert('Cancelled (demo only)')}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
