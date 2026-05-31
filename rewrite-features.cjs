const fs = require('fs');
const path = require('path');

const writeSection = (type, content) => {
  const dir = path.join('src/sections', type, '1');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.astro'), content);
};

writeSection('features', `<section class="features-one">
  <div class="header">
    <p class="eyebrow">LA EXPERIENCIA WINGFACTORY</p>
    <h2>¿POR QUÉ SOMOS LOS MEJORES?</h2>
    <p class="intro">
      No solo es comida, es toda una experiencia de sabor, deportes y buen ambiente.
    </p>
  </div>
  <div class="grid">
    <div class="card">
      <span class="icon">🔥</span>
      <h3>SALSAS ÚNICAS</h3>
      <p>Más de 30 recetas originales, desde dulces hasta extremadamente picantes.</p>
    </div>
    <div class="card">
      <span class="icon">🍺</span>
      <h3>CERVEZA HELADA</h3>
      <p>Tarros escarchados y la mejor selección para acompañar tus alitas.</p>
    </div>
    <div class="card">
      <span class="icon">📺</span>
      <h3>PANTALLAS GIGANTES</h3>
      <p>El mejor lugar para ver a tu equipo favorito jugar la final.</p>
    </div>
    <div class="card">
      <span class="icon">🍗</span>
      <h3>CALIDAD PREMIUM</h3>
      <p>Pollo fresco y crujiente todos los días, nunca congelado.</p>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .features-one {
    padding: clamp(3rem, 6vw, 5rem);
    background: #111;
    color: #fff;
    border-top: 1px solid #333;
  }

  .header { max-width: 680px; margin-bottom: 2.5rem; text-align: center; margin-inline: auto; }

  .eyebrow {
    margin: 0; text-transform: uppercase; letter-spacing: 2px;
    font-size: 1rem; font-weight: 700; color: #FFC107; font-family: 'Oswald', sans-serif;
  }

  h2 {
    margin: 0.5rem 0; font-size: clamp(3rem, 5vw, 4.5rem); line-height: 1; color: #fff;
    font-family: 'Teko', sans-serif;
  }

  .intro { margin: 0 auto; color: #ccc; max-width: 60ch; font-family: sans-serif; }

  .grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1200px; margin: 0 auto;
  }

  .card {
    background: #000; border: 1px solid #333; border-radius: 0; padding: 2rem;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .card:hover { transform: translateY(-5px); border-color: #FFC107; }

  .icon { display: block; font-size: 2.5rem; margin-bottom: 1rem; }

  .card h3 { margin: 0 0 0.5rem; font-size: 2rem; color: #FFC107; font-family: 'Teko', sans-serif; line-height: 1; }

  .card p { margin: 0; font-size: 1rem; color: #aaa; line-height: 1.5; font-family: sans-serif; }
</style>`);

writeSection('faq', `<section class="faq-one">
  <div class="header">
    <p class="eyebrow">PREGUNTAS</p>
    <h2>LO QUE TODOS QUIEREN SABER</h2>
  </div>
  <div class="grid">
    <details class="item" open>
      <summary>¿Tienen servicio a domicilio?</summary>
      <div class="content"><p>Sí, llegamos a toda la zona. Puedes pedir a través de nuestra web o apps de delivery.</p></div>
    </details>
    <details class="item">
      <summary>¿Pasan todos los partidos importantes?</summary>
      <div class="content"><p>¡Por supuesto! Tenemos el paquete deportivo completo para que no te pierdas nada.</p></div>
    </details>
    <details class="item">
      <summary>¿Hay opciones vegetarianas?</summary>
      <div class="content"><p>Sí, tenemos boneless de coliflor y ensaladas deliciosas.</p></div>
    </details>
    <details class="item">
      <summary>¿Tienen promociones entre semana?</summary>
      <div class="content"><p>Todos los martes tenemos alitas al 2x1 y jueves de tarros. ¡Revisa nuestras redes para más promos!</p></div>
    </details>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');

  .faq-one { padding: clamp(3rem, 6vw, 5rem); background: #0a0a0a; color: #fff; border-top: 1px solid #333; }

  .header { max-width: 680px; margin: 0 auto 3rem; text-align: center; }

  .eyebrow { margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 1rem; font-weight: 700; color: #FFC107; font-family: 'Oswald', sans-serif; }

  h2 { margin: 0.5rem 0; font-size: clamp(3rem, 5vw, 4.5rem); line-height: 1; color: #fff; font-family: 'Teko', sans-serif; }

  .grid { display: grid; gap: 1rem; max-width: 800px; margin: 0 auto; }

  .item { background: #000; border: 1px solid #333; border-radius: 0; overflow: hidden; }
  .item[open] { border-color: #FFC107; }

  summary { padding: 1.5rem; font-size: 1.2rem; font-weight: bold; cursor: pointer; color: #fff; font-family: 'Oswald', sans-serif; letter-spacing: 1px; display: flex; justify-content: space-between; align-items: center; list-style: none; }
  summary::-webkit-details-marker { display: none; }
  summary::after { content: '+'; color: #FFC107; font-size: 1.5rem; }
  .item[open] summary::after { content: '-'; }

  .content { padding: 0 1.5rem 1.5rem; color: #aaa; font-family: sans-serif; line-height: 1.6; }
</style>`);

console.log("Features & FAQ rewrite complete.");
