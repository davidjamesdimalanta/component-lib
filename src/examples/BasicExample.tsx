import React, { useState, useCallback, useEffect } from 'react';
import { ScrollProgressButton } from '../components/ScrollProgressButton';
import type { ScrollProgressButtonVariant } from '../components/ScrollProgressButton';
import { useReducedMotion } from '../components/ScrollProgressButton/useReducedMotion';
import { useScrollProgress } from '../components/ScrollProgressButton/useScrollProgress';

/**
 * PRIMARY USE CASE: Terms of Service Form (Scroll-Gated)
 * Button disabled until user scrolls through ToS content
 */
interface TermsOfServiceExampleProps {
  variant?: ScrollProgressButtonVariant;
}

export const TermsOfServiceExample: React.FC<TermsOfServiceExampleProps> = ({
  variant = 'button',
}) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const handleContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainer(node);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Terms accepted! Form submitted.');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4 text-muted-foreground">
        Please read and scroll through the entire terms to enable the submit
        button
      </p>

      <form onSubmit={handleSubmit}>
        {/* Wrapper for relative positioning of bar variant */}
        <div className="relative mb-6">
          <div
            ref={handleContainerRef}
            className="border rounded-lg p-6 h-96 overflow-y-auto bg-card hide-scrollbar"
          >
            <h2 className="text-xl font-semibold mb-4">Apple Media Services Terms and Conditions</h2>

            <h3 className="text-lg font-semibold mb-3">A. INTRODUCTION</h3>
            <p className="mb-4">
              These terms establish a binding contract between you and Apple for using their services, which include purchasing, licensing, renting, or subscribing to content and apps. The agreement applies to services like the App Store, Apple Music, Apple TV, Apple Books, and similar platforms. Services are available in your country of residence ("Home Country"), which you specify when creating an account. You'll need compatible hardware, current software, and internet access to use these services.
            </p>

            <h3 className="text-lg font-semibold mb-3">B. PAYMENTS, TAXES, AND REFUNDS</h3>
            <p className="mb-4">
              Transactions occur between you and Apple or the content provider. Apple charges your selected payment method for paid transactions and applicable taxes. You can use Touch ID or Face ID for authentication. Apple may charge alternate payment methods if your primary one fails. Pre-orders are charged upon delivery unless cancelled beforehand.
            </p>
            <p className="mb-4">
              <strong>All Transactions are final.</strong> If technical issues prevent delivery, your remedy is replacement or refund. Apple reserves the right to suspend payments or refuse refunds if fraud or abuse is suspected.
            </p>

            <h3 className="text-lg font-semibold mb-3">C. ACCOUNT</h3>
            <p className="mb-4">
              An Apple Account is required for accessing services. You must be at least thirteen years old (or the equivalent minimum age in your region) to create an account. Parents or guardians can create accounts for minors using Family Sharing or through educational institutions. You're responsible for maintaining account confidentiality and security.
            </p>

            <h3 className="text-lg font-semibold mb-3">D. PRIVACY</h3>
            <p className="mb-4">
              Service usage is governed by Apple's Privacy Policy, available at their legal privacy webpage.
            </p>

            <h3 className="text-lg font-semibold mb-3">E. ACCESSIBILITY</h3>
            <p className="mb-4">
              Information about accessibility features is available on Apple's accessibility labels webpage.
            </p>

            <h3 className="text-lg font-semibold mb-3">F. SERVICES AND CONTENT USAGE RULES</h3>
            <p className="mb-3"><strong>General Rules:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Services and content are for personal, noncommercial use only</li>
              <li>You may use content from up to five different Apple Accounts per device</li>
              <li>Maximum ten devices (five computers) can be signed in simultaneously per account</li>
              <li>Devices can switch accounts once every ninety days</li>
              <li>Manipulating play counts, downloads, ratings, or reviews is prohibited</li>
              <li>Scraping, copying, or monitoring content is forbidden</li>
              <li>Back up your content regularly</li>
              <li>Don't tamper with security technologies</li>
              <li>Access services only through Apple's official software</li>
            </ul>

            <p className="mb-3"><strong>Audio and Video Content:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>DRM-free content works on reasonable numbers of your devices</li>
              <li>DRM-protected content: up to five computers and synced devices</li>
              <li>Rentals: single device viewing, playable within thirty days, completable within forty-eight hours</li>
              <li>Audio playlists can be burned to disc up to seven times</li>
              <li>Purchased content remains available for download/access, though removal is possible</li>
            </ul>

            <p className="mb-3"><strong>App Store:</strong></p>
            <p className="mb-4">
              Apps include in-app purchases, extensions, and subscriptions. Enterprises may download apps for single or multiple users on shared devices.
            </p>

            <p className="mb-3"><strong>Apple Music:</strong></p>
            <p className="mb-4 italic">
              "An Individual Apple Music membership allows you to stream on a single device at a time; a Family membership allows you or your Family members to stream on up to six (6) devices at a time."
            </p>

            <p className="mb-3"><strong>Apple Arcade:</strong></p>
            <p className="mb-4">
              Apps require valid trial or active subscription. Apps become inaccessible when subscription ends.
            </p>

            <p className="mb-3"><strong>Apple TV:</strong></p>
            <p className="mb-4">
              Stream on up to three devices simultaneously for most channels.
            </p>

            <h3 className="text-lg font-semibold mb-3">G. TERMINATION AND SUSPENSION OF SERVICES</h3>
            <p className="mb-4">
              Apple may terminate your account or suspend services without notice if you violate the agreement. You remain liable for all charges through termination. Apple reserves the right to modify, suspend, or discontinue services at any time without liability.
            </p>

            <h3 className="text-lg font-semibold mb-3">H. DOWNLOADS</h3>
            <p className="mb-4">
              Content download amounts may be limited, and some content expires after being downloaded or first played. Previously purchased content can be redownloaded to devices using the same Apple Account, provided it remains available on the service. Content may be removed from services and become inaccessible.
            </p>

            <h3 className="text-lg font-semibold mb-3">I. SUBSCRIPTIONS</h3>
            <p className="mb-4">
              Subscriptions auto-renew until cancelled. You'll be notified of price increases and must consent to continue. Charges occur within twenty-four hours before the billing period. If payment fails, you remain responsible for amounts owed. Free trials cannot be combined with Apple One free offers (excluding iCloud). Free trials for Apple subscriptions expire even if you subscribe to Apple One.
            </p>

            <h3 className="text-lg font-semibold mb-3">J. CONTENT AND SERVICE AVAILABILITY</h3>
            <p className="mb-4">
              Terms applicable to services unavailable in your region don't apply until availability changes. Content availability varies by country and may differ when traveling.
            </p>

            <h3 className="text-lg font-semibold mb-3">K. THIRD-PARTY DEVICES AND EQUIPMENT</h3>
            <p className="mb-4">
              Some features may be unavailable on non-Apple devices. Apple may automatically download updates to software on third-party equipment.
            </p>

            <h3 className="text-lg font-semibold mb-3">L. YOUR SUBMISSIONS TO OUR SERVICES</h3>
            <p className="mb-4">
              You may submit comments, ratings, reviews, pictures, videos, and podcasts. <em>"Except to the extent prohibited by law, you hereby grant Apple a worldwide, royalty-free, perpetual, nonexclusive license to use the materials you submit."</em>
            </p>
            <p className="mb-3"><strong>Submissions Guidelines prohibit:</strong></p>
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
              The organizer must be at least eighteen years old and the parent/guardian of minors. Up to six family members can share eligible subscriptions and content.
            </p>
            <p className="mb-4">
              <strong>Purchase Sharing:</strong> The organizer pays for all family member transactions using their payment methods. Family members act as the organizer's agents.
            </p>
            <p className="mb-4">
              <strong>Ask to Buy:</strong> Allows organizers to approve transactions by family members under eighteen. It's enabled by default for those under thirteen and cannot be reactivated after the member turns eighteen.
            </p>
            <p className="mb-4">
              <strong>Rules:</strong> One family per person, max twice yearly joins, same Home Country required, device changes allowed once per ninety days.
            </p>

            <h3 className="text-lg font-semibold mb-3">N. SEASON PASS AND MULTI-PASS</h3>
            <p className="mb-4">
              Full price charges immediately upon purchase. Content remains downloadable for ninety days after the last episode becomes available. If fewer episodes than planned are delivered, Apple credits the account for missing episodes.
            </p>

            <h3 className="text-lg font-semibold mb-3">O. ADDITIONAL APP STORE TERMS</h3>
            <p className="mb-4">
              <strong>License:</strong> Apps are licensed, not sold. Apple acts as an agent for third-party developers. <em>"Apple is a third-party beneficiary of the Standard EULA or Custom EULA applicable to each Third Party App and may therefore enforce such agreement."</em>
            </p>
            <p className="mb-4">
              <strong>In-App Purchases:</strong> Consumed purchases cannot be transferred between devices. Authentication is required; additional purchases within fifteen minutes don't require re-authentication unless you've requested password confirmation for every purchase.
            </p>
            <p className="mb-4">
              <strong>App Maintenance:</strong> Apple supports only Apple Apps; developers support third-party apps.
            </p>
            <p className="mb-4">
              <strong>Search Rankings:</strong> Main parameters include metadata, customer engagement, and app popularity.
            </p>

            <p className="mb-3"><strong>Standard EULA:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Non-transferable license on owned Apple devices</li>
              <li>No network distribution or sublicensing</li>
              <li>No copying, reverse-engineering, or modification except as permitted by law</li>
              <li>Apple may collect technical data for updates and support</li>
              <li>Terminates automatically upon non-compliance</li>
              <li>External services used at your own risk; Apple isn't responsible for third-party content</li>
              <li><em>"THE LICENSED APPLICATION AND ANY SERVICES PERFORMED OR PROVIDED BY THE LICENSED APPLICATION ARE PROVIDED 'AS IS'"</em> without warranties</li>
            </ul>
            <p className="mb-4">
              <strong>Liability:</strong> Damages limited to $250 maximum in most jurisdictions.
            </p>

            <h3 className="text-lg font-semibold mb-3">P. ADDITIONAL TERMS FOR APP STORE, APPLE BOOKS, APPLE PODCASTS, AND SELECT CONTENT</h3>
            <p className="mb-4">
              Some content comes from third-party providers displayed during purchase. Apple acts as the agent; content providers are responsible for their content and claims.
            </p>

            <h3 className="text-lg font-semibold mb-3">Q. ADDITIONAL APPLE MUSIC TERMS</h3>
            <p className="mb-4">
              iCloud Music Library lets you access matched or uploaded songs, playlists, and videos across devices. You can upload up to one hundred thousand songs. When membership ends, access to iCloud Music Library is lost.
            </p>

            <h3 className="text-lg font-semibold mb-3">R. ADDITIONAL APPLE FITNESS+ TERMS</h3>
            <p className="mb-4 italic">
              "Apple Fitness+ is for entertainment and/or informational purposes only and is not intended to provide any medical advice."
            </p>

            <h3 className="text-lg font-semibold mb-3">S. RESELLER MEMBERSHIP</h3>
            <p className="mb-4">
              Resellers like wireless carriers may sell service memberships. The reseller is the merchant of record and handles billing. Your purchase relationship is governed by the reseller's terms, not this agreement.
            </p>

            <h3 className="text-lg font-semibold mb-3">T. MISCELLANEOUS TERMS</h3>
            <p className="mb-4">
              <strong>Definition of Apple:</strong> Apple entities vary by region: Apple Inc. (United States and Puerto Rico), Apple Canada Inc. (Canada), Apple Services Latam LLC (Mexico, Central/South America, Caribbean), Apple Services Pte. Ltd. (Multiple Asian regions), iTunes K.K. (Japan), Apple Pty Limited (Australia and New Zealand), Apple Distribution International Ltd. (All other regions).
            </p>
            <p className="mb-4">
              <strong>Contract Changes:</strong> Apple may modify terms at any time; continued use constitutes acceptance.
            </p>
            <p className="mb-4">
              <strong>Intellectual Property:</strong> Services contain proprietary information protected by copyright and intellectual property laws. No portion may be transferred, reproduced, or exploited without express authorization. Apple trademarks cannot be used without permission.
            </p>
            <p className="mb-4">
              <strong>Copyright:</strong> Apple owns most service and content copyrights. Copyright infringement claims should be directed to the copyright agent at the provided address. Apple may disable accounts of repeat infringers.
            </p>
            <p className="mb-4">
              <strong>Warranties and Liability:</strong> <em>"THE SERVICES AND ALL CONTENT DELIVERED TO YOU THROUGH THE SERVICES ARE (EXCEPT AS EXPRESSLY STATED BY APPLE) PROVIDED 'AS IS' AND 'AS AVAILABLE' FOR YOUR USE, WITHOUT WARRANTIES OF ANY KIND."</em>
            </p>
            <p className="mb-4">
              Apple isn't responsible for service interruptions, errors, or content unavailability. <em>"APPLE DOES NOT GUARANTEE, REPRESENT, OR WARRANT THAT YOUR USE OF THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE."</em>
            </p>
            <p className="mb-4">
              Apple has no liability for indirect, incidental, punitive, special, or consequential damages. You're responsible for backing up your system and content. Apple isn't liable for data charges or security breaches.
            </p>
            <p className="mb-4">
              <strong>Indemnity:</strong> You agree to indemnify Apple and release it from liability for decisions regarding content removal, access suspension, or investigation of violations.
            </p>
            <p className="mb-4">
              <strong>Statutory Exceptions:</strong> Public institutions may have provisions modified or invalidated under applicable law.
            </p>
            <p className="mb-4">
              <strong>Governing Law:</strong> California law applies except for EU, UK, Swiss, Norwegian, and Icelandic citizens, whose disputes fall under their local jurisdiction laws.
            </p>
            <p className="text-sm text-muted-foreground mt-6">
              Last Updated: September 15, 2025
            </p>
          </div>

          {/* Bar variant positioned absolutely at bottom of container */}
          {variant === 'bar' && (
            <ScrollProgressButton
              mode="scroll-gated"
              variant="bar"
              buttonText="Accept Terms"
              buttonColor="dark"
              fillColor="bg-gray-800"
              container={container}
              completionThreshold={95}
            />
          )}
        </div>

        {/* Button set below scrollable container - only for button variant */}
        {variant === 'button' && (
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
            />
            <button
              type="button"
              className="px-6 py-3 min-h-[2.75rem] rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              onClick={() => alert('Cancelled (demo only)')}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

/**
 * CONTROL: Terms of Service with Regular Disabled/Enabled Button
 * Traditional disabled button that enables at 100% scroll (no progress indicator)
 * Used as baseline comparison for ScrollProgressButton A/B testing
 */
export const ControlToSExample: React.FC = () => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [isScrollComplete, setIsScrollComplete] = useState(false);
  const scrollProgress = useScrollProgress(container);

  const handleContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainer(node);
    }
  }, []);

  useEffect(() => {
    if (scrollProgress >= 100) {
      setIsScrollComplete(true);
    }
  }, [scrollProgress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Terms accepted! Form submitted.');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Terms of Service (Control)</h1>
      <p className="mb-4 text-muted-foreground">
        Please read and scroll through the entire terms to enable the submit
        button
      </p>

      <form onSubmit={handleSubmit}>
        <div
          ref={handleContainerRef}
          className="border rounded-lg p-6 h-96 overflow-y-auto bg-card mb-6 hide-scrollbar"
        >
          <h2 className="text-xl font-semibold mb-4">Apple Media Services Terms and Conditions</h2>

          <h3 className="text-lg font-semibold mb-3">A. INTRODUCTION</h3>
          <p className="mb-4">
            These terms establish a binding contract between you and Apple for using their services, which include purchasing, licensing, renting, or subscribing to content and apps. The agreement applies to services like the App Store, Apple Music, Apple TV, Apple Books, and similar platforms. Services are available in your country of residence ("Home Country"), which you specify when creating an account. You'll need compatible hardware, current software, and internet access to use these services.
          </p>

          <h3 className="text-lg font-semibold mb-3">B. PAYMENTS, TAXES, AND REFUNDS</h3>
          <p className="mb-4">
            Transactions occur between you and Apple or the content provider. Apple charges your selected payment method for paid transactions and applicable taxes. You can use Touch ID or Face ID for authentication. Apple may charge alternate payment methods if your primary one fails. Pre-orders are charged upon delivery unless cancelled beforehand.
          </p>
          <p className="mb-4">
            <strong>All Transactions are final.</strong> If technical issues prevent delivery, your remedy is replacement or refund. Apple reserves the right to suspend payments or refuse refunds if fraud or abuse is suspected.
          </p>

          <h3 className="text-lg font-semibold mb-3">C. ACCOUNT</h3>
          <p className="mb-4">
            An Apple Account is required for accessing services. You must be at least thirteen years old (or the equivalent minimum age in your region) to create an account. Parents or guardians can create accounts for minors using Family Sharing or through educational institutions. You're responsible for maintaining account confidentiality and security.
          </p>

          <h3 className="text-lg font-semibold mb-3">D. PRIVACY</h3>
          <p className="mb-4">
            Service usage is governed by Apple's Privacy Policy, available at their legal privacy webpage.
          </p>

          <h3 className="text-lg font-semibold mb-3">E. ACCESSIBILITY</h3>
          <p className="mb-4">
            Information about accessibility features is available on Apple's accessibility labels webpage.
          </p>

          <h3 className="text-lg font-semibold mb-3">F. SERVICES AND CONTENT USAGE RULES</h3>
          <p className="mb-3"><strong>General Rules:</strong></p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Services and content are for personal, noncommercial use only</li>
            <li>You may use content from up to five different Apple Accounts per device</li>
            <li>Maximum ten devices (five computers) can be signed in simultaneously per account</li>
            <li>Devices can switch accounts once every ninety days</li>
            <li>Manipulating play counts, downloads, ratings, or reviews is prohibited</li>
            <li>Scraping, copying, or monitoring content is forbidden</li>
            <li>Back up your content regularly</li>
            <li>Don't tamper with security technologies</li>
            <li>Access services only through Apple's official software</li>
          </ul>

          <p className="mb-3"><strong>Audio and Video Content:</strong></p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>DRM-free content works on reasonable numbers of your devices</li>
            <li>DRM-protected content: up to five computers and synced devices</li>
            <li>Rentals: single device viewing, playable within thirty days, completable within forty-eight hours</li>
            <li>Audio playlists can be burned to disc up to seven times</li>
            <li>Purchased content remains available for download/access, though removal is possible</li>
          </ul>

          <p className="mb-3"><strong>App Store:</strong></p>
          <p className="mb-4">
            Apps include in-app purchases, extensions, and subscriptions. Enterprises may download apps for single or multiple users on shared devices.
          </p>

          <p className="mb-3"><strong>Apple Music:</strong></p>
          <p className="mb-4 italic">
            "An Individual Apple Music membership allows you to stream on a single device at a time; a Family membership allows you or your Family members to stream on up to six (6) devices at a time."
          </p>

          <p className="mb-3"><strong>Apple Arcade:</strong></p>
          <p className="mb-4">
            Apps require valid trial or active subscription. Apps become inaccessible when subscription ends.
          </p>

          <p className="mb-3"><strong>Apple TV:</strong></p>
          <p className="mb-4">
            Stream on up to three devices simultaneously for most channels.
          </p>

          <h3 className="text-lg font-semibold mb-3">G. TERMINATION AND SUSPENSION OF SERVICES</h3>
          <p className="mb-4">
            Apple may terminate your account or suspend services without notice if you violate the agreement. You remain liable for all charges through termination. Apple reserves the right to modify, suspend, or discontinue services at any time without liability.
          </p>

          <h3 className="text-lg font-semibold mb-3">H. DOWNLOADS</h3>
          <p className="mb-4">
            Content download amounts may be limited, and some content expires after being downloaded or first played. Previously purchased content can be redownloaded to devices using the same Apple Account, provided it remains available on the service. Content may be removed from services and become inaccessible.
          </p>

          <h3 className="text-lg font-semibold mb-3">I. SUBSCRIPTIONS</h3>
          <p className="mb-4">
            Subscriptions auto-renew until cancelled. You'll be notified of price increases and must consent to continue. Charges occur within twenty-four hours before the billing period. If payment fails, you remain responsible for amounts owed. Free trials cannot be combined with Apple One free offers (excluding iCloud). Free trials for Apple subscriptions expire even if you subscribe to Apple One.
          </p>

          <h3 className="text-lg font-semibold mb-3">J. CONTENT AND SERVICE AVAILABILITY</h3>
          <p className="mb-4">
            Terms applicable to services unavailable in your region don't apply until availability changes. Content availability varies by country and may differ when traveling.
          </p>

          <h3 className="text-lg font-semibold mb-3">K. THIRD-PARTY DEVICES AND EQUIPMENT</h3>
          <p className="mb-4">
            Some features may be unavailable on non-Apple devices. Apple may automatically download updates to software on third-party equipment.
          </p>

          <h3 className="text-lg font-semibold mb-3">L. YOUR SUBMISSIONS TO OUR SERVICES</h3>
          <p className="mb-4">
            You may submit comments, ratings, reviews, pictures, videos, and podcasts. <em>"Except to the extent prohibited by law, you hereby grant Apple a worldwide, royalty-free, perpetual, nonexclusive license to use the materials you submit."</em>
          </p>
          <p className="mb-3"><strong>Submissions Guidelines prohibit:</strong></p>
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
            The organizer must be at least eighteen years old and the parent/guardian of minors. Up to six family members can share eligible subscriptions and content.
          </p>
          <p className="mb-4">
            <strong>Purchase Sharing:</strong> The organizer pays for all family member transactions using their payment methods. Family members act as the organizer's agents.
          </p>
          <p className="mb-4">
            <strong>Ask to Buy:</strong> Allows organizers to approve transactions by family members under eighteen. It's enabled by default for those under thirteen and cannot be reactivated after the member turns eighteen.
          </p>
          <p className="mb-4">
            <strong>Rules:</strong> One family per person, max twice yearly joins, same Home Country required, device changes allowed once per ninety days.
          </p>

          <h3 className="text-lg font-semibold mb-3">N. SEASON PASS AND MULTI-PASS</h3>
          <p className="mb-4">
            Full price charges immediately upon purchase. Content remains downloadable for ninety days after the last episode becomes available. If fewer episodes than planned are delivered, Apple credits the account for missing episodes.
          </p>

          <h3 className="text-lg font-semibold mb-3">O. ADDITIONAL APP STORE TERMS</h3>
          <p className="mb-4">
            <strong>License:</strong> Apps are licensed, not sold. Apple acts as an agent for third-party developers. <em>"Apple is a third-party beneficiary of the Standard EULA or Custom EULA applicable to each Third Party App and may therefore enforce such agreement."</em>
          </p>
          <p className="mb-4">
            <strong>In-App Purchases:</strong> Consumed purchases cannot be transferred between devices. Authentication is required; additional purchases within fifteen minutes don't require re-authentication unless you've requested password confirmation for every purchase.
          </p>
          <p className="mb-4">
            <strong>App Maintenance:</strong> Apple supports only Apple Apps; developers support third-party apps.
          </p>
          <p className="mb-4">
            <strong>Search Rankings:</strong> Main parameters include metadata, customer engagement, and app popularity.
          </p>

          <p className="mb-3"><strong>Standard EULA:</strong></p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Non-transferable license on owned Apple devices</li>
            <li>No network distribution or sublicensing</li>
            <li>No copying, reverse-engineering, or modification except as permitted by law</li>
            <li>Apple may collect technical data for updates and support</li>
            <li>Terminates automatically upon non-compliance</li>
            <li>External services used at your own risk; Apple isn't responsible for third-party content</li>
            <li><em>"THE LICENSED APPLICATION AND ANY SERVICES PERFORMED OR PROVIDED BY THE LICENSED APPLICATION ARE PROVIDED 'AS IS'"</em> without warranties</li>
          </ul>
          <p className="mb-4">
            <strong>Liability:</strong> Damages limited to $250 maximum in most jurisdictions.
          </p>

          <h3 className="text-lg font-semibold mb-3">P. ADDITIONAL TERMS FOR APP STORE, APPLE BOOKS, APPLE PODCASTS, AND SELECT CONTENT</h3>
          <p className="mb-4">
            Some content comes from third-party providers displayed during purchase. Apple acts as the agent; content providers are responsible for their content and claims.
          </p>

          <h3 className="text-lg font-semibold mb-3">Q. ADDITIONAL APPLE MUSIC TERMS</h3>
          <p className="mb-4">
            iCloud Music Library lets you access matched or uploaded songs, playlists, and videos across devices. You can upload up to one hundred thousand songs. When membership ends, access to iCloud Music Library is lost.
          </p>

          <h3 className="text-lg font-semibold mb-3">R. ADDITIONAL APPLE FITNESS+ TERMS</h3>
          <p className="mb-4 italic">
            "Apple Fitness+ is for entertainment and/or informational purposes only and is not intended to provide any medical advice."
          </p>

          <h3 className="text-lg font-semibold mb-3">S. RESELLER MEMBERSHIP</h3>
          <p className="mb-4">
            Resellers like wireless carriers may sell service memberships. The reseller is the merchant of record and handles billing. Your purchase relationship is governed by the reseller's terms, not this agreement.
          </p>

          <h3 className="text-lg font-semibold mb-3">T. MISCELLANEOUS TERMS</h3>
          <p className="mb-4">
            <strong>Definition of Apple:</strong> Apple entities vary by region: Apple Inc. (United States and Puerto Rico), Apple Canada Inc. (Canada), Apple Services Latam LLC (Mexico, Central/South America, Caribbean), Apple Services Pte. Ltd. (Multiple Asian regions), iTunes K.K. (Japan), Apple Pty Limited (Australia and New Zealand), Apple Distribution International Ltd. (All other regions).
          </p>
          <p className="mb-4">
            <strong>Contract Changes:</strong> Apple may modify terms at any time; continued use constitutes acceptance.
          </p>
          <p className="mb-4">
            <strong>Intellectual Property:</strong> Services contain proprietary information protected by copyright and intellectual property laws. No portion may be transferred, reproduced, or exploited without express authorization. Apple trademarks cannot be used without permission.
          </p>
          <p className="mb-4">
            <strong>Copyright:</strong> Apple owns most service and content copyrights. Copyright infringement claims should be directed to the copyright agent at the provided address. Apple may disable accounts of repeat infringers.
          </p>
          <p className="mb-4">
            <strong>Warranties and Liability:</strong> <em>"THE SERVICES AND ALL CONTENT DELIVERED TO YOU THROUGH THE SERVICES ARE (EXCEPT AS EXPRESSLY STATED BY APPLE) PROVIDED 'AS IS' AND 'AS AVAILABLE' FOR YOUR USE, WITHOUT WARRANTIES OF ANY KIND."</em>
          </p>
          <p className="mb-4">
            Apple isn't responsible for service interruptions, errors, or content unavailability. <em>"APPLE DOES NOT GUARANTEE, REPRESENT, OR WARRANT THAT YOUR USE OF THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE."</em>
          </p>
          <p className="mb-4">
            Apple has no liability for indirect, incidental, punitive, special, or consequential damages. You're responsible for backing up your system and content. Apple isn't liable for data charges or security breaches.
          </p>
          <p className="mb-4">
            <strong>Indemnity:</strong> You agree to indemnify Apple and release it from liability for decisions regarding content removal, access suspension, or investigation of violations.
          </p>
          <p className="mb-4">
            <strong>Statutory Exceptions:</strong> Public institutions may have provisions modified or invalidated under applicable law.
          </p>
          <p className="mb-4">
            <strong>Governing Law:</strong> California law applies except for EU, UK, Swiss, Norwegian, and Icelandic citizens, whose disputes fall under their local jurisdiction laws.
          </p>
          <p className="text-sm text-muted-foreground mt-6">
            Last Updated: September 15, 2025
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!isScrollComplete}
            className={`
              flex-1 px-6 py-3 min-h-[2.75rem] rounded-lg
              ${isScrollComplete ? 'bg-[#000000]' : 'bg-[#2b2b2b]'}
              ${isScrollComplete ? 'text-white' : 'text-stone-300'}
              ${isScrollComplete ? 'cursor-pointer hover:bg-[#1a1a1a]' : 'cursor-not-allowed opacity-80'}
              transition-colors duration-300
            `}
          >
            Accept
          </button>
          <button
            type="button"
            className="px-6 py-3 min-h-[2.75rem] rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            onClick={() => alert('Cancelled (demo only)')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

/**
 * Content Completion Gate Example (Scroll-Gated)
 * Perfect for educational content or required reading
 */
export const ContentGateExample: React.FC = () => {
  const [canProceed, setCanProceed] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const handleContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainer(node);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Educational Content Gate</h1>
      <p className="mb-6 text-muted-foreground">
        Complete the reading (scroll to 100%) to unlock the next lesson
      </p>

      <div
        ref={handleContainerRef}
        className="border rounded-lg p-6 h-96 overflow-y-auto mb-6 bg-card"
      >

          <h2>Chapter 1: Introduction to Web Accessibility</h2>
          <p>
            Web accessibility ensures that websites, tools, and technologies are
            designed and developed so that people with disabilities can use
            them. More specifically, people can perceive, understand, navigate,
            and interact with the Web.
          </p>

          <h3>Why Accessibility Matters</h3>
          <p>
            Accessibility addresses discriminatory aspects related to equivalent
            user experience for people with disabilities. Web accessibility also
            benefits people without disabilities, for example:
          </p>
          <ul>
            <li>People using mobile phones, smart watches, smart TVs</li>
            <li>Older people with changing abilities due to aging</li>
            <li>People with temporary disabilities</li>
            <li>People with situational limitations</li>
          </ul>

          <h3>The Four Principles: POUR</h3>
          <p>
            Web accessibility is guided by four main principles. Content must
            be:
          </p>
          <ol>
            <li>
              <strong>Perceivable</strong> - Information must be presentable to
              users in ways they can perceive
            </li>
            <li>
              <strong>Operable</strong> - User interface components must be
              operable
            </li>
            <li>
              <strong>Understandable</strong> - Information and operation of
              user interface must be understandable
            </li>
            <li>
              <strong>Robust</strong> - Content must be robust enough to work
              with current and future technologies
            </li>
          </ol>

          <h3>Getting Started with ARIA</h3>
          <p>
            ARIA (Accessible Rich Internet Applications) provides a way to make
            web content and applications more accessible. ARIA attributes can be
            added to HTML elements to define roles, states, and properties.
          </p>

          <h3>Testing for Accessibility</h3>
          <p>
            Regular testing with screen readers, keyboard navigation, and
            automated tools helps ensure your web applications remain accessible
            to all users.
          </p>

      </div>

      <ScrollProgressButton
        mode="scroll-gated"
        variant="button"
        container={container}
        completionThreshold={100}
        type="button"
        onScrollComplete={() => setCanProceed(true)}
        onClick={() => {
          if (canProceed) {
            alert('Proceeding to next lesson!');
          }
        }}
        ariaLabel={
          canProceed
            ? 'Continue to next lesson'
            : 'Read all content to continue'
        }
      >
        {canProceed ? 'Next Lesson →' : ''}
      </ScrollProgressButton>
    </div>
  );
};

