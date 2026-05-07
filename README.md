# K12Launch — Marketing Website

The public marketing website for **K12Launch LLC**, a literacy tutor management platform serving the South Carolina Lowcountry and beyond.

**Live site:** https://k12launch.com

This repository contains the static marketing website only. The tutor platform application is hosted separately. All content, brand assets, and code are proprietary — see [LICENSE](LICENSE) for terms.

## Contributing

Pull requests and issues are welcome. By submitting a contribution you agree that K12Launch LLC retains all intellectual property rights to the codebase, content, and brand. See [LICENSE](LICENSE) for full terms.

---

# K12Launch Website — Deployment Guide

## File Structure

```
site-code/
├── index.html          # Homepage
├── for-tutors.html     # Tutor-facing features & pricing
├── for-parents.html    # Parent-facing info & FAQ
├── platform.html       # Platform feature deep-dive
├── pricing.html        # Pricing plans & comparison table
├── about.html          # Team bios & LLP partnership
├── contact.html        # Tutor application & parent intake forms
├── resources.html      # Blog / resource hub
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── css/
│   └── styles.css      # All styles — brand colors are at the top
└── js/
    └── main.js         # Nav, forms, accordion, pricing toggle
```

All files are plain HTML/CSS/JavaScript. No build step, no Node.js, no server required. Works on any web host including GoDaddy shared hosting.

---

## ACTION REQUIRED — When the Lovable App URL Changes

The "Log In" button in the navigation of all 10 HTML pages currently links to:

```
https://k12launchstudent.lovable.app
```

When Todd confirms the Lovable app URL has changed (or when the app moves to `app.k12launch.com`), perform a find-and-replace across all HTML files:

- **Find:** `https://k12launchstudent.lovable.app`
- **Replace with:** the new URL (e.g., `https://app.k12launch.com`)
- **Files affected:** all 10 `.html` files (23 total link occurrences)

This is a one-step change. Do not change the references to `app.k12launch.com` inside the body text of `privacy.html` and `terms.html` — those are domain name references, not links.

---

## Deploying to GoDaddy Shared Hosting

### Option A — File Manager (no software required)

1. Log in to your GoDaddy account at godaddy.com
2. Go to **My Products → Hosting → Manage**
3. Open **cPanel → File Manager**
4. Navigate to the `public_html` folder (this is your web root)
5. Delete or move any existing files you want to replace
6. Click **Upload** and upload the entire contents of this `site-code/` folder
   - Upload `index.html`, all `.html` files, and the `css/` and `js/` folders
   - Make sure the folder structure is preserved: `public_html/css/styles.css`, `public_html/js/main.js`, etc.
7. Visit your domain to verify the site loads

### Option B — FTP (FileZilla or similar)

1. In GoDaddy cPanel, find your **FTP credentials** (Hosting → FTP Accounts)
2. Open FileZilla and connect:
   - Host: your domain or the FTP hostname from GoDaddy
   - Username / Password: your FTP credentials
   - Port: 21
3. In the right panel (remote), navigate to `public_html/`
4. Drag the contents of this `site-code/` folder into `public_html/`
5. Confirm the transfer and visit your domain

### Pointing k12launch.com to the site

If the domain is already connected to the hosting account, the site will appear automatically once files are in `public_html/`. If you need to connect or redirect the domain:

1. GoDaddy → My Products → Domains → Manage → DNS
2. Ensure the **A record** for `@` points to your hosting server's IP address
3. DNS changes can take up to 24 hours to propagate

---

## Deploying to Any Other Host (Netlify, GitHub Pages, etc.)

The entire site is static — just upload the folder contents as-is.

**Netlify (recommended free option):**
1. Go to netlify.com and create a free account
2. Drag the `site-code/` folder onto the Netlify deploy page
3. Your site goes live instantly at a `*.netlify.app` URL
4. Add your custom domain in Site Settings → Domain Management

---

## Customizing the Brand Colors

Open `css/styles.css` and find the `:root` block near the top of the file. The brand colors are labeled clearly:

```css
:root {
  --primary:        #1A5276;   /* BRAND COLOR — main navy blue */
  --primary-light:  #2E86C1;   /* BRAND COLOR — lighter blue for gradients */
  --secondary:      #1E8449;   /* BRAND COLOR — green (tutors / success) */
  --secondary-light:#27AE60;   /* BRAND COLOR — lighter green */
  --accent:         #E67E22;   /* BRAND COLOR — orange (CTAs, highlights) */
  --accent-dark:    #CA6F1E;   /* BRAND COLOR — darker orange for hover */
  ...
}
```

