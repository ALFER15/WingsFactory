const fs = require('fs');
const path = require('path');

const writeSection = (type, variant, content) => {
  const dir = path.join('src/sections', type, String(variant));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.astro'), content);
};

writeSection('features', 1, `<section id="sabores" class="sabores-section">
  <div class="header">
    <p class="subtitle">Desde dulce y agridulce hasta que te lloren los ojos. ¿Qué tan valiente eres hoy?</p>
  </div>
  <div class="grid">
    <div class="card">
      <span class="icon">⭐</span>
      <h3>LEMON PEPPER</h3>
      <p>El clásico sabor a limón con pimienta que nunca falla.</p>
    </div>
    <div class="card">
      <span class="icon">🔥</span>
      <h3>BBQ CLÁSICA</h3>
      <p>Ahumada, dulce y ligeramente espesa.</p>
    </div>
    <div class="card">
      <span class="icon">🔥🔥</span>
      <h3>BUFFALO TRADICIONAL</h3>
      <p>El sabor original de las alitas con el toque exacto de picante.</p>
    </div>
    <div class="card">
      <span class="icon">🔥🔥🔥</span>
      <h3>MANGO HABANERO</h3>
      <p>Dulce al principio, fuego al final. Nuestro sabor más popular.</p>
    </div>
    <div class="card">
      <span class="icon">🔥🔥🔥🔥🔥</span>
      <h3>ATOMIC</h3>
      <p>No digas que no te lo advertimos. Pica en serio.</p>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .sabores-section {
    padding: clamp(3rem, 6vw, 5rem);
    background: #0a0a0a;
    color: #fff;
  }

  .header { max-width: 680px; margin: 0 auto 3rem; text-align: center; }

  .subtitle { font-family: sans-serif; font-size: 1.2rem; color: #888; margin: 0; }

  .grid {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; max-width: 1400px; margin: 0 auto;
  }

  .card {
    background: #111; border-radius: 12px; padding: 2.5rem 1.5rem; text-align: center;
    width: 240px; transition: transform 0.2s ease; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
  }
  .card:hover { transform: translateY(-5px); }

  .icon { display: block; font-size: 1.5rem; margin-bottom: 1.5rem; }

  .card h3 { margin: 0 0 1rem; font-size: 1.8rem; color: #fff; font-family: 'Teko', sans-serif; line-height: 1; text-transform: uppercase; letter-spacing: 1px; }

  .card p { margin: 0; font-size: 0.95rem; color: #888; line-height: 1.4; font-family: sans-serif; }
</style>`);

writeSection('identidad', 1, `<section id="experiencia" class="experiencia-section">
  <div class="content-wrapper">
    <div class="text-col">
      <p class="eyebrow">EXPERIENCIA</p>
      <h2>CERVEZA, DEPORTES Y ALITAS</h2>
      <p class="body">No somos un restaurante de comida rápida. Somos el lugar donde te reúnes con tus amigos a ver la UFC, la final de la liga o simplemente a pasarla bien con un tarro de cerveza bien helada y las mejores alitas de la ciudad.</p>
      <a href="#ubicacion" class="btn-ghost">VER SUCURSALES</a>
    </div>
    <div class="image-col">
      <div class="image-grid">
        <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80" alt="Sports bar" class="img-left" />
        <img src="/images/boneless.png" alt="Boneless" class="img-right" onerror="this.src='https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&q=80'" />
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .experiencia-section { padding: clamp(4rem, 8vw, 6rem) 2rem; background: #0a0a0a; color: #fff; border-top: 1px solid #1a1a1a; }

  .content-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; max-width: 1200px; margin: 0 auto; align-items: center; }

  .eyebrow { margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 1rem; font-weight: 700; color: #fff; font-family: 'Oswald', sans-serif; }
  
  h2 { margin: 0.5rem 0 1.5rem; font-size: clamp(3rem, 5vw, 5rem); line-height: 1; color: #fff; font-family: 'Teko', sans-serif; text-transform: uppercase; letter-spacing: 1px; }

  .body { font-family: sans-serif; font-size: 1.1rem; color: #888; margin-bottom: 3rem; line-height: 1.6; max-width: 50ch; }

  .btn-ghost { padding: 0.8rem 2.5rem; border: 2px solid #FFC107; color: #FFC107; text-decoration: none; font-family: 'Oswald', sans-serif; font-weight: bold; letter-spacing: 1px; border-radius: 999px; transition: 0.2s; font-size: 1rem; display: inline-block; }
  .btn-ghost:hover { background: #FFC107; color: #000; }

  .image-grid { display: flex; position: relative; height: 400px; justify-content: flex-end; align-items: flex-start; }
  
  .img-left { width: 60%; height: 80%; object-fit: cover; border-radius: 16px; position: absolute; left: 0; top: 10%; z-index: 1; border: 4px solid #0a0a0a; }
  .img-right { width: 55%; height: 90%; object-fit: cover; border-radius: 16px; position: absolute; right: 0; top: 0; z-index: 2; border: 4px solid #0a0a0a; }

  @media (max-width: 900px) {
    .content-wrapper { grid-template-columns: 1fr; gap: 3rem; }
    .image-grid { height: 300px; justify-content: center; }
  }
</style>`);

