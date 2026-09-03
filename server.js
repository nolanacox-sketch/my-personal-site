const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve assets — CSS, JS, photos, resume.pdf — from /public
app.use(express.static(path.join(__dirname, 'public')));

// Each page of the site is its own HTML file in /pages.
// Add a new page by dropping a file in /pages and adding a line here.
const pages = {
  '/': 'home.html',
  '/about': 'about.html',
  '/background': 'background.html',
  '/resume': 'resume.html',
  '/photos': 'photos.html',
  '/contact': 'contact.html',
};

for (const [route, file] of Object.entries(pages)) {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', file));
  });
}

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
