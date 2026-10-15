# Moustafa Elbarbari · Cairo Films

Portfolio site for producer Moustafa Elbarbari and Cairo Films. Built with [Astro](https://astro.build) as a fully static site, deployed free on GitHub Pages by a GitHub Actions workflow.

- **Pages:** Home, About, Films (plus one page per film), Press Kit, Contact
- **Fast:** no client framework, images converted to WebP at build time, self-hosted fonts, trailers load only when someone presses play
- **Bilingual-ready:** English now, Arabic with right-to-left layout switched on with one line

---

## Quick start (on your computer)

You need [Node.js](https://nodejs.org) 22.22 or newer.

```bash
npm install
npm run dev        # preview at http://localhost:4321 (updates as you edit)
npm run build      # produces the final site in dist/
```

You never have to build locally to publish. Pushing to `main` on GitHub rebuilds and publishes the site automatically.

---

## Where everything lives

```
src/
  site.config.ts             name, email, social links, enabled languages
  content/
    films/
      occupy-toronto/
        film.yaml            all text and links for the film
        poster.jpg
        stills/still-01.jpg ...
      what-i-owe-to-my-mother/
        ...
    pages/
      en/home.md             home statement and intro
      en/about.md            bio + "Selected background" list
      en/contact.md          contact note
  assets/
    portrait.jpg             About page portrait
    hero.jpg                 fallback hero / social share image
  i18n/ui.ts                 menu labels and buttons in English and Arabic
```

Everything you will normally edit is a `.yaml`, `.md` or image file. You never need to touch the files in `src/views/`, `src/components/` or `src/layouts/`.

You can edit straight on github.com: open a file, click the pencil icon, change the text, and click **Commit changes**. The site republishes in about a minute.

---

## Updating films

Each film is one folder inside `src/content/films/`. The folder name becomes the web address, so `src/content/films/occupy-toronto/` is published at `/films/occupy-toronto/`.

### Add a new film

1. Copy an existing film folder, for example `occupy-toronto`, and rename the copy, using lowercase letters and hyphens (e.g. `the-river-house`).
2. Replace `poster.jpg` and the images in `stills/` with your own.
3. Open `film.yaml` and update the text. Every field is explained in comments inside the file.
4. Commit. The film appears on the Films page, its own page, and the Press Kit.

### The fields in `film.yaml`

| Field | What it does |
| --- | --- |
| `title` | Film title |
| `order` | Position on the Films page (lower numbers first) |
| `featured` | `true` puts the film on the Home page. Keep it on one film only |
| `hidden` | `true` hides the film everywhere without deleting it |
| `format`, `year`, `runtime`, `countries`, `language` | The facts line under the title. Leave any of them empty to hide it |
| `status` | One of `development`, `pre-production`, `production`, `post-production`, `completed`, `festival`, `released` |
| `statusNote` | Optional short note shown next to the status, e.g. `World premiere March 2027` |
| `director` | Director's name |
| `logline` | One or two sentences |
| `synopsis` | Full synopsis. Separate paragraphs with a blank line |
| `credits` | List of `role` and `name` pairs, shown in that order |
| `laurels` | Festival selections and awards (see below) |
| `trailer` | YouTube or Vimeo link (embedded) or any other link (shown as a button). Empty hides it |
| `poster` | Poster image, path relative to the film folder |
| `stills` | List of stills, each with `src`, optional `caption` and `credit` |
| `pressKitFile` | Optional full press kit PDF (see below) |
| `translations` | Arabic (or other) versions of title, logline, synopsis, format, statusNote |

### Add a festival laurel

Add a block under `laurels:` in the film's `film.yaml`:

```yaml
laurels:
  - festival: Hot Docs Canadian International Documentary Festival
    award: Official Selection
    year: 2026
  - festival: Cairo International Film Festival
    award: Best Short Film
    year: 2026
```

Laurels are drawn by the site from the text, so you do not need laurel artwork, and they appear on the film page, the Home page (for the featured film), the Press Kit and the downloadable synopsis.

### Images

- **Placeholders:** every image in the repo is a placeholder marked "PLACEHOLDER · REPLACE ME". Replace each file with a real one using the same name, or add new files and update the paths in `film.yaml`.
- **Sizes:** stills at 1920×1080 or larger, posters at 2:3 (e.g. 1000×1500 or 2000×3000), portrait at 4:5. JPG is best.
- **Optimisation is automatic.** Upload high quality originals; the site creates small WebP versions for browsing, while the Press Kit download buttons serve your original files.
- To regenerate the placeholders: `npm run placeholders`.

### Full press kit PDF (optional)

Put the PDF in `public/press/`, e.g. `public/press/occupy-toronto-epk.pdf`, then set in `film.yaml`:

```yaml
pressKitFile: /press/occupy-toronto-epk.pdf
```

A "Full press kit" download button then appears on the Press Kit page.

### What the Press Kit page offers automatically

For every film: poster download, each still as a separate download with its dimensions, a plain text synopsis sheet (`/press/<film>.txt`, built from `film.yaml`), credits and laurels.

---

## Updating the bio, home statement and contact details

- **Bio:** `src/content/pages/en/about.md`. The text below the `---` block is the bio (regular Markdown: blank line between paragraphs, `*italics*` for film titles). The `highlights` list at the top feeds the "Selected background" grid.
- **Home statement and intro:** `src/content/pages/en/home.md`. `statement` is the large line under your name.
- **Email, cities and social links:** `src/site.config.ts`. **Replace the placeholder email (`hello@cairofilms.example`) before going live.** Fill in any of `imdb`, `vimeo`, `instagram`, `linkedin` to show them on the Contact page; they are also added to the page's search engine data so Google links your profiles to this site.
- **Portrait:** replace `src/assets/portrait.jpg`.

---

## Launching Arabic (right-to-left)

The site is already built for Arabic: layout uses direction-aware CSS, Arabic fonts are bundled (only downloaded by visitors who read Arabic pages), and all menu and button labels are translated in `src/i18n/ui.ts`.

1. In `src/site.config.ts` change
   ```ts
   enabledLocales: ['en'],
   ```
   to
   ```ts
   enabledLocales: ['en', 'ar'],
   ```
   Arabic pages appear under `/ar/` with right-to-left layout, and an "العربية" link appears in the menu.
2. Add Arabic page copy by copying `src/content/pages/en/` to `src/content/pages/ar/` and translating each file. Any page you have not translated yet falls back to English.
3. Add Arabic film text inside each `film.yaml`:
   ```yaml
   translations:
     ar:
       title: احتلوا تورونتو
       format: فيلم وثائقي قصير
       logline: ...
       synopsis: |
         ...
   ```
   Fields you leave out fall back to English. The Arabic titles currently in the files are literal working translations, so please review them.
4. Review the Arabic interface labels in `src/i18n/ui.ts`.

---

## Publishing on GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main` (and can be run by hand from the **Actions** tab).

One-time setup:

1. Merge this work into the `main` branch.
2. On GitHub go to **Settings → Pages** and under **Build and deployment → Source** choose **GitHub Actions**.
3. Push to `main` (or open **Actions → Deploy to GitHub Pages → Run workflow**).

The site is then live at `https://<your-username>.github.io/cairo-films-site/`. The workflow reads the address and sub-path from your Pages settings, so links work both there and on a custom domain without any code change.

GitHub Pages is free for public repositories. For a private repository it requires a paid GitHub plan.

---

## Connecting a custom domain

Example: `cairofilms.com` (use whatever domain you own).

### 1. Tell GitHub

**Settings → Pages → Custom domain**: enter `cairofilms.com` (or `www.cairofilms.com`) and click **Save**. GitHub will start checking your DNS.

### 2. Set DNS records at your domain registrar

For the bare domain (`cairofilms.com`), add four **A** records with host `@`:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Optionally also four **AAAA** records (IPv6) with host `@`:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

For `www`, add a **CNAME** record with host `www` pointing to `<your-username>.github.io`.

Setting up both lets GitHub redirect one to the other automatically.

### 3. Turn on HTTPS

DNS can take from a few minutes up to 24 hours. Once GitHub shows the domain as verified, tick **Enforce HTTPS** in **Settings → Pages**.

### 4. Rebuild

Run the workflow once more (**Actions → Deploy to GitHub Pages → Run workflow**) so links, the sitemap and social share previews use the new domain. No code changes are needed.

**Recommended:** verify the domain for your account (**your profile Settings → Pages → Add a domain**) so nobody else can claim it on GitHub.

---

## Before going live: checklist

- [ ] Replace the placeholder email in `src/site.config.ts`
- [ ] Replace all placeholder images (portrait, posters, stills, `src/assets/hero.jpg`)
- [ ] Write the full synopses in each `film.yaml`
- [ ] Fill in `year`, `runtime` and countries for each film
- [ ] Add trailer links and laurels when available
- [ ] Add your IMDb / Vimeo / LinkedIn / Instagram links, using the spelling "Moustafa Elbarbari" on each profile
