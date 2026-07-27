/**
 * Single source of truth for anything that needs an absolute URL.
 *
 * Set NEXT_PUBLIC_SITE_URL in the Vercel project when the custom domain is
 * live; everything below (metadataBase, canonicals, sitemap, JSON-LD) follows
 * from it, so the domain move is a one-line change.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://amr-eldeeb.vercel.app"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Amr Eldeeb",
  jobTitle: "Full Stack Developer",
  title: "Amr Eldeeb — Full Stack Developer",
  description:
    "Full stack developer in Doha, Qatar. I build React and TypeScript front ends on backends I own — Supabase, Postgres, Express and Python. Case studies on Sortak, Body Level and StudyWise.",
  locality: "Doha",
  country: "Qatar",
  email: "amr.eldeeb172@gmail.com",
  url: siteUrl,
  ogImage: `${siteUrl}/og.png`,
  socials: [
    "https://github.com/FeuPhoenix",
    "https://www.linkedin.com/in/amr-eldeeb-cs/",
  ],
  alumniOf: "Misr International University",
} as const;
