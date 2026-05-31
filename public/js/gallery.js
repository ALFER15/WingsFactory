document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const dots = document.querySelectorAll('#carousel-dots .dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!track || !prevBtn || !nextBtn) return;

  const totalSlides = 5;
  let current = 0;
  let autoplayTimer;

  function goTo(index) {
    current = ((index % totalSlides) + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  prevBtn.addEventListener('click', () => {
    goTo(current - 1);
    startAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    goTo(current + 1);
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      goTo(index);
      startAutoplay();
    });
  });

  // Pausar autoplay al hacer hover
  const carousel = document.getElementById('img-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Soporte para swipe en móvil
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoplay();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
      startAutoplay();
    }, { passive: true });

    // Soporte para teclado
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { goTo(current - 1); startAutoplay(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); startAutoplay(); }
    });
  }

  // Iniciar autoplay
  startAutoplay();
});
