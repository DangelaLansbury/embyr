// --- RECEPTORS & LIGANDS ---
let receptors = ['a-folate', 'cd19', 'cd20', 'cd22', 'cd30', 'cd33', 'egfr', 'gd2', 'her2', 'l1cam'];
let ligands = ['cd80', 'pd-l1', 'pd-l2'];
let randomReceptor = receptors[Math.floor(Math.random() * receptors.length)];

// --- STATUS ---

const status = {
  normalCells: {
    self: true,
    altered: false,
    visibleToKillers: false,
    immuneBrakes: true,
  },
  solidTumorCells: {
    self: true,
    altered: true,
    visibleToKillers: false,
    immuneBrakes: false,
  },
  liquidTumorCells: {
    self: true,
    altered: true,
    visibleToKillers: true,
    immuneBrakes: true,
  },
  foreignCells: {
    self: false,
    altered: false,
    visibleToKillers: true,
    immuneBrakes: false,
  },
};

// --- COMMANDS ---

const commands = {
  x: {
    meta: false,
    nickname: 'x',
    name: 'Express',
    description: 'Express chimeric antigen receptor.',
    keywords: ['express', 'receptor', 'protein', 'molecule', 'chimeric', 'antigen', 'car', 'show', 'display', 'add', 'unmask', 'unveil', 'reveal'],
    suggestions: {
      default: {
        command: 'x car sd',
        title: 'Express chimeric antigen receptor',
        description: 'Express CARs on cell surface to recognize covert cancer cells.',
      },
    },
    run: (input) => {
      returnInput(input);
      let intendedCAR = input.split(' ')[1].toLowerCase();
      let secondCommand = '';
      // Check if there's a second command
      if (input.split(' ')[2]) {
        if (commands[input.split(' ')[2]]) {
          secondCommand = input.split(' ')[2];
        } else {
          returnNullAndHelp(input.split(' ')[2], outputDelay[0]);
          return;
        }
      }
      clearZetsu();
      if (intendedCAR === '--h') {
        let output = createOutputDiv(`Receptors: <span class="lilac" style="font-weight: 600">${receptors.join(', ').toUpperCase()}</span>`, 'wheat');
        returnOutput(output, 0);
        return;
      }
      if (receptors.includes(intendedCAR) || intendedCAR === 'car') {
        if (intendedCAR === 'car') {
          intendedCAR = randomReceptor;
        }
        let executions = [
          {
            id: 1,
            text: `Extract T cells`,
            speed: 0.2,
            error: `Failed to extract T cells`,
            pass: true,
          },
          {
            id: 2,
            text: `Engineer cells to express ${intendedCAR.toUpperCase()}`,
            speed: 0.3,
            error: `Failed to express ${intendedCAR}`,
            pass: true,
          },
          {
            id: 3,
            text: `Culture and multiply ${intendedCAR.toUpperCase()}+ cells`,
            speed: 0.4,
            error: `Failed to culture cells.`,
            pass: true,
          },
          {
            id: 4,
            text: `Administer conditioning chemotherapy`,
            speed: 0.05,
            error: `Failed to administer conditioning chemotherapy`,
            pass: true,
          },
          {
            id: 5,
            text: `Infuse ${intendedCAR.toUpperCase()}+ CAR T cells`,
            speed: 0.05,
            error: `Failed to infuse CAR T cells`,
            pass: true,
          },
          {
            id: 6,
            text: `Nice! You've successfully expressed ${intendedCAR.toUpperCase()}.`,
          },
        ];
        // returnExecutions(`Expressing ${intendedCAR.toUpperCase()}`, executions, runSpeed[3]);
        returnOutput(createOutputDiv(executions[executions.length - 1].text, 'wheat'), outputDelay[0]);
        if (secondCommand !== '') {
          setTimeout(() => {
            commands[secondCommand].run(input);
          }, outputDelay[1]);
        }
      } else {
        returnNullAndHelp(intendedCAR);
      }
    },
  },
  b: {
    meta: false,
    nickname: 'b',
    name: 'Block',
    description: 'Release the brakes on killer T cells and the immune system.',
    keywords: ['inhibit', 'chkpt', 'block', 'prevent', 'checkpoint', 'pd-1', 'ctla-4', 'activate', 'bind', 'binding'],
    suggestions: {
      default: {
        command: 'b chkpt sd',
        title: 'Inhibit checkpoint',
        description: 'Release the brakes on killer T cells and the immune system.',
      },
    },
    run: (input, arg) => {
      returnInput(input);
      let output = createOutputDiv('You have successfully inhibited ' + arg + '.');
      returnOutput(output, outputDelay[1]);
    },
  },
  sd: {
    meta: false,
    nickname: 'sd',
    name: 'Search & Destroy',
    description: 'Search the system for antigens and phagocytose them.',
    keywords: [
      'detect',
      'evaluate',
      'interpret',
      'look',
      'see',
      'mhc',
      'class i',
      'class 1',
      'class one',
      'histocompatibility',
      'histocompatibility complex',
      'self',
      'peptide',
      'antigen',
      'search',
      'destroy',
      'kill',
      'phagocytosis',
      'phagocytose',
      'eat',
    ],
    suggestions: {
      default: {
        command: 'sd',
        title: 'Find and destroy antigens',
        description: 'Search the system for antigens and phagocytose them.',
      },
    },
    run: (input, arg) => {
      if (input.split(' ')[1] === 'sd') {
        returnInput(input);
      }
      let output = createOutputDiv('You have successfully searched and destroyed.');
      returnOutput(output, outputDelay[1]);
    },
  },
  // restore: {
  //   meta: true,
  //   nickname: 'restore',
  //   name: 'Revert state',
  //   title: 'Restore',
  //   description: 'Revert to previous receptor or inhibitor state',
  //   keywords: ['restore', 'revert', 'version', 'history', 'go back'],
  //   icon: 'undo',
  //   suggestions: {
  //     default: {
  //       command: 'restore',
  //       description: 'Revert to previous receptor or inhibitor state.',
  //       return: 'You have successfully reverted to previous receptor or inhibitor state.',
  //     },
  //   },
  //   run: (input, arg) => {
  //     thread.innerHTML = '';
  //   },
  // },
  r: {
    meta: true,
    nickname: 'r',
    name: 'Reset all',
    description: 'Reset the system... a fresh start.',
    keywords: ['reset', 'clear', 'restart', 'refresh', 'start over', 'reset all'],
    suggestions: {
      default: {
        command: 'r',
        title: 'Clear thread and reset system',
        description: 'Reset the system... a fresh start.',
      },
    },
    run: (input, arg) => {
      thread.innerHTML = '';
    },
  },
  h: {
    meta: true,
    nickname: 'h',
    name: 'More help',
    description: 'Get help.',
    keywords: ['h', 'help', 'about', 'project', 'zetsu', 'immune system', 'immunity', 'commands', 'info'],
    suggestions: {
      default: {
        command: 'h',
        title: 'Show information about how to use Zetsu',
        description: 'Get help.',
      },
    },
    run: () => {
      thread.innerHTML = '';
      let output = document.createElement('div');
      output.innerHTML = `
        <div class="thread-block">
          <div class="thread-text">A reimagined terminal experience to orchestrate Killer T Cells</div>
          <div class="thread-text small">Fuzzy search executables as you type. Don't remember a command or argument? Try describing it.</div>
          <div class="thread-text small"><span style="color: var(--lilac)">Ninja</span>: hunt down and kill specific threats. Use <span style="color: var(--sweetgrass)">exp</span> to express chimeric antigen receptors so cancel cells can't hide.</div>
          <div class="thread-text small"><span style="color: var(--honey)">Berserker</span>: open up a can of whoopass on all they asses. Use <span style="color: var(--sweetgrass)">inh</span> to prevent cancer cells from mellowing you out.</div>
          <div class="thread-text stone small">-- Not what you're looking for? Check out <a href="https://github.com/DangelaLansbury/zetsu">the docs</a> for more info.</div>
        </div>
        `;
      returnOutput(output, 0);
    },
  },
};