Update any of these hex values to match your exact logo/brand colors. Every button, heading, gradient, and badge in the site will update automatically.

---

## Replacing the Logo

The current logo is a CSS text element (`K12Launch`). To replace it with your actual logo image:

1. Add your logo file (e.g., `logo.png` or `logo.svg`) to `site-code/` (or a subfolder like `site-code/img/`)
2. Open any HTML file and find all instances of:
   ```html
   <a href="index.html" class="nav-logo"><span class="nav-logo-text">K12<span>Launch</span></span></a>
   ```
3. Replace the inner span with an `<img>` tag:
   ```html
   <a href="index.html" class="nav-logo"><img src="img/logo.png" alt="K12Launch" height="36" /></a>
   ```
4. Repeat in all 10 HTML files (nav header + footer in each)

The logo appears in both the sticky header and the footer on every page.

---

## Wiring the Contact Forms

The tutor application and parent intake forms on `contact.html` are built and validated — they just need a backend to send the data somewhere. The integration point is in `js/main.js` (look for the comment `// INTEGRATION POINT`).

### Option A — Formspree (free, easiest)

1. Go to formspree.io and create a free account
2. Create a new form and copy your form endpoint (e.g., `https://formspree.io/f/xabcdefg`)
3. In `contact.html`, add `action="https://formspree.io/f/xabcdefg"` to each `<form>` tag
4. Remove the `novalidate` attribute and the JS form handler for those forms — Formspree handles the redirect

### Option B — Keep the JS handler, wire to a fetch endpoint

In `js/main.js`, replace the `setTimeout` stub in the form handler with a real `fetch()`:

```javascript
// Replace this:
await new Promise(resolve => setTimeout(resolve, 1000));

// With something like:
const response = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
});
if (!response.ok) throw new Error('Submit failed');
```

### Option C — GoDaddy managed WordPress / PHP form

GoDaddy cPanel includes PHP. You can create a simple `submit.php` handler and point the form `action` to it.

---

## Setting Up the app.k12launch.com Subdomain

The nav "Log In" button links to `https://app.k12launch.com`. To activate this:

1. GoDaddy → Domains → Manage → DNS
2. Add a **CNAME record**: `app` → your Lovable app's domain (e.g., `k12launchstudent.lovable.app`)
3. Or add an **A record** pointing to whatever server your platform app runs on after migration

Once DNS is live, `app.k12launch.com` will route to the platform without changing any links in the site code.

---

## Setting Up hello@k12launch.com Email

1. GoDaddy → My Products → Professional Email (or Google Workspace)
2. Add a Google Workspace account for your domain ($6/user/month)
3. This gives you `hello@k12launch.com`, `katie@k12launch.com`, etc. with full Gmail access
4. GoDaddy will walk you through updating your MX records automatically

---

## Adding Google Analytics

To track site traffic, add this just before `</head>` in each HTML file (replace `G-XXXXXXXXXX` with your GA4 Measurement ID):

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Get your Measurement ID at analytics.google.com → Admin → Create Property.

---

## What's Not Yet Live (Coming Soon features)

The platform pages and pricing cards include "Coming Soon" badges for features that are planned but not yet built:

- Scheduling & calendar sync
- Quoting / invoicing
- Parent dashboard
- Tutor-student matching algorithm
- Group sessions
- Content shop

These badges are plain HTML and can be removed once features ship. Search for `badge-soon` in any HTML file to find all instances.

---

## Before Going Live Checklist

- [ ] Update brand colors in `css/styles.css` if hex values differ from current logo
- [ ] Replace CSS logo text with actual logo image file
- [ ] Add real tutor headshots to `about.html` (placeholders are currently colored divs with initials)
- [ ] Wire contact forms to Formspree or another handler
- [ ] Set up `hello@k12launch.com` and `katie@k12launch.com` email addresses
- [ ] Have a qualified attorney review `terms.html` and `privacy.html` before launch (especially the COPPA section and independent contractor language)
- [ ] Point `k12launch.com` domain to the new hosting location
- [ ] Configure `app.k12launch.com` subdomain to point to the platform
- [ ] Add Google Analytics tracking to all pages
- [ ] Test all pages on mobile (iPhone and Android)
- [ ] Test contact forms end-to-end (submit → receive email)

---

*K12Launch LLC · Charleston, SC · hello@k12launch.com*