writeSection('faq', 1, `<section class="faq-section">
  <div class="header">
    <p class="eyebrow">DUDAS</p>
    <h2>PREGUNTAS FRECUENTES</h2>
  </div>
  <div class="grid">
    <details class="item">
      <summary>¿CUÁLES SON SUS HORARIOS? <span class="plus">+</span></summary>
      <div class="content"><p>Abrimos todos los días desde la 1:30 PM.</p></div>
    </details>
    <details class="item">
      <summary>¿TIENEN OPCIONES QUE NO PIQUEN? <span class="plus">+</span></summary>
      <div class="content"><p>Sí, contamos con sabores como Lemon Pepper, BBQ Clásica y más opciones sin picante.</p></div>
    </details>
    <details class="item">
      <summary>¿EN QUÉ APPS ESTÁN? <span class="plus">+</span></summary>
      <div class="content"><p>Estamos en DiDi Food, Rappi y Uber Eats.</p></div>
    </details>
    <details class="item">
      <summary>¿TRANSMITEN LOS PARTIDOS? <span class="plus">+</span></summary>
      <div class="content"><p>Claro, pasamos todos los eventos deportivos importantes.</p></div>
    </details>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .faq-section { padding: clamp(4rem, 8vw, 6rem) 2rem; background: #0a0a0a; color: #fff; border-top: 1px solid #1a1a1a; }

  .header { max-width: 680px; margin: 0 auto 3rem; text-align: center; }

  .eyebrow { margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 1rem; font-weight: 700; color: #FFC107; font-family: 'Oswald', sans-serif; }

  h2 { margin: 0.5rem 0; font-size: clamp(3.5rem, 6vw, 5rem); line-height: 1; color: #fff; font-family: 'Teko', sans-serif; text-transform: uppercase; letter-spacing: 1px; }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; max-width: 1000px; margin: 0 auto; }

  .item { background: transparent; border: 1px solid #222; border-radius: 8px; overflow: hidden; padding: 1.5rem; transition: border-color 0.2s; }
  .item:hover { border-color: #333; }

  summary { font-size: 1.1rem; font-weight: bold; cursor: pointer; color: #fff; font-family: 'Oswald', sans-serif; letter-spacing: 1px; display: flex; justify-content: space-between; align-items: center; list-style: none; text-transform: uppercase; }
  summary::-webkit-details-marker { display: none; }
  .plus { color: #FFC107; font-size: 1.5rem; font-weight: normal; }
  .item[open] .plus::before { content: '-'; }
  .item[open] .plus { font-size: 0; }
  .item[open] .plus::before { font-size: 1.5rem; }

  .content { padding-top: 1rem; color: #888; font-family: sans-serif; line-height: 1.5; font-size: 0.95rem; }

  @media (max-width: 768px) {
    .grid { grid-template-columns: 1fr; }
  }
</style>`);

