const fs = require('fs');
const path = require('path');

const writeSection = (type, content) => {
  const dir = path.join('src/sections', type, '1');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.astro'), content);
};

writeSection('header', `<header class="header-one" id="main-header">
  <div class="logo">
    <img src="/images/1780217112015.png" alt="Wings Factory" />
  </div>
  <div class="right-cluster">
    <nav>
      <a href="#sabores">SABORES</a>
      <a href="#experiencia">EXPERIENCIA</a>
      <a href="#ubicacion">UBICACIÓN</a>
    </nav>
    <a href="#pedir" class="btn-cta">PIDE AHORA</a>
  </div>
</header>
<script is:inline>
  window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (header) {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
  });
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .header-one {
    position: sticky; top: 0; z-index: 100; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center;
    background: #000; border-bottom: 4px solid #FFC107;
    background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 8px);
    height: 80px;
  }
  .logo img { height: 50px; filter: brightness(0) invert(1); }
  .right-cluster { display: flex; align-items: stretch; height: 100%; gap: 2rem; }
  nav { display: flex; gap: 2rem; align-items: center; }
  nav a { color: #fff; text-decoration: none; font-weight: 700; font-style: italic; font-family: 'Oswald', sans-serif; font-size: 1.1rem; letter-spacing: 1px; }
  nav a:hover { color: #FFC107; }
  .btn-cta {
    background: #FFC107; color: #000; font-family: 'Teko', sans-serif; font-weight: 700; font-size: 1.5rem; letter-spacing: 1px; padding: 0 2rem; text-decoration: none; display: flex; align-items: center; justify-content: center;
    clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%); transition: transform 0.2s;
  }
  .btn-cta:hover { transform: scale(1.05); }
</style>`);

writeSection('hero', `<section class="hero-one">
  <div class="hero-inner">
    <p class="kicker">SABOR Y ACTITUD</p>
    <h1>LAS MEJORES<br/>ALITAS EN TU CASA</h1>
    <p class="lead">
      Más de 30 salsas diferentes. Pide a domicilio y recibe tus alitas calientes y crujientes.
    </p>

    <div class="actions">
      <a href="#pedir" class="btn btn-ghost">PEDIR A DOMICILIO</a>
      <a href="#promociones" class="btn btn-ghost">VER PROMOCIONES</a>
    </div>

    <ul class="metrics">
      <li><strong class="number">+30</strong><span class="label">SALSAS</span></li>
      <li><strong class="number">30 MIN</strong><span class="label">ENTREGA</span></li>
      <li><strong class="number">100%</strong><span class="label">CRUJIENTES</span></li>
    </ul>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .hero-one {
    position: relative;
    overflow: hidden;
    padding: clamp(3rem, 7vw, 6rem) 4rem;
    color: #fff;
    background: linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%), url('/images/hero-wings.jpg') center/cover no-repeat;
    min-height: 80vh;
    display: flex;
    align-items: center;
  }

  .hero-inner { max-width: 800px; position: relative; z-index: 2; }

  .kicker { text-transform: uppercase; letter-spacing: 2px; font-weight: bold; font-size: 1rem; color: #FFC107; margin-bottom: 0.5rem; font-family: 'Oswald', sans-serif; }

  h1 { font-family: 'Teko', sans-serif; font-size: clamp(4rem, 8vw, 7rem); font-weight: 700; line-height: 0.9; margin: 0; text-transform: uppercase; }

  .lead { margin-top: 1.5rem; font-size: clamp(1rem, 2vw, 1.25rem); color: #ccc; max-width: 60ch; font-family: sans-serif; }

  .actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }

  .btn { text-decoration: none; padding: 0.8rem 2rem; border-radius: 999px; font-weight: bold; transition: background 0.2s ease, color 0.2s ease; font-family: 'Oswald', sans-serif; letter-spacing: 1px; font-size: 1.1rem; }
  .btn-ghost { border: 2px solid #FFC107; color: #FFC107; }
  .btn-ghost:hover { background: #FFC107; color: #000; }

  .metrics { margin: 4rem 0 0; padding: 0; list-style: none; display: flex; gap: 3rem; }
  .metrics li { display: flex; flex-direction: column; }
  .metrics .number { font-family: 'Teko', sans-serif; font-size: 3.5rem; font-weight: 700; color: #FFC107; line-height: 1; }
  .metrics .label { color: #fff; font-size: 0.85rem; font-weight: bold; letter-spacing: 2px; font-family: sans-serif; }
</style>`);

writeSection('footer', `<footer class="footer-one">
  <div class="footer-inner">
    <img src="/images/1780217112015.png" alt="WingFactory Logo" class="footer-logo" />
    <div class="social-links">
      <a href="https://www.facebook.com/WFQUERETARO/" class="btn-ghost" target="_blank">FACEBOOK</a>
      <a href="https://www.instagram.com/wfqueretaro/" class="btn-ghost" target="_blank">INSTAGRAM</a>
    </div>
  </div>
</footer>
<style>
  .footer-one { background: #0a0a0a; padding: 4rem 2rem; border-top: 4px solid #FFC107; text-align: center; }
  .footer-logo { height: 100px; filter: brightness(0) invert(1); margin-bottom: 2rem; }
  .social-links { display: flex; justify-content: center; gap: 1rem; }
  .btn-ghost { padding: 0.8rem 2rem; border: 2px solid #FFC107; color: #FFC107; text-decoration: none; font-family: 'Oswald', sans-serif; font-weight: bold; letter-spacing: 1px; border-radius: 999px; transition: 0.2s; }
  .btn-ghost:hover { background: #FFC107; color: #000; }
</style>`);

writeSection('cta', `<section class="cta-one">
  <div class="cta-inner">
    <h2>¿LISTO PARA PROBAR LAS MEJORES ALITAS?</h2>
    <a href="#pedir" class="btn-cta-large">PIDE AHORA</a>
  </div>
</section>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  .cta-one { background: #FFC107; padding: 4rem 2rem; text-align: center; color: #000; background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 8px); }
  h2 { font-family: 'Teko', sans-serif; font-size: 4rem; font-weight: 700; margin: 0 0 2rem; line-height: 1; }
  .btn-cta-large { background: #000; color: #FFC107; font-family: 'Teko', sans-serif; font-weight: 700; font-size: 2rem; padding: 0.5rem 3rem; text-decoration: none; display: inline-block; clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%); transition: transform 0.2s; }
  .btn-cta-large:hover { transform: scale(1.05); }
</style>`);

console.log("Rewrite complete.");
