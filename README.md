# Dair Consultants: website

A static, multi-page website for **Dair Consultants**: AI-powered bookkeeping, finance consulting, tax & compliance, and AI consulting (Dair AI Labs).

It's plain HTML, CSS and JavaScript, with no build step and no dependencies, so it runs directly on **GitHub Pages**.

## Publish on GitHub Pages (about 5 minutes)

1. Create a new repository on GitHub (for example `dair-website`). It must be **public** on a free GitHub plan.
2. Upload **everything in this folder** to the root of the repository, including the hidden `.nojekyll` file.
   - In the browser: **Add file → Upload files**, drag in all files and folders, then **Commit changes**.
   - Or with git:
     ```bash
     git init && git add . && git commit -m "Dair Consultants website"
     git branch -M main
     git remote add origin https://github.com/<your-user>/dair-website.git
     git push -u origin main
     ```
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select branch `main` and folder `/ (root)`, then **Save**.
4. After a minute or two the site is live at `https://<your-user>.github.io/dair-website/`.

### Use your own domain (optional)
In **Settings → Pages → Custom domain**, enter `www.dairconsultants.com` and save. GitHub adds a `CNAME` file for you. At your domain registrar, add a `CNAME` record pointing `www` to `<your-user>.github.io`, then tick **Enforce HTTPS** once it's available.

## Make the contact form deliver to your inbox

GitHub Pages can't run server code, so the form needs a form service. Until you set one up, the form opens the visitor's email app with their details already filled in, so it works from day one.

To receive submissions directly (free plan available):
1. Sign up at [formspree.io](https://formspree.io) and create a form. You'll get an endpoint like `https://formspree.io/f/abcdwxyz`.
2. In **both** `index.html` and `contact.html`, find `id="contact-form"` and set `data-endpoint="https://formspree.io/f/abcdwxyz"`.
3. Commit. Submissions now arrive by email and appear in your Formspree dashboard.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: hero, expertise panels, why Dair, process, contact form |
| `services.html` | Services overview and engagement models |
| `bookkeeping.html` | Bookkeeping & accounting |
| `finance-consulting.html` | Finance consulting / virtual CFO |
| `tax-compliance.html` | Tax & compliance (GST, TDS, income tax, ROC) |
| `ai-labs.html` | Dair AI Labs: AI consulting |
| `pricing.html` | Plans (monthly/annual toggle), add-ons, FAQ |
| `about.html` | Story, numbers, principles, team, timeline |
| `insights.html` | Blog index with category filters and newsletter sign-up |
| `article-3-day-close.html` | Sample article (copy it to write new posts) |
| `contact.html` | Discovery-call form, contact channels, FAQ |
| `privacy.html` | Privacy policy (template, so have it reviewed) |
| `404.html` | Custom "page not found" |

## What to edit

| What | Where |
| --- | --- |
| Email and phone | Every page's top bar and footer, plus `contact.html`. Use find-and-replace across all files for `hello@dairconsultants.com` and `+91 22 4000 0000`. |
| Navigation and footer links | They're repeated at the top and bottom of each `.html` file. Change them in every file (find-and-replace works well). |
| Copy, stats, prices | Directly in each page's HTML. Pricing amounts are in `pricing.html` (`data-monthly` / `data-annual`). |
| Team names | `about.html`. Replace the initials tiles with photos if you like. |
| New blog post | Duplicate `article-3-day-close.html`, edit it, then turn one of the "Coming soon" cards in `insights.html` into a link (`<a class="post" href="your-file.html" ...>`). |
| LinkedIn link | Footer of each page: replace `https://www.linkedin.com/` |
| Colours, fonts, spacing | `assets/css/styles.css`, the `:root` block at the top |
| Logos and share image | `assets/img/` |

> All figures (3 days, 99.2%, 140+, ₹2,400 Cr), prices, team names, the timeline, sample transactions and the phone number are **placeholders**. Replace them with real details before launch.

## Structure
```
*.html              13 pages (no build step, each file is complete)
.nojekyll           Tells GitHub Pages to serve files as-is
robots.txt
assets/
  css/styles.css    All styles (design tokens at the top)
  js/main.js        Menu, scroll effects, counters, forms, pricing toggle, blog filters
  fonts/            Sora, Inter, JetBrains Mono (SIL Open Font License)
  img/              Logos, favicon, app icon, social share image
```

## Features
- Responsive from 320px to wide desktop, with a full-screen mobile menu and a Services dropdown
- Stacked "Our expertise" panels that stick as you scroll
- Reveal-on-scroll and count-up animations that respect *reduce motion*
- Accessible: skip link, semantic landmarks, visible focus rings, AA contrast
- SEO and social: meta description, Open Graph image, favicon and touch icon
