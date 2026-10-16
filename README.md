# My Personal Site

A simple personal website: a Node.js + Express backend that serves a static
HTML/CSS/JS frontend (no frontend framework, no build step). Single page with
a hero, about, background, resume, photo gallery, and contact sections.

## Running locally

```bash
npm install
npm start
```

The site will be available at `http://localhost:3000` (or whatever port is
set via the `PORT` environment variable — most hosts set this automatically).

## Project structure

```
server.js            Express server — serves everything in /public
public/
  index.html          The whole site (all sections live in one page)
  css/style.css        All styling, including the color palette
  js/main.js           Scroll animations + photo lightbox
  photos/              Photos shown in the Photos section
  resume.pdf           The file the "Download Resume" button links to
  board/               Bulletin board version of the site (served at /board/)
    index.html          Board homepage — clickable hotspots over the image
    bulletin-board.jpg   The bulletin board image
    about.html, background.html, resume.html, photos.html, contact.html
    board.css / board.js Board styling, zoom-in click effect, photo lightbox
```

## Bulletin board version

`/board/` is a second, interactive version of the site. The bulletin board
image is the homepage, and each item pinned to it links to a section page:

| Board item | Goes to |
| --- | --- |
| "Who Is Nolan?" note, Texas sticker, newborn photo | About |
| Resume note | Resume |
| "Background in Sales" note, OSU logo | Background (OSU → Education) |
| Mountain photo, wedding photo, bluebonnet | Photos |
| Dog "Contact Nolan" card | Contact |
| Books in the corner | Classic site |

Each hotspot is an `<a class="hotspot">` in `board/index.html`, positioned
with `left/top/width/height` percentages of the image. If you swap the
image, adjust those numbers to match. Section text is duplicated from the
classic `index.html`, so update both when your content changes.

## Editing content

Everything you'll want to personalize lives in `public/index.html`:

- Your name, tagline, about text, and background timeline are plain text —
  just edit them directly.
- Contact email and social links are near the bottom of the file.

Styling (colors, fonts, spacing) lives in `public/css/style.css`. The color
palette is defined once at the top of the file as CSS variables, so you can
retheme the whole site by changing a few hex codes.

## Adding your own photos

The Photos section reads images directly from `public/photos/`:

- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`

To use your own photos, just replace those files with your own images,
**keeping the same filenames**. If you want to add more photos or rename
them, add a new `<button class="photo-item">` block in the Photos section of
`public/index.html` pointing at your new filename.

## Adding your resume

Replace `public/resume.pdf` with your actual resume, keeping the filename
`resume.pdf` (or update the link in the Resume section of `index.html` if
you'd rather use a different filename).

## Deployment

- The server reads the port from `process.env.PORT`, which most hosting
  providers (Render, Railway, Heroku, etc.) set automatically.
- `npm start` runs `node server.js`, which most hosts use as the default
  start command.
