# Crisis of Care — website

A multi-page marketing site for Crisis of Care (Pty) Ltd.

## Project structure

```
crisis-of-care/
├── index.html          # Home — hero, who we work with, approach, confidentiality (last section)
├── services.html        # Services — the seven core offerings
├── about.html            # About — story, team, disciplines
├── contact.html           # Contact — form + direct contact links + volunteer callout
├── volunteer.html          # Volunteer recruitment form (linked from Contact and the footer)
├── pricing.html            # Pricing — rates, session structure (last page in the nav)
├── assets/
│   ├── logo.png                 # COC logo, extracted from brand materials
│   └── documents/
│       ├── CoC_Volunteer_Recruitment_Form.docx   # offline copy of the volunteer form
│       ├── COC_POPIA_PAIA_Manual.pdf
│       └── COC_Website_Privacy_Policy.pdf
├── css/
│   └── styles.css      # all styling, shared across every page
├── js/
│   └── main.js          # hero line animation + contact form handling, shared across every page
└── README.md
```

Each page is a separate HTML file with its own copy of the header/nav
and footer (there's no templating engine — it's plain static HTML), so
editing the nav or footer means updating it in all five files. The
`js/main.js` script is safe to include on every page: it checks whether
the hero animation elements or the contact form actually exist before
doing anything, so it's a no-op on pages that don't have them.

## Site map / navigation order

Home → Who we work with (anchor on Home) → Services → About → Contact → **Pricing (last)**

Pricing is deliberately the last item in both the nav and the footer
links, and its own final page in the site — the idea being people read
about the practice and the services first, and arrive at pricing once
they understand what they'd be paying for.

## Running it in VS Code

1. Open the `crisis-of-care` folder in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension (by Ritwick Dey), if you don't have it.
3. Right-click `index.html` in the file explorer → **Open with Live Server**.
   This opens the site in your browser at `http://127.0.0.1:5500` and
   auto-reloads whenever you save a file. Navigate between pages using
   the site's own nav links, same as a visitor would.

No build step, no `npm install` — it's plain HTML/CSS/JS.

**Note:** the pages load fonts (Fraunces, Public Sans, IBM Plex Mono)
from Google Fonts, so you'll need an internet connection for the type to
render as designed.

## Where things live

- **Colours, type, spacing** → `css/styles.css`, defined as CSS custom
  properties at the top of the file (`--ink`, `--sage`, `--sage-deep`,
  etc.) so you can retheme the whole site in one place.
- **Copy and page structure** → each page's own `.html` file.
- **Hero animation + contact form** → `js/main.js` (shared across pages).

## Brand colours & icons

Colours now match the official brand kit, **with brown removed** per
the latest direction — the palette is green, black and white only:
- **COC Green (primary)**: `#2E7D32` → `--sage`
- **Deep green**: `#20591F` → `--sage-deep`
- **Light green**: `#4FA255` → `--sage-light`
- **Dark Grey / Black (text/neutral)**: `#1F1F1F` → `--ink`

Everywhere brown used to appear — the primary buttons, the hero's
"crisis" line, one of the "Who we work with" cards, the service icon
accents, the footer logo accent — now uses black or a green shade
instead. The hero's signature line animation now reads as black
(crisis) settling into green (calm), which fits the two-colour
palette even better than the original brown did.

The seven service icons on `services.html` (Counselling, Crisis
Intervention, Research, Advocacy, Education, Training, Community
Engagement) are custom SVGs in the brand kit's style (rounded, ~2.5px
strokes), recoloured to green + black. There wasn't a vector/SVG export
of the original icon pack available, only a PNG mockup, so these are
close recreations rather than the literal exported assets — swap in
the real SVG/AI exports in `services.html` if you get hold of them.

## Legal documents

The POPIA/PAIA Manual and Website Privacy Policy are included as PDFs
in `assets/documents/` and linked from two places: the confidentiality
section at the end of the Home page, and the footer (present on every
page). Both open with `target="_blank"`, in a new tab.

## Contact form (Netlify Forms)

The contact form on `contact.html` uses **Netlify Forms** — Netlify
detects it automatically at deploy time because the page contains a
`<form data-netlify="true">` with a matching hidden `form-name` field.
This only works once the site is actually deployed on Netlify (it
won't send anything from Live Server or any other host).

To start receiving submissions by email:

1. Deploy the site to Netlify (drag-and-drop the whole folder, or via
   GitHub — see the deployment walkthrough you were given separately).
2. In the Netlify dashboard: **Site settings → Forms → Notifications
   → Add notification → Email notification**, and enter the address
   that should receive enquiries.
3. Submissions also show up under **Site → Forms** in the dashboard
   itself, so you don't strictly need email notifications turned on.
4. Test it by submitting the live form once yourself.

The hidden `bot-field` input is spam protection (Netlify's built-in
honeypot) — leave it as-is.

## Known placeholders

- **Group session pricing** wasn't provided, so the group card on
  `pricing.html` routes to "Get a quote" rather than a fixed rate — add
  a number directly in that file once you have one.
- The **Facebook page URL** (`https://www.facebook.com/CrisisofCare`)
  is a best-guess slug built from the page name you gave me — double
  check it resolves to the right page. It appears in `about.html`,
  `contact.html`, and the footer of every page — search-and-replace
  across all five files if it needs to change.
- The **Instagram link** (`https://www.instagram.com/crisisofcare_`)
  uses the exact handle you gave me, so that one should be accurate.
- The **WhatsApp helpline** links to `https://wa.me/27694228066`
  (0694228066 in international format) in several places across the
  site.
- `assets/logo.png` was extracted from the company's ToR document at
  reasonable resolution — swap in a higher-res or vector (SVG) version
  if/when one is available, for crisper rendering at large sizes.

## Volunteer recruitment form

`volunteer.html` is the web version of the Volunteer Recruitment Drive
application form (Sections A–J), reached from a callout at the bottom of
`contact.html` and from the footer on every page. It is a second Netlify
form named `volunteer`, so submissions appear under **Site → Forms →
volunteer** in Netlify (set up email notifications for it the same way as
the contact form). Notes:

- Required questions follow the asterisks in the Word form. Required
  checkbox groups (e.g. "Profession / specialisation") need at least one
  tick, checked in `js/main.js`.
- Section G (supervisors) only expands when "I would like to volunteer as
  a supervisor" is answered Yes.
- The original Word form is included for download for people who prefer
  to email it to crisisofcare@gmail.com.
- The Word form's Section H note was cut off mid-word ("...if you are
  shortlisted. Pl"), so the website shows the complete sentence before it.
  Edit it in `volunteer.html` if the original had more to say.
- The form collects personal and professional details. It deliberately
  asks people not to attach ID documents, so there is no file upload.

## WhatsApp button

A floating WhatsApp button sits at the bottom-right of every page and
opens `https://wa.me/27694228066`. It is added just before the closing
`</body>` on each page; styling is under "FLOATING WHATSAPP BUTTON" in
`css/styles.css`.
