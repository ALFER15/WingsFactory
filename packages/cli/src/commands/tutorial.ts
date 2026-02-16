import boxen from 'boxen';
import chalk from 'chalk';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

type TutorialStep = {
  title: string;
  command: string;
  purpose: string;
  usage: string[];
  notes: string[];
};

type FaceFrame = {
  leftEye: string;
  rightEye: string;
  mouth: string;
  sparkle: string;
};

const FACE_FRAMES: FaceFrame[] = [
  { leftEye: 'o', rightEye: 'o', mouth: '_^_', sparkle: '✦' },
  { leftEye: '-', rightEye: '-', mouth: '___', sparkle: '·' },
  { leftEye: 'o', rightEye: '*', mouth: '_v_', sparkle: '✧' },
];

class TutorialExit extends Error {
  constructor() {
    super('tutorial_exit');
  }
}

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

function printBanner(title: string, subtitle: string): void {
  const lines = [
    chalk.bold.magenta('LANDMAKER TUTORIAL WIZARD'),
    chalk.bold.cyan('Tu copiloto: LANDCELOT (modo juego CLI)'),
    '',
    chalk.white(title),
    chalk.dim(subtitle),
  ];

  console.log(
    boxen(lines.join('\n'), {
      padding: 1,
      borderStyle: 'double',
      borderColor: 'magenta',
    })
  );
}

function interpolateChannel(start: number, end: number, ratio: number): number {
  return Math.round(start + (end - start) * ratio);
}

function gradientColor(ratio: number): string {
  const start = { r: 0, g: 212, b: 255 };
  const mid = { r: 76, g: 255, b: 145 };
  const end = { r: 255, g: 133, b: 200 };

  if (ratio < 0.5) {
    const local = ratio / 0.5;
    const r = interpolateChannel(start.r, mid.r, local);
    const g = interpolateChannel(start.g, mid.g, local);
    const b = interpolateChannel(start.b, mid.b, local);
    return chalk.rgb(r, g, b)('█');
  }

  const local = (ratio - 0.5) / 0.5;
  const r = interpolateChannel(mid.r, end.r, local);
  const g = interpolateChannel(mid.g, end.g, local);
  const b = interpolateChannel(mid.b, end.b, local);
  return chalk.rgb(r, g, b)('█');
}

function renderGradientBar(currentStep: number, totalSteps: number, width: number = 34): string {
  const progress = totalSteps === 0 ? 1 : currentStep / totalSteps;
  const filled = Math.max(0, Math.min(width, Math.round(progress * width)));

  const chars: string[] = [];
  for (let i = 0; i < width; i++) {
    if (i < filled) {
      const ratio = width <= 1 ? 1 : i / (width - 1);
      chars.push(gradientColor(ratio));
    } else {
      chars.push(chalk.gray('░'));
    }
  }

  return `${chars.join('')} ${chalk.bold(`${Math.round(progress * 100)}%`)}`;
}

function landcelotArt(frame: FaceFrame): string {
  return [
    `${frame.sparkle}      .-""""-.      ${frame.sparkle}`,
    `     /  .--.  \\`,
    `    /  /${frame.leftEye}  ${frame.rightEye}\\  \\`,
    `   |  |   ${frame.mouth}   |  |`,
    '   |  |  .__.  |  |',
    '    \\  \\ |__| /  /',
    '     \\._\\|____|_/_.',
    '      /_/      \\_\\',
    '       LANDCELOT',
  ].join('\n');
}

function renderDialogScene(params: {
  title: string;
  subtitle: string;
  frame: FaceFrame;
  speech: string[];
  details?: string[];
  stepIndex: number;
  total: number;
}): void {
  clearScreen();
  printBanner(params.title, params.subtitle);

  const progressLabel = params.total > 0 ? `Progreso paso ${params.stepIndex}/${params.total}` : 'Progreso tutorial';
  const progressBlock = [chalk.bold(progressLabel), renderGradientBar(params.stepIndex, params.total)].join('\n');
  console.log(
    boxen(progressBlock, {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'blue',
    })
  );

  const dialogLines = [
    landcelotArt(params.frame),
    '',
    chalk.bold.yellow('LANDCELOT:'),
    ...params.speech.map((line) => `  ${line}`),
  ];

  if (params.details && params.details.length > 0) {
    dialogLines.push('');
    dialogLines.push(...params.details);
  }

  console.log(
    boxen(dialogLines.join('\n'), {
      padding: 1,
      borderStyle: 'doubleSingle',
      borderColor: 'cyan',
    })
  );
}

