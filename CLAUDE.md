# K12Launch-Website — Claude Code Instructions

This is the **live marketing website** for K12Launch LLC, hosted on GitHub Pages at `k12launch.com`. All HTML/CSS/JS edits to the live site happen here.

---

## Product Architecture

Three distinct properties under k12launch.com:

| Domain | Name | Purpose | Hosting |
|--------|------|---------|---------|
| `k12launch.com` | K-12 Launch | Marketing website for tutors and parents | GitHub Pages (this repo) |
| `hq.k12launch.com` | **Launch HQ** | Tutor back-office: scheduling, quoting, invoicing, expense tracking | TBD — see Launch HQ options below |
| `app.k12launch.com` | **K-12 Launch Student App** | Literacy assessment/report tool | Lovable |

**Repo structure:** HTML/CSS/JS files live at the repo root — there is no `site-code` subfolder.

**Two things called "CNAME" — don't mix them up:**
- The `CNAME` **file** in this repo → tells GitHub Pages to serve this repo at `k12launch.com`. Already in place. Do not touch it for subdomain work.
- A `CNAME` **DNS record** in GoDaddy → routes a subdomain (e.g., `hq` or `app`) to an external host. This is what you create for each subdomain.

**Subdomain DNS setup (same steps for hq and app):**
1. In the target tool (Lovable, Dubsado, HoneyBook, etc.) → add the custom domain → it gives you a CNAME target value.
2. In GoDaddy → My Products → k12launch.com → DNS → Add New Record: Type=CNAME, Name=hq (or app), Value=target from step 1, TTL=1hr.
3. Propagates in 5–30 minutes. No changes needed in this repo.

**The subdomain is just a pointer — the backend tool doesn't matter.** `hq.k12launch.com` will work whether it points at Lovable, Dubsado, HoneyBook, or anything else that supports custom domains.

### Launch HQ — Three Implementation Options (not yet decided)

The subdomain is tool-agnostic. Three realistic paths:

| Option | Approach | Effort | Recommendation |
|--------|----------|--------|---------------|
| **1 — Native tool with custom domain** | Point `hq.k12launch.com` at Dubsado, HoneyBook, or Practice. They handle scheduling, quoting, invoicing, contracts natively and all support custom domains. | Low | **Start here** |
| **2 — Lovable portal linking to native tools** | Build a simple branded dashboard in Lovable at `hq.k12launch.com` that deep-links out to Calendly, Wave, QuickBooks, etc. Portal is the "face" of Launch HQ. | Low-medium | Good if brand consistency matters before tools are decided |
| **3 — Unified Lovable app via APIs** | Custom Lovable app that calls Calendly, Stripe, QuickBooks APIs to pull data into one interface. | High | Migrate here later once you know exactly what tutors need |

**Decision pending.** When `hq.k12launch.com` is pointed at a specific tool, update the architecture table above and any links in the website code that reference it.

---

## Naming Decisions

**DO NOT use the word "platform"** — it caused user confusion and was removed from all copy.

| Old term | Correct term |
|----------|-------------|
| "The platform" / "our platform" | "Launch HQ" (back-office tools) or the specific tool name |
| "Platform" (nav link) | Removed from nav entirely — content moved into Educators page |
| "platform.html" | Needs to be rewritten; not linked from nav |
| "Student platform" | "K12Launch Student App" |
| "For Tutors" (nav) | "Educators" |
| "For Parents" (nav) | "Parents" |
| "Pricing" (nav) | Removed from nav — pricing content lives on the Educators page |
| "K-12 Launch" | "K12Launch" (no hyphen, no space) |
| "tutor" / "tutors" in copy | "educator" / "educators" |
| "Find a Tutor" | "Find an Educator" |
| "Request a Tutor" | "Request an Educator" |
| "Apply as a Tutor" | "Apply as an Educator" |

**No emoji in copy or icons.** Katie flagged emoji as looking "very AI." Use letter-based icons in brand-color boxes instead (e.g., `R` for Roster, `A` for Assessments, `AI` for Lesson Builder, `$` for Invoicing).

**Starter tier** is labeled "Limited" — it has a restricted feature set and does not include Student App access.

**K-12 Launch Student App** access is included in Growth and Pro tiers only. It also has a standalone direct-subscription channel for users not on a Launch HQ plan.

**LLP (Lowcountry Literacy Project)** references belong on the About page only — they have been removed from pricing feature lists and the comparison table.

---

## GitHub Workflow Notes

### Two separate folders — don't confuse them

| Folder | Purpose |
|--------|---------|
| `C:\Users\treel\K12 Launch\` | Working/content folder — notes, docs, marketing assets, planning files |
| `C:\Users\treel\Documents\GitHub\K12Launch-Website\` | **This repo** — the live site; what gets published to k12launch.com |

**Always write website edits directly to this repo.** Do not write to the working folder and copy over — that creates a sync problem.

### Pages updated (as of 2026-06-09)

All primary pages have been updated. Outstanding items:

| File | Status | What's needed |
|------|--------|--------------|
| `platform.html` | Low priority — not in nav | Rewrite or redirect to `for-tutors.html#features` |
| Log In link (all pages) | Pending DNS | Update from `k12launchstudent.lovable.app` to `app.k12launch.com` once subdomain is live |

### What was committed on 2026-05-21
- `index.html` — hero, proof bar, audience panels, feature cards, pricing preview, footer
- `pricing.html` — tier cards, comparison table, Student App callout, nav
- `css/styles.css` — logo height fix (`height: 62px` on `.nav-logo img`)
- All other HTML files — nav updated (Educators/Parents), footer taglines updated, tutor→educator

### What was committed on 2026-06-10
- `index.html` — removed How It Works, removed Pricing Preview, CTA → "Learn how to join →", footer tagline shortened, Company list cleaned
- `about.html` — full rewrite: new hero, Origin (Katie only), updated bios, LLP section removed
- `resources.html` — full rewrite: Coming Soon view with six live community platform tiles
- `for-tutors.html`, `for-parents.html`, `contact.html`, `platform.html`, `pricing.html` — footer logo → transparent, tagline updated
- `assets/k12launch-brand-logo-web.png` — new (nav logo, color on white)
- `assets/k12launch-brand-logo-transparent.png` — new (footer logo, transparent background for CSS invert)