writeSection('referencias', 1, `<section id="ubicacion" class="ubicacion-section">
  <div class="content-wrapper">
    <div class="text-col">
      <p class="eyebrow">UBICACIÓN</p>
      <h2>VISÍTANOS</h2>
      <p class="body">Las mejores alitas, cerveza fría y el mejor ambiente para ver tus deportes favoritos.</p>
      
      <div class="info-box">
        <div class="info-item">
          <span class="icon">📍</span>
          <p>Plaza Jardines, Prol. Av. Zaragoza 99, Jardines de la Hacienda, Qro.</p>
        </div>
        <div class="info-item">
          <span class="icon">🕒</span>
          <p>Abierto desde la 1:30 PM todos los días.</p>
        </div>
        <a href="https://maps.google.com" target="_blank" class="btn-ghost">CÓMO LLEGAR</a>
      </div>
    </div>
    
    <div class="map-col">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.340050854299!2d-100.41372568507421!3d20.57398188624239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d3455113d5089f%3A0x6e257218683e3cf7!2sWings%20Factory%20-%20Quer%C3%A9taro!5e0!3m2!1sen!2smx!4v1684346850123!5m2!1sen!2smx" width="100%" height="400" style="border:0; border-radius: 12px; filter: invert(90%) hue-rotate(180deg);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .ubicacion-section { padding: clamp(4rem, 8vw, 6rem) 2rem; background: #0a0a0a; color: #fff; border-top: 1px solid #1a1a1a; }

  .content-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; max-width: 1200px; margin: 0 auto; align-items: center; }

  .eyebrow { margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 1rem; font-weight: 700; color: #FFC107; font-family: 'Oswald', sans-serif; }
  
  h2 { margin: 0.5rem 0 1.5rem; font-size: clamp(3.5rem, 6vw, 5rem); line-height: 1; color: #fff; font-family: 'Teko', sans-serif; text-transform: uppercase; letter-spacing: 1px; }

  .body { font-family: sans-serif; font-size: 1.1rem; color: #888; margin-bottom: 2rem; line-height: 1.6; max-width: 50ch; }

  .info-box { background: #111; border-radius: 12px; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; }

  .info-item { display: flex; align-items: flex-start; gap: 1rem; }
  .info-item .icon { font-size: 1.2rem; margin-top: 0.2rem; }
  .info-item p { margin: 0; font-family: sans-serif; color: #ccc; line-height: 1.4; font-size: 0.95rem; }

  .btn-ghost { padding: 0.8rem 2.5rem; border: 2px solid #FFC107; color: #FFC107; text-decoration: none; font-family: 'Oswald', sans-serif; font-weight: bold; letter-spacing: 1px; border-radius: 999px; transition: 0.2s; font-size: 1rem; margin-top: 0.5rem; }
  .btn-ghost:hover { background: #FFC107; color: #000; }

  .map-col iframe { display: block; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

  @media (max-width: 900px) {
    .content-wrapper { grid-template-columns: 1fr; gap: 3rem; }
  }
</style>`);

writeSection('hero', 5, `<section id="pedir" class="antojo-section">
  <div class="antojo-inner">
    <h2>¿QUÉ ESPERAS? EL ANTOJO NO AVISA</h2>
    <p>Pide ahora mismo por tu app favorita o mándanos un WhatsApp.</p>
    <div class="app-links">
      <a href="#" class="btn-app btn-wa">WHATSAPP</a>
      <a href="#" class="btn-app btn-didi">DIDI FOOD</a>
      <a href="#" class="btn-app btn-rappi">RAPPI</a>
      <a href="#" class="btn-app btn-uber">UBER EATS</a>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .antojo-section {
    padding: clamp(6rem, 10vw, 8rem) 2rem;
    text-align: center;
    background: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('/images/hero-wings.jpg') center/cover no-repeat;
    background-color: #0a0a0a;
    border-top: 1px solid #1a1a1a;
  }

  .antojo-inner { max-width: 900px; margin: 0 auto; }

  h2 { font-family: 'Teko', sans-serif; font-size: clamp(3.5rem, 6vw, 6rem); line-height: 1; margin: 0 0 1rem; color: #fff; text-transform: uppercase; letter-spacing: 1px; }
  p { font-family: sans-serif; font-size: 1.2rem; color: #aaa; margin-bottom: 3rem; }

  .app-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; }

  .btn-app {
    padding: 0.8rem 2.5rem;
    text-decoration: none;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
    border-radius: 999px;
    background: transparent;
    transition: 0.2s ease;
    font-size: 1rem;
    border: 2px solid;
  }

  .btn-wa { border-color: #25D366; color: #25D366; }
  .btn-wa:hover { background: #25D366; color: #000; }

  .btn-didi { border-color: #FF5E00; color: #FF5E00; }
  .btn-didi:hover { background: #FF5E00; color: #fff; }

  .btn-rappi { border-color: #FF441F; color: #FF441F; }
  .btn-rappi:hover { background: #FF441F; color: #fff; }

  .btn-uber { border-color: #fff; color: #fff; }
  .btn-uber:hover { background: #fff; color: #000; }
</style>`);

console.log("Screenshot rebuild complete.");