async function waitForNextStep(stepIndex: number, total: number): Promise<void> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    await sleep(700);
    return;
  }

  const rl = readline.createInterface({ input, output });
  try {
    while (true) {
      const frame = FACE_FRAMES[stepIndex % FACE_FRAMES.length];
      renderDialogScene({
        title: 'LANDCELOT espera tu señal',
        subtitle: 'Tutorial interactivo estilo juego',
        frame,
        speech: [
          'Teclea `s` y presiona Enter para avanzar al siguiente diálogo.',
          'Si quieres salir del tutorial, escribe `q` y presiona Enter.',
        ],
        stepIndex,
        total,
      });

      const answer = (await rl.question(chalk.bold.cyan('Tu acción [s/q]: '))).trim().toLowerCase();
      if (answer === 's' || answer === 'si' || answer === 'sí') {
        return;
      }

      if (answer === 'q') {
        throw new TutorialExit();
      }
    }
  } finally {
    rl.close();
  }
}

async function animateLandcelotThinking(stepIndex: number, total: number, message: string): Promise<void> {
  for (let i = 0; i < 3; i++) {
    const frame = FACE_FRAMES[i % FACE_FRAMES.length];
    renderDialogScene({
      title: 'LANDCELOT en acción',
      subtitle: 'Animando ojos y expresión',
      frame,
      speech: [message],
      stepIndex,
      total,
    });
    await sleep(140);
  }
}

async function animateIntroRobot(total: number): Promise<void> {
  for (let i = 0; i < 5; i++) {
    const frame = FACE_FRAMES[i % FACE_FRAMES.length];
    renderDialogScene({
      title: 'Cargando tutorial de Landcelot',
      subtitle: 'Estilo wizard en terminal con animación',
      frame,
      speech: ['Sincronizando comandos, preparando diálogos y barras de progreso...'],
      stepIndex: 0,
      total,
    });
    await sleep(180);
  }
}

async function renderStep(step: TutorialStep, index: number, total: number): Promise<void> {
  const frame = FACE_FRAMES[index % FACE_FRAMES.length];

  const details = [
    '',
    `${chalk.bold('Comando:')} ${chalk.green(step.command)}`,
    `${chalk.bold('¿Qué hace?')} ${step.purpose}`,
    '',
    chalk.bold('Uso:'),
    ...step.usage.map((u) => `  ${chalk.cyan(u)}`),
    '',
    chalk.bold('Tips de Landcelot:'),
    ...step.notes.map((n) => `  ${chalk.magenta('•')} ${n}`),
  ];

  renderDialogScene({
    title: `Paso ${index + 1}/${total} - ${step.title}`,
    subtitle: 'Tutorial estilo diálogo de videojuego',
    frame,
    speech: ['Vamos con este comando. Léelo con calma y aplícalo cuando estés listo.'],
    details,
    stepIndex: index + 1,
    total,
  });

  await waitForNextStep(index + 1, total);
}

async function renderClosing(total: number): Promise<void> {
  const frame = FACE_FRAMES[0];
  renderDialogScene({
    title: 'Tutorial completado',
    subtitle: 'Listo para construir con Landmaker',
    frame,
    speech: [
      chalk.green('✔ Ya dominas el flujo completo del CLI.'),
      'Tip pro: ejecuta `landmaker doctor` antes de `landmaker deploy`.',
      'Nos vemos en la próxima build. ¡Brillos para ti! ✦ ✧ ✦',
    ],
    stepIndex: total,
    total,
  });
}

export async function runTutorialCommand(): Promise<void> {
  try {
    const totalSteps = STEPS.length;
    await animateIntroRobot(totalSteps);

    renderDialogScene({
      title: '¡Hola! Soy Landcelot',
      subtitle: 'Tutorial guiado y pausado por tu ritmo',
      frame: FACE_FRAMES[0],
      speech: [
        'Te explicaré cada comando paso a paso como un diálogo de juego.',
        'No va de corrido: tú controlas el avance con la tecla `s`.',
      ],
      stepIndex: 0,
      total: totalSteps,
    });
    await waitForNextStep(0, totalSteps);

    for (let i = 0; i < STEPS.length; i++) {
      await animateLandcelotThinking(i + 1, totalSteps, 'Ajustando panel de comando para el siguiente paso...');
      await renderStep(STEPS[i], i, STEPS.length);
    }

    await animateLandcelotThinking(totalSteps, totalSteps, 'Guardando progreso del entrenamiento CLI...');
    await renderClosing(totalSteps);
  } catch (error) {
    if (error instanceof TutorialExit) {
      renderDialogScene({
        title: 'Tutorial pausado por el usuario',
        subtitle: 'Puedes volver cuando quieras',
        frame: FACE_FRAMES[1],
        speech: ['Sin problema. Ejecuta `landmaker tutorial` cuando quieras continuar.'],
        stepIndex: 0,
        total: STEPS.length,
      });
      return;
    }

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
