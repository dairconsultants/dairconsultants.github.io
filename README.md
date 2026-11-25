# DAIR Consultants: website

A static website for **DAIR Consultants** (Kochi, Kerala): bookkeeping and accounting, finance consulting, tax and compliance, AI in Finance, and Zero to One consulting.

It is plain HTML, CSS and JavaScript, with no build step, so GitHub Pages serves it as it is.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `services.html` | Services overview |
| `bookkeeping.html` | Bookkeeping & accounting |
| `finance-consulting.html` | Finance consulting |
| `tax-compliance.html` | Tax & compliance |
| `ai-in-finance.html` | AI in Finance |
| `zero-to-one.html` | Zero to One consulting |
| `about.html` | About |
| `insights.html` | Insights (articles list) |
| `gst-monthly-checklist.html`, `when-to-hire-a-cfo.html`, `investor-ready-books.html` | Articles |
| `contact.html` | Contact form and details |
| `privacy.html` | Privacy policy (have it reviewed before relying on it) |
| `404.html` | Page not found |
| `pricing.html`, `ai-labs.html`, `ai-consulting.html`, `article-3-day-close.html` | Redirects from old page addresses, so old links keep working |

## Before launch: things to replace

- **Email.** The site uses `dairconsultants@gmail.com`. To change it, use find-and-replace across all `.html` files. No phone number is shown; add one to the footer and `contact.html` when you have it.
- **Photographs.** The large panels show a brand graphic until you add photos. Each panel has a comment such as `<!-- PHOTO: the DAIR team at work -->`. Put your image in `assets/img/` and replace the `<svg class="art" ...>...</svg>` inside that `<figure>` with, for example:
  `<img src="assets/img/team.jpg" alt="The DAIR Consultants team in the Kochi office">`
- **Contact form.** Without a form service, the form opens the visitor's email app with their message filled in. To receive messages directly, create a free form at [formspree.io](https://formspree.io), then set `data-endpoint="https://formspree.io/f/your-id"` on `<form id="contact-form">` in `contact.html`.

## Brand

- Wordmark: "DAIR Consultants" in Nunito, DAIR in `#12372a`, Consultants in `#f2a93b` (DAIR switches to linen on the dark footer).
- Text: Poppins. Colours: evergreen `#12372A`, linen `#FAF6EE`, marigold `#F2A93B`, sage `#E3EBE4`.
- Everything is defined at the top of `assets/css/styles.css`.

## Structure

```
*.html            pages
assets/css/       styles.css
assets/js/        main.js (menu, header, contact form)
assets/fonts/     Poppins and Nunito (SIL Open Font License)
assets/img/       favicon, touch icon, social share image
```
