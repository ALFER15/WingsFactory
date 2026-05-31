const fs = require('fs');
const path = require('path');

const writeSection = (type, variant, content) => {
  const dir = path.join('src/sections', type, String(variant));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.astro'), content);
};

writeSection('referencias', 1, `<section class="referencias-one">
  <div class="header">
    <p class="eyebrow">TESTIMONIOS</p>
    <h2>LO QUE DICE LA AFICIÓN</h2>
  </div>
  <div class="grid">
    <div class="review-card">
      <div class="stars">★★★★★</div>
      <p>"Las mejores alitas de la ciudad, punto. La salsa Mango Habanero es una locura y la cerveza siempre está helada. ¡El mejor lugar para ver el Super Bowl!"</p>
      <div class="author">
        <strong>Carlos M.</strong>
        <span>Cliente Frecuente</span>
      </div>
    </div>
    <div class="review-card">
      <div class="stars">★★★★★</div>
      <p>"Fui con mis amigos a ver la Champions y el ambiente estuvo increíble. Las boneless son enormes y tienen súper buenas promociones los jueves."</p>
      <div class="author">
        <strong>Ana P.</strong>
        <span>Local Guide</span>
      </div>
    </div>
    <div class="review-card">
      <div class="stars">★★★★★</div>
      <p>"Excelente servicio, las alitas súper crujientes. Pido a domicilio cada fin de semana y siempre llegan calientes y rápido. 100% recomendados."</p>
      <div class="author">
        <strong>Roberto G.</strong>
        <span>Cliente de Delivery</span>
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .referencias-one { padding: clamp(3rem, 6vw, 5rem); background: #111; color: #fff; border-top: 1px solid #333; }

  .header { max-width: 680px; margin: 0 auto 3rem; text-align: center; }
  .eyebrow { margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 1rem; font-weight: 700; color: #FFC107; font-family: 'Oswald', sans-serif; }
  h2 { margin: 0.5rem 0; font-size: clamp(3rem, 5vw, 4.5rem); line-height: 1; color: #fff; font-family: 'Teko', sans-serif; }

  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; max-width: 1200px; margin: 0 auto; }

  .review-card { background: #000; padding: 2.5rem; border: 1px solid #333; transition: border-color 0.2s; }
  .review-card:hover { border-color: #FFC107; }

  .stars { color: #FFC107; font-size: 1.5rem; margin-bottom: 1rem; }
  .review-card p { font-family: sans-serif; font-size: 1.1rem; line-height: 1.6; color: #ccc; margin-bottom: 2rem; font-style: italic; }

  .author { display: flex; flex-direction: column; border-top: 1px solid #333; padding-top: 1rem; }
  .author strong { font-family: 'Oswald', sans-serif; color: #FFC107; font-size: 1.2rem; letter-spacing: 1px; }
  .author span { font-family: sans-serif; color: #666; font-size: 0.9rem; }
</style>`);

writeSection('identidad', 1, `<section class="identidad-one">
  <div class="content-wrapper">
    <div class="image-col">
      <img src="/images/sports-bar.png" alt="Ambiente WingFactory" class="identity-img" onerror="this.src='https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop'" />
    </div>
    <div class="text-col">
      <p class="eyebrow">NUESTRA HISTORIA</p>
      <h2>PASIÓN POR LAS ALITAS Y LOS DEPORTES</h2>
      <p class="lead">WingFactory nació de una idea simple: crear el lugar perfecto para juntarte con tus amigos, comer increíble y disfrutar de los mejores eventos deportivos.</p>
      <p class="body">Nos enorgullecemos de preparar cada orden al momento, utilizando pollo de la más alta calidad y nuestras salsas secretas que han conquistado a toda la ciudad.</p>
      <div class="stats-row">
        <div class="stat">
          <strong>10+</strong>
          <span>AÑOS</span>
        </div>
        <div class="stat">
          <strong>3</strong>
          <span>SUCURSALES</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .identidad-one { padding: clamp(3rem, 6vw, 5rem); background: #0a0a0a; color: #fff; border-top: 1px solid #333; }

  .content-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; max-width: 1200px; margin: 0 auto; align-items: center; }

  .identity-img { width: 100%; height: auto; object-fit: cover; border: 4px solid #FFC107; filter: grayscale(50%) contrast(1.2); }

  .eyebrow { margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 1rem; font-weight: 700; color: #FFC107; font-family: 'Oswald', sans-serif; }
  h2 { margin: 0.5rem 0 1.5rem; font-size: clamp(3rem, 4vw, 4rem); line-height: 1; color: #fff; font-family: 'Teko', sans-serif; }

  .lead { font-family: sans-serif; font-size: 1.2rem; color: #fff; margin-bottom: 1rem; line-height: 1.5; font-weight: bold; }
  .body { font-family: sans-serif; font-size: 1rem; color: #aaa; margin-bottom: 2rem; line-height: 1.6; }

  .stats-row { display: flex; gap: 3rem; padding-top: 1.5rem; border-top: 1px solid #333; }
  .stat { display: flex; flex-direction: column; }
  .stat strong { font-family: 'Teko', sans-serif; font-size: 3rem; color: #FFC107; line-height: 1; }
  .stat span { font-family: sans-serif; font-size: 0.8rem; font-weight: bold; letter-spacing: 2px; color: #aaa; }

  @media (max-width: 900px) {
    .content-wrapper { grid-template-columns: 1fr; gap: 2rem; }
  }
</style>`);

writeSection('hero', 5, `<section class="hero-five">
  <div class="banner-inner">
    <h2>¿QUÉ ESTÁS ESPERANDO?</h2>
    <p>La mesa está lista y la cerveza fría.</p>
    <a href="#pedir" class="btn-solid">VER MENÚ COMPLETO</a>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .hero-five {
    padding: 6rem 2rem;
    text-align: center;
    background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/hero.png') center/cover no-repeat;
    background-color: #111;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
  }

  .banner-inner { max-width: 800px; margin: 0 auto; }

  h2 { font-family: 'Teko', sans-serif; font-size: clamp(3.5rem, 6vw, 5.5rem); line-height: 1; margin: 0 0 1rem; color: #fff; text-transform: uppercase; }
  p { font-family: sans-serif; font-size: 1.25rem; color: #ccc; margin-bottom: 2.5rem; }

  .btn-solid { background: #FFC107; color: #000; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 1.2rem; letter-spacing: 1px; padding: 1rem 3rem; text-decoration: none; display: inline-block; transition: 0.2s; border-radius: 999px; }
  .btn-solid:hover { background: #fff; transform: scale(1.05); }
</style>`);

console.log("Rest of the sections rebuilt.");