/**
 * Custom Completion Threshold Example (Scroll-Gated)
 * Button enables at 80% instead of default 95%
 */
export const CustomThresholdGatedExample: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const handleContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainer(node);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Custom Threshold (80%)</h1>
      <p className="mb-4 text-muted-foreground">
        Button enables after scrolling 80% of content
      </p>

      <div
        ref={handleContainerRef}
        className="border rounded-lg p-6 h-80 overflow-y-auto mb-4 bg-card"
      >
        <div className="space-y-4">
          {Array.from({ length: 15 }, (_, i) => (
            <p key={i}>
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
          ))}
        </div>
      </div>

      <ScrollProgressButton
        mode="scroll-gated"
        variant="bar"
        container={container}
        completionThreshold={80}
        type="button"
        onScrollComplete={() => setIsComplete(true)}
        onClick={() => alert('Button clicked!')}
        className="w-full h-10 rounded"
      >
        {isComplete ? 'Continue ✓' : 'Scroll to 80%'}
      </ScrollProgressButton>
    </div>
  );
};

/**
 * Bar Variant with Icon and Custom Text Example (Scroll-Gated)
 * Demonstrates bar variant with icon + custom button text
 */
export const BarVariantWithIconExample: React.FC = () => {
  const [isComplete2, setIsComplete2] = useState(false);
  const [container1, setContainer1] = useState<HTMLDivElement | null>(null);
  const [container2, setContainer2] = useState<HTMLDivElement | null>(null);

  const handleContainer1Ref = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainer1(node);
    }
  }, []);

  const handleContainer2Ref = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainer2(node);
    }
  }, []);

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bar Variant with Icon</h1>
      <p className="mb-4 text-muted-foreground">
        Bar variant supports icon + text, defaulting to "Accept"
      </p>

      <div className="space-y-8">
        {/* Example 1: Default "Accept" text */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Default Text (No Props)
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Bar displays "Accept" by default when no buttonText is provided
          </p>
          <div className="relative">
            <div
              ref={handleContainer1Ref}
              className="border rounded-lg p-6 h-80 overflow-y-auto bg-card"
            >
              <div className="space-y-4">
                {Array.from({ length: 15 }, (_, i) => (
                  <p key={i}>
                    Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris.
                  </p>
                ))}
              </div>
            </div>
            <ScrollProgressButton
              mode="scroll-gated"
              variant="bar"
              container={container1}
              completionThreshold={80}
              type="button"
              buttonColor="primary"
              onClick={() => alert('Default text clicked!')}
              className="rounded"
            />
          </div>
        </div>

        {/* Example 2: Custom text with icon */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Custom Text + Icon
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Bar displays custom text and icon when provided
          </p>
          <div className="relative">
            <div
              ref={handleContainer2Ref}
              className="border rounded-lg p-6 h-80 overflow-y-auto bg-card"
            >
              <div className="space-y-4">
                {Array.from({ length: 15 }, (_, i) => (
                  <p key={i}>
                    Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris.
                  </p>
                ))}
              </div>
            </div>
            <ScrollProgressButton
              mode="scroll-gated"
              variant="bar"
              container={container2}
              buttonText={isComplete2 ? 'Continue Reading' : 'Scroll to Continue'}
              icon={isComplete2 ? <CheckIcon /> : undefined}
              completionThreshold={80}
              type="button"
              buttonColor="dark"
              fillColor="bg-gray-800"
              onScrollComplete={() => setIsComplete2(true)}
              onClick={() => alert('Custom text + icon clicked!')}
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * LEGACY: Traditional Scroll-to-Top Button
 * Classic behavior: appears after threshold, scrolls to top on click
 */
export const ScrollToTopExample: React.FC = () => {
  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4">Legacy: Scroll-to-Top Button</h1>
      <p className="mb-8 text-muted-foreground">
        Traditional scroll-to-top button appears after scrolling 300px
      </p>

      <div className="space-y-4">
        {Array.from({ length: 25 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        ))}
      </div>

      <ScrollProgressButton
        mode="scroll-to-top"
        variant="button"
        threshold={300}
      />
    </div>
  );
};

/**
 * Legacy: Bar Variant Scroll-to-Top
 */
export const BarScrollToTopExample: React.FC = () => {
  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4 mt-8">
        Legacy: Bar Variant Scroll-to-Top
      </h1>
      <p className="mb-8 text-muted-foreground">
        Progress bar at top shows scroll progress, click to return to top
      </p>

      <div className="space-y-4">
        {Array.from({ length: 25 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        ))}
      </div>

      <ScrollProgressButton
        mode="scroll-to-top"
        variant="bar"
        threshold={300}
      />
    </div>
  );
};

