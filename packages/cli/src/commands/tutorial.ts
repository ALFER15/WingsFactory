import boxen from 'boxen';
import chalk from 'chalk';

type TutorialStep = {
  title: string;
  command: string;
  purpose: string;
  usage: string[];
  notes: string[];
};

const INTRO_FRAMES = [
  String.raw`
      ✨       *
   .-"""-.
  / .===. \
  \/ 0 0 \/
  (   ^   )
   | '-' |
  /|_____\
 /_/     \_\
  LANDCELOT`,
  String.raw`
    *      ✨
   .-"""-.
  / .===. \
  \/ ◕ ◕ \/
  (   ^   )
   | '_' |
  /|_____\
 /_/     \_\
  LANDCELOT`,
];

const STEPS: TutorialStep[] = [
  {
    title: 'Inicializa Landmaker',
    command: 'landmaker init',
    purpose: 'Crea o repara `landmaker.config.json`, la fuente de verdad del proyecto.',
    usage: ['npm run landmaker -- init'],
    notes: [
      'Úsalo cuando clonas un proyecto o si el config se dañó.',
      'No rompe contenido existente: normaliza el estado para que sea usable.',
    ],
  },
  {
    title: 'Visualiza el mapa actual',
    command: 'landmaker map',
    purpose: 'Muestra el orden real de secciones por página (índices base 1).',
    usage: ['npm run landmaker -- map'],
    notes: [
      'Ideal antes de editar para evitar cambios a ciegas.',
      'El índice mostrado aquí es el que usa `remove`.',
    ],
  },
  {
    title: 'Agrega secciones',
    command: 'landmaker add <type> <variant> [theme]',
    purpose: 'Añade una sección al final de `home` y regenera artefactos automáticamente.',
    usage: ['npm run landmaker -- add hero 2', 'npm run landmaker -- add contact 1 dark'],
    notes: [
      'No edita archivos de render manualmente: muta config + rebuild.',
      'Si falta una plantilla en `src/sections`, verás advertencias.',
    ],
  },
  {
    title: 'Elimina secciones por índice',
    command: 'landmaker remove <index>',
    purpose: 'Quita una sección según el índice que viste en `map`.',
    usage: ['npm run landmaker -- remove 2'],
    notes: [
      'Índice inválido o fuera de rango no rompe el proyecto: informa error.',
      'Tras eliminar, vuelve a regenerar wrappers y registry.',
    ],
  },
  {
    title: 'Diagnostica inconsistencias',
    command: 'landmaker doctor',
    purpose: 'Audita config, plantillas, wrappers y registry sin modificar nada.',
    usage: ['npm run landmaker -- doctor'],
    notes: [
      'Reporte visual por estado: ✔ correcto, ⚠ advertencia, ✖ error.',
      'Es el comando recomendado antes de producción.',
    ],
  },
  {
    title: 'Optimiza para producción',
    command: 'landmaker deploy',
    purpose: 'Elimina plantillas no usadas en `src/sections` y ejecuta rebuild final.',
    usage: ['npm run landmaker -- deploy'],
    notes: [
      'Pide confirmación antes de borrar.',
      'Conserva solo los type/variant activos definidos en config.',
    ],
  },
  {
    title: 'Abre este tutorial cuando quieras',
    command: 'landmaker tutorial',
    purpose: 'Lanza esta guía visual animada de Landcelot.',
    usage: ['npm run landmaker -- tutorial'],
    notes: [
      'Úsalo para onboarding rápido de teammates.',
      'Ideal después de actualizar comandos del CLI.',
    ],
  },
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearScreen(): void {
  if (process.stdout.isTTY) {
    process.stdout.write('\x1Bc');
  }
}

function printBanner(title: string): void {
  const lines = [
    chalk.bold.magenta('✨ LANDMAKER TUTORIAL WIZARD ✨'),
    chalk.bold.cyan('Tu copiloto: Landcelot 🤖'),
    '',
    chalk.white(title),
  ];

  console.log(
    boxen(lines.join('\n'), {
      padding: 1,
      borderStyle: 'double',
      borderColor: 'magenta',
    })
  );
}

async function animateIntroRobot(): Promise<void> {
  for (let i = 0; i < 6; i++) {
    clearScreen();
    printBanner('Preparando motores de guía...');
    const frame = INTRO_FRAMES[i % INTRO_FRAMES.length];
    console.log(chalk.yellow(frame));
    console.log(chalk.dim('\nLandcelot está sincronizando comandos...'));
    await sleep(180);
  }
}

async function typeLine(text: string, color: (value: string) => string = chalk.white): Promise<void> {
  if (!process.stdout.isTTY) {
    console.log(color(text));
    return;
  }

  let buffer = '';
  for (const ch of text) {
    buffer += ch;
    process.stdout.write(`\r${color(buffer)}`);
    await sleep(12);
  }
  process.stdout.write('\n');
}

async function renderStep(step: TutorialStep, index: number, total: number): Promise<void> {
  const label = `${index + 1}/${total}`;

  const content = [
    `${chalk.bold.cyan(`Paso ${label}`)} ${chalk.bold(step.title)} ${chalk.yellow('✨')}`,
    '',
    `${chalk.bold('Comando:')} ${chalk.green(step.command)}`,
    `${chalk.bold('¿Qué hace?')} ${step.purpose}`,
    '',
    chalk.bold('Uso:'),
    ...step.usage.map((u) => `  ${chalk.cyan(u)}`),
    '',
    chalk.bold('Tips de Landcelot:'),
    ...step.notes.map((n) => `  ${chalk.magenta('•')} ${n}`),
  ].join('\n');

  console.log(
    boxen(content, {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
    })
  );

  await sleep(260);
}

export async function runTutorialCommand(): Promise<void> {
  try {
    await animateIntroRobot();
    clearScreen();

    printBanner('¡Hola! Soy Landcelot, tu robot guía del CLI. Vamos paso a paso 🚀');
    await typeLine('Te enseñaré qué hace cada comando y cómo usarlo correctamente.', chalk.green);
    await sleep(300);

    for (let i = 0; i < STEPS.length; i++) {
      await renderStep(STEPS[i], i, STEPS.length);
      await sleep(400);
    }

    const closing = [
      chalk.bold.green('✔ Tutorial completado'),
      chalk.white('Ya sabes controlar Landmaker de punta a punta.'),
      chalk.dim('Tip final: usa `landmaker doctor` antes de `landmaker deploy` para producción segura.'),
      '',
      `${chalk.yellow('Brillos de despedida:')} ${chalk.magenta('✨')} ${chalk.cyan('✨')} ${chalk.yellow('✨')}`,
    ].join('\n');

    console.log(
      boxen(closing, {
        padding: 1,
        borderStyle: 'doubleSingle',
        borderColor: 'green',
      })
    );
  } catch {
    console.log(
      boxen(
        [
          chalk.bold('Landmaker tutorial'),
          '',
          chalk.red('✖ No se pudo ejecutar el tutorial visual.'),
          chalk.dim('Sugerencia: vuelve a intentar en una terminal interactiva (TTY).'),
        ].join('\n'),
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'red',
        }
      )
    );
  }
}
