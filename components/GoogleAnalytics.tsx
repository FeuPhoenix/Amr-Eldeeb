import Script from "next/script";

/**
 * GA4, gated on NEXT_PUBLIC_GA_ID.
 *
 * With no ID set — local dev, preview branches, anyone who clones this — the
 * component renders nothing and no Google script is ever requested. That keeps
 * dev traffic out of the property and makes the tag one env var away from off.
 */
export const gaId = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
