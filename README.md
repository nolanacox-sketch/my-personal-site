# My Personal Site

A simple personal website: a Node.js + Express backend that serves a static
HTML/CSS/JS frontend (no frontend framework, no build step). Each section —
Home, About, Background, Resume, Photos, and Contact — is its own page with
its own URL.

## Running locally

```bash
npm install
npm start
```

The site will be available at `http://localhost:3000` (or whatever port is
set via the `PORT` environment variable — most hosts set this automatically).

## Pages

| URL          | File                  | Section     |
| ------------ | --------------------- | ----------- |
| `/`          | `pages/home.html`     | Home / hero |
| `/about`     | `pages/about.html`    | About Me    |
| `/background`| `pages/background.html`| Background |
| `/resume`    | `pages/resume.html`   | Resume      |
| `/photos`    | `pages/photos.html`   | Photos      |
| `/contact`   | `pages/contact.html`  | Contact     |

`server.js` maps each URL to its HTML file — to add a new page, drop a new
file in `pages/` and add one line to the `pages` map in `server.js`.

## Project structure

```
server.js            Express server — routes pages/, serves public/
pages/
  home.html            Landing page: name, tagline, links to every section
  about.html
  background.html
  resume.html
  photos.html
  contact.html
  404.html             Shown for any unknown URL
public/
  css/style.css         All styling, including the color palette
  js/main.js            Scroll-reveal animations + photo lightbox
  images/                Photos shown on the Photos page and in the hero
  resume.pdf             The file the "Download Resume" button links to
```

## Editing content

Each page's text lives directly in its HTML file under `pages/` — open the
file for the section you want to change and edit the text in place.

The nav bar and footer are repeated at the top/bottom of every page file
(there's no shared template, to keep things simple and dependency-free), so
if you change the nav links or footer text, update it in each `pages/*.html`
file. Each page's nav link has `class="active"` added to the link matching
that page — copy that pattern if you add a new page.

Styling (colors, fonts, spacing) lives in `public/css/style.css`. The color
palette is defined once at the top of the file as CSS variables, so you can
retheme the whole site by changing a few hex codes.

## Adding your own photos

The Photos page (`/photos`) and the hero photo on the home page read images
directly from `public/images/`:

- `photo1.jpg` — used as the hero portrait on the home page
- `photo2.jpg`, `photo3.jpg`, `photo4.jpg` — shown in the Photos gallery

To use your own photos, just replace those files with your own images,
**keeping the same filenames**. If you want to add more photos or rename
them, add a new `<button class="photo-item">` block in `pages/photos.html`
pointing at your new filename.

## Adding your resume

Replace `public/resume.pdf` with your actual resume, keeping the filename
`resume.pdf` (or update the link in `pages/resume.html` if you'd rather use
a different filename).

## Deployment

- The server reads the port from `process.env.PORT`, which most hosting
  providers (Render, Railway, Heroku, etc.) set automatically.
- `npm start` runs `node server.js`, which most hosts use as the default
  start command.
