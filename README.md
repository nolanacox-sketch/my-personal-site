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
```

## Editing content

Everything you'll want to personalize lives in `public/index.html`:

- Your name, tagline, about text, and background timeline are plain text —
  just edit them directly.
- Contact email and social links are near the bottom of the file.

Styling (colors, fonts, spacing) lives in `public/css/style.css`. The color
palette is defined once at the top of the file as CSS variables, so you can
retheme the whole site by changing a few hex codes.

## Adding your own photos

The Photos section reads three images directly from `public/photos/`:

- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`

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