/**
 * Legacy: Custom Container Scroll Tracking
 */
export const CustomContainerExample: React.FC = () => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const handleContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainer(node);
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Legacy: Custom Container Scroll
      </h1>
      <p className="mb-8 text-muted-foreground">
        Button tracks scroll within container, not the whole page
      </p>

      <div
        ref={handleContainerRef}
        className="h-96 overflow-auto border-2 border-border rounded-lg p-4 relative bg-card"
      >
        <h2 className="text-xl font-bold mb-4">Scrollable Container</h2>

        <div className="space-y-4">
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i}>
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>

        <ScrollProgressButton
          mode="scroll-to-top"
          container={container}
          threshold={100}
        />
      </div>
    </div>
  );
};

/**
 * Legacy: Custom onClick Handler
 */
export const CustomOnClickExample: React.FC = () => {
  const [clicks, setClicks] = useState(0);

  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4">
        Legacy: Custom onClick Handler
      </h1>
      <p className="mb-4 text-muted-foreground">
        Button with custom click handler (tracks clicks: {clicks})
      </p>

      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        ))}
      </div>

      <ScrollProgressButton
        mode="scroll-to-top"
        onClick={() => {
          setClicks((prev) => prev + 1);
          console.log('Button clicked!');
        }}
      />
    </div>
  );
};

