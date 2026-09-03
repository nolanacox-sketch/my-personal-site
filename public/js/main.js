// Belt-and-suspenders: some mobile browsers jump to a restored scroll
// position or a stale #hash after fonts/images finish loading and reflow
// the page, sometimes *after* the load event fires. Keep pinning the page
// to the top for a short window after load, until the user actually
// interacts (so we never fight a real scroll).
(function keepAtTopOnLoad() {
  let userInteracted = false;
  const markInteracted = () => {
    userInteracted = true;
  };
  ['touchstart', 'wheel', 'keydown', 'mousedown'].forEach((evt) => {
    window.addEventListener(evt, markInteracted, { once: true, passive: true });
  });

  let frames = 0;
  function tick() {
    if (userInteracted || frames > 90) return;
    if (window.scrollY !== 0) window.scrollTo(0, 0);
    frames++;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Fade-in-up sections as they scroll into view
const revealTargets = document.querySelectorAll('.fade-in-up');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

// Lightbox for photo gallery (only present on the Photos page)
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const photoButtons = document.querySelectorAll('.photo-item');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  photoButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const img = button.querySelector('img');
      openLightbox(button.dataset.full, img.alt);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}
