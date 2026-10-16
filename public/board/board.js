// Bulletin board: zoom into the clicked item before navigating to its page.
const board = document.getElementById('board');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (board && !reduceMotion) {
  board.querySelectorAll('.hotspot').forEach((spot) => {
    spot.addEventListener('click', (event) => {
      // Let modified clicks (new tab, etc.) behave normally.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();

      const originX = parseFloat(spot.style.left) + parseFloat(spot.style.width) / 2;
      const originY = parseFloat(spot.style.top) + parseFloat(spot.style.height) / 2;
      board.style.transformOrigin = `${originX}% ${originY}%`;
      board.style.transform = 'scale(2.6)';
      board.classList.add('is-zooming');

      setTimeout(() => {
        window.location.href = spot.href;
      }, 450);
    });
  });

  // Reset the zoom if the user comes back with the browser's back button.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      board.style.transform = '';
      board.classList.remove('is-zooming');
    }
  });
}

// Lightbox (photos page)
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.photo-item').forEach((button) => {
    button.addEventListener('click', () => {
      lightboxImg.src = button.dataset.full;
      lightboxImg.alt = button.querySelector('img').alt;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