/**
 * ACCESSIBILITY: Reduced Motion Support Example
 * Demonstrates automatic reduced motion handling via useReducedMotion hook
 */
export const ReducedMotionExample: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4">
        Accessibility: Reduced Motion Support
      </h1>
      <p className="mb-4 text-muted-foreground">
        This component automatically respects your motion preferences
      </p>

      <div className="mb-8 p-4 border rounded-lg bg-card">
        <h2 className="font-semibold mb-2">Current Motion Preference</h2>
        <p className="text-sm">
          Prefers Reduced Motion:{' '}
          <span
            className={`font-bold ${prefersReducedMotion ? 'text-blue-600' : 'text-gray-600'}`}
          >
            {prefersReducedMotion ? 'YES' : 'NO'}
          </span>
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {prefersReducedMotion
            ? 'Smooth scrolling is DISABLED - using instant scroll'
            : 'Smooth scrolling is ENABLED'}
        </p>
        <details className="mt-3 text-xs text-muted-foreground">
          <summary className="cursor-pointer hover:text-foreground">
            How to test this feature
          </summary>
          <div className="mt-2 space-y-1 pl-2">
            <p>
              <strong>macOS:</strong> System Settings → Accessibility → Display
              → Reduce motion
            </p>
            <p>
              <strong>Windows:</strong> Settings → Accessibility → Visual
              effects → Animation effects (turn off)
            </p>
            <p>
              <strong>Chrome DevTools:</strong> Cmd/Ctrl+Shift+P → "Emulate CSS
              prefers-reduced-motion"
            </p>
          </div>
        </details>
      </div>

      <div className="space-y-4 mb-8">
        {Array.from({ length: 25 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        ))}
      </div>

      {/* The button automatically uses the useReducedMotion hook internally */}
      <ScrollProgressButton
        mode="scroll-to-top"
        variant="button"
        threshold={300}
      />
    </div>
  );
};
