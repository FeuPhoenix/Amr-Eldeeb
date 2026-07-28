# Pointing the site at amreldeebdev.com

Do these in order. Steps 4 and 5 will break the live site if you do them before
DNS resolves, so don't jump ahead.

---

## 1. Buy the domain (Cloudflare)

1. Cloudflare dashboard → **Domain Registration** → **Register Domain**
2. Search `amreldeebdev.com`, add to cart, complete checkout
3. Leave **Auto-renew on**. A portfolio that 404s because a renewal lapsed is
   worse than never having had the domain
4. Cloudflare enables WHOIS redaction by default — leave it on, it keeps your
   home address out of public WHOIS

Optional: grab `froggyamr.com` in the same checkout and point it at the same
site later. It costs about the same as a coffee per year.

---

## 2. Add the domain to Vercel

Vercel → project **amr-eldeeb** → **Settings** → **Domains** → **Add**.

Add **both**:

- `amreldeebdev.com`
- `www.amreldeebdev.com`

Set **`amreldeebdev.com` as Primary**. Vercel will then 308-redirect the `www`
version to the apex automatically, so both work but only one is canonical.

Vercel will show you the exact DNS records it wants. **Use what the dashboard
shows you** — the values below are the usual ones, but Vercel has changed them
before.

---

## 3. Add the DNS records (Cloudflare)

Cloudflare → your domain → **DNS** → **Records**.

| Type  | Name  | Value                  | Proxy status         |
| ----- | ----- | ---------------------- | -------------------- |
| A     | `@`   | `76.76.21.21`          | **DNS only (grey)**  |
| CNAME | `www` | `cname.vercel-dns.com` | **DNS only (grey)**  |

> **The proxy setting is the part people get wrong.** Cloudflare defaults to
> the orange cloud (Proxied). Leave it on and Vercel cannot complete its TLS
> challenge, you get certificate errors, and you end up with two CDNs fighting
> over caching. Click the cloud so it goes **grey / DNS only** on both records.

Also set Cloudflare **SSL/TLS → Overview → Full (strict)**. With the proxy off
this matters less, but it prevents a redirect loop if the proxy ever gets
switched on later.

Propagation is usually a few minutes. Wait until Vercel shows both domains as
**Valid Configuration** with a certificate issued before continuing.

---

## 4. Point the app at the new domain

Only once step 3 shows valid in Vercel.

```bash
vercel env rm  NEXT_PUBLIC_SITE_URL production   # if one already exists
printf 'https://amreldeebdev.com' | vercel env add NEXT_PUBLIC_SITE_URL production
printf 'https://amreldeebdev.com' | vercel env add NEXT_PUBLIC_SITE_URL preview
printf 'https://amreldeebdev.com' | vercel env add NEXT_PUBLIC_SITE_URL development
```

Everything absolute derives from this single value — `metadataBase`, every
canonical tag, the OpenGraph and Twitter image URLs, `sitemap.xml` and
`robots.txt`. See `data/site.ts`.

Then redeploy so the new value is baked into the build.

---

## 5. Stop the .vercel.app URL competing in search

`amr-eldeeb.vercel.app` keeps working after you add a custom domain, and Google
will happily index both. Two copies of the same site split your ranking and
Google picks a winner you don't control.

Handled in the Vercel dashboard rather than vercel.json: Domains -> Edit on
amr-eldeeb.vercel.app -> "Redirect to Another Domain" -> 308 -> amreldeebdev.com.
A `redirects` block with a `has: host` condition in vercel.json was tried first

```json
"redirects": [
  {
    "source": "/:path*",
    "has": [{ "type": "host", "value": "amr-eldeeb.vercel.app" }],
    "destination": "https://amreldeebdev.com/:path*",
    "permanent": true
  }
]
```

That 308s every request on the old hostname to the same path on the new one, so
existing links keep working and the ranking signal transfers.

> **Do not add this before the domain resolves.** Until then it redirects your
> only working URL to a domain that does not exist.

---

## 6. Tell Google

1. [Google Search Console](https://search.google.com/search-console) → add
   `amreldeebdev.com` as a **Domain** property
2. Verify via DNS — Cloudflare → DNS → add the TXT record it gives you
3. **Sitemaps** → submit `https://amreldeebdev.com/sitemap.xml`
4. **URL Inspection** → paste the homepage → **Request Indexing**

Worth knowing: there is another Amr Eldeeb, a product designer in Denmark, who
owns `amreldeeb.com` and ranks well. You are not going to outrank him for your
bare name quickly. Aim at the searches you can actually win — "Amr Eldeeb
developer", "full stack developer Doha", "Amr Eldeeb Qatar" — which is why the
JSON-LD carries your job title and location.

---

## 7. Update everything that points at the old URL

- **CV** (`public/Amr_Eldeeb_Resume.pdf`) — the header still links
  `amr-eldeeb.vercel.app`. Regenerate it and replace the file in `public/`
- **LinkedIn** — contact info and the featured section
- **GitHub** — profile website field, and the `homepage` field on the
  `Amr-Eldeeb` repo
- **Web3Forms** — update the site URL on the form settings
- Email signature, if you use one

---

## Verifying it worked

```bash
curl -sI https://amreldeebdev.com            | head -1   # expect 200
curl -sI https://www.amreldeebdev.com        | head -1   # expect 308 to apex
curl -sI https://amr-eldeeb.vercel.app       | head -1   # expect 308 after step 5
curl -s  https://amreldeebdev.com | grep -o '<link rel="canonical"[^>]*>'
curl -s  https://amreldeebdev.com/sitemap.xml | head -5
```

Canonicals and the sitemap should all read `amreldeebdev.com`. If they still
say `vercel.app`, the env var did not make it into the build — check step 4 and
redeploy.
