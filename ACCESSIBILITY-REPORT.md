# Accessibility & Function Audit: CSUF POSC Honor Societies

**Date:** September 26, 2026
**Sites:** csuf.club (portal), paa.csuf.club (Pi Alpha Alpha), psa.csuf.club (Pi Sigma Alpha)
**Target:** WCAG 2.2 Level AA
**Method:** axe-core 4.13 (via Playwright/Chromium) on all 11 pages in light and dark color schemes, with every modal opened and every FAQ panel expanded; html-validate 11.16 on every page; scripted keyboard, form-submission, and 320px-width reflow tests.

This replaces the October 2025 report, which described the sites as WCAG 2.0 AA compliant. They were not: the checks below found failures that report missed.

## Results

The audit covered 11 pages. Afterward, at the advisor's request, the two events pages (last updated 2023) and their home-page cards were removed, along with about 38 MB of unused images. The sites now have 9 pages; all still pass.

| Check | Before | After |
|---|---|---|
| axe violations (WCAG 2.2 AA + best practice, both themes) | 82 | 0 |
| HTML validation errors | 11 of 11 pages failing | 0 |
| JavaScript errors on load | 3 pages | 0 |

Layout already reflowed cleanly at 320px wide and still does. Automated tools catch only part of what real users run into, so a clean run is the floor; see "Still needs a human" below.

## What was broken, and the fix

### Accessibility failures

- **Modal close buttons were `<div>`s** (2.1.1 Keyboard, 4.1.2 Name/Role/Value). Keyboard and screen reader users could not reach or identify them. Now `<button aria-label="Close">`.
- **Dialogs had no accessible name** (4.1.2). Every modal now points `aria-labelledby` at its heading.
- **"State" dropdown had no label** (1.3.1, 4.1.2). Screen readers announced an unnamed combo box. Label added.
- **Form section headings rendered yellow on white, 1.55:1** (1.4.3). The theme's `--bs-primary-rgb` was still the Agency template's yellow. Headings now use CSUF navy.
- **Links rendered in #FF7900 on white, 2.5:1** (1.4.3). Link color is now #9a4700 (6.4:1); FAQ open-state text and chevron darkened to match.
- **Focus ring was orange on white, 2.6:1** (1.4.11, 2.4.7). Replaced with an orange ring over a navy inner ring, visible on light and dark backgrounds.
- **Dark mode: the resources quote box was light text on light gray, 1.23:1** (1.4.3). Replaced the inline style with a themed `.callout`. Focused form fields also flipped to white in dark mode; fixed.
- **No input-purpose tokens on the application** (1.3.5 Identify Input Purpose). Name, address, email, and phone fields now carry `autocomplete` values.
- **Required fields were not indicated visibly** (3.3.2). Asterisks plus an instruction line; phone and CWID have example/help text tied to the field with `aria-describedby`.
- **Validation errors were color-only for screen readers.** Fields now get `aria-invalid`, and the submission error is announced (`role="alert"`) with the advisor's email as a fallback.
- **Focus was lost after a successful submission**, which also broke the Escape key. Focus now moves to the confirmation heading inside the dialog.
- **Events slideshow auto-advanced every 5 seconds with no pause** (2.2.2). It now starts paused.
- **Navigation was inconsistent** (3.2.3). Events, privacy, and terms pages used a different menu (with the template leftover label "Fourth navbar example"). Every society page now shares one header.
- **Missing landmarks and skip link** (1.3.1, 2.4.1). Every page has a `<main>`, the footer sits outside it, and a "Skip to main content" link appears on focus.
- **Heading structure:** duplicate `<h1>`s from the site title, skipped levels in modals, `<h5>…</h3>` mismatches, and an empty heading in the PSA FAQ. All corrected.
- **Greek-letter nav links** (Π Α Α / Π Σ Α) now have spoken names ("Pi Alpha Alpha") for screen readers.
- Added `prefers-reduced-motion` handling for card and button hover animations.

### Functional bugs

- **The phone-number check never ran.** Its regex used a conditional group JavaScript doesn't support, so browsers discarded it and accepted anything ("abc" passed). Replaced with a working 10-digit pattern.
- **GPAs with three decimals were rejected** (e.g., 3.456 → "nearest valid values are 3.45 and 3.46"). Step is now 0.001, with a 4.0 maximum.
- **Graduation year silently defaulted to the current year.** It now requires a choice.
- **PSA FAQ:** question 1's button sat outside its heading, and question 6's panel was closed before its content, so the last two questions never collapsed. Rebuilt.
- **PSA home page threw a JavaScript error** (year script ran before the footer existed).
- **Events pages** threw a redeclaration error, showed a stray ">" under the calendar, linked a missing favicon, and said "Events for 2023-2023."
- **PSA calendar embed** included the chapter account's private Contacts calendar, which the public can't see.
- **PAA resources modal** labeled the Pi Alpha Alpha national link "Pi Sigma Alpha."
- **Broken font request** (Cinzel, HTTP 400) and unused font/icon downloads removed.
- Stale `og:url` values pointed at the old dadams-au.github.io paths.
- Dark mode: the PAA logo and the CSUF footer logo nearly vanished on dark backgrounds; the PAA logo now sits on white and the footer swaps to the reversed CSUF logo.

### Housekeeping

- The portal repo had `node_modules/` (5,363 files) and a stale Jekyll `_site/` build committed. Both removed; `.gitignore` added to all three repos.
- The PSA home page's typos corrected ("thier," "actvites," "Financial Assistant," "masters degree").

## Still needs a human

1. **Submit one real test application on each site.** The sites submit to Formspree with AJAX. If reCAPTCHA is switched on in the Formspree dashboard (the README says it is), AJAX submissions fail. The error message now gives students the advisor's email, but confirm the happy path before the semester deadline.
2. **Screen reader pass** with VoiceOver (Mac/iOS) and NVDA (Windows) through the application form.
3. **Content that only the advisor can confirm:**
   - PSA fee card lists "$15 Local Chapter Dues:" with no payment instructions (PAA's card says where to deliver payment).
   - PAA payment location (GH 516 / GH 509) still current?
   - PSA FAQ asks about "cords and charm or pin" but answers "cords and medallion."
   - GPA and unit fields on both applications are optional. If eligibility review depends on them, make them required.

## Re-running the checks

```bash
npm install
node test-accessibility.js   # pa11y, WCAG2AA
```
