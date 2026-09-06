# Taberne site — what's left to finish

The website is built, deployed, and works: **https://taberne.vercel.app**
(English `/`, Georgian `/ka.html`, Russian `/ru.html`).

Everything below needs real information or an account login that only the hotel
has. Each item says exactly what to change and where.

---

## 1. Real room prices

**File:** `js/calc.js` (top of the file)

```js
var RATES = {
  'Budget Twin Room': 60,      // <- replace each number with the real nightly rate
  'Standard Single': 65,
  'Standard Double': 75,
  'Standard Twin': 75,
  'Superior Double': 90,
  'Superior Twin': 90,
  'Family Room': 115,
  'Family Room with Balcony': 130
};
var CURRENCY = '$';            // change to 'GEL ' (with the space) if rates are in lari
```

The estimator in the "Reserve a room" section then shows correct totals.
The page still says "Example rates" until this is done — remove that line
(`<p class="calc-note …">`) in `index.html`, `ka.html`, `ru.html` once the
numbers are real.

Also the line under "Our rooms" says *"Rooms from around US$75 per night"* —
update or delete it in all three HTML files.

## 2. Payment methods

**File:** the "Good to know" section in `index.html`, `ka.html`, `ru.html`
(the `<h3>Payment</h3>` block). Currently a generic "cards and cash" line —
confirm what the hotel actually accepts.
(Check-in/out, children, pets, smoking, cancellation are already verified.)

## 3. Turn on real enquiry emails to info@taberne.ge

Right now the Reserve + Meetings forms deliver to a personal Gmail
(`nikolozbalanchivadze4@gmail.com`).

- **File:** `js/forms.js`, line ~8: `var EMAIL = '…';` → set to `info@taberne.ge`
- Also change the two `action="https://formsubmit.co/…"` URLs in each of
  `index.html`, `ka.html`, `ru.html` to `…/info@taberne.ge`
- Then submit either form once on the live site. FormSubmit sends an
  **"Activate Form"** email to info@taberne.ge — open that inbox and click the
  link. Done permanently after that.

## 4. Turn on real online booking (area.ly)

The Reserve section already contains the area.ly widget
(`<div id="ar-root" data-property="134">`), but it stays blank until area.ly
allows this website's address.

- Log in to the hotel's **area.ly** account → find the booking-engine / widget
  settings → add the site's domain to the allowed list
  (`taberne.vercel.app` now, or `taberne.ge` once the domain is moved).
- If area.ly support is needed: "we rebuilt our website, please enable the
  booking engine for this domain."

## 5. Proofread Georgian & Russian

Claude translated `ka.html` and `ru.html`. A native speaker should read both
once and note any wording to fix — send the corrections and they get applied.
(Room names and descriptions are intentionally left in English.)

## 6. Point taberne.ge at this site

When ready to replace the old website:

- **Vercel** → project `taberne` → Settings → Domains → add `taberne.ge` and
  `www.taberne.ge`. Vercel shows the exact DNS records.
- At the domain registrar, set those records (an `A` record for `@` and a
  `CNAME` for `www`). **Do not touch the `MX` records** — those run the email.
- After that, also update the hard-coded `https://taberne.vercel.app` URLs in
  the `<link rel="canonical">` / `og:url` / `og:image` tags (each HTML head),
  in `robots.txt`, and in `sitemap.xml`.

---

## Editing the site

Files live in the GitHub repo `github.com/Niko4182/taberne`. Any push to the
`main` branch redeploys automatically within a minute. To make a change:
edit the file, `git add`, `git commit`, `git push`.
