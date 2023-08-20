// --- RECEPTORS & LIGANDS ---
let receptors = ['a-folate', 'cd19', 'cd20', 'cd22', 'cd30', 'cd33', 'egfr', 'gd2', 'her2', 'l1cam'];
let ligands = ['cd80', 'pd-l1', 'pd-l2'];
let randomReceptor = receptors[Math.floor(Math.random() * receptors.length)];
let randomLigand = ligands[Math.floor(Math.random() * ligands.length)];

// --- STATUS ---

const sysStatus = {
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
    culprit: randomReceptor,
  },
  liquidTumorCells: {
    self: true,
    altered: true,
    visibleToKillers: true,
    immuneBrakes: true,
    culprit: randomLigand,
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
    defaultHints: {
      'x car': {
        command: 'x <span class="regular lilac">car</span>',
        title: 'Express CAR',
        description: 'Show chimeric antigen receptor on cell surface to recognize covert cancer cells.',
      },
      'x car sd': {
        command: 'x <span class="regular lilac">car</span> <span class="clay">sd</span>',
        title: 'Express CAR then hunt',
        description: 'Show chimeric antigen receptor on cell surface to recognize covert cancer cells, then set modified Killer T Cells on the hunt.',
      },
    },
    run: (input) => {
      // returnInput(input);
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
      thread.innerHTML = '';
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
            text: `Extract T cells...`,
            speed: 0.2,
            error: `Failed to extract T cells`,
            class: 'stone',
            pass: true,
          },
          {
            id: 2,
            text: `Engineer cells to express <span class="thicc">${intendedCAR.toUpperCase()}</span>...`,
            speed: 0.3,
            error: `Failed to express ${intendedCAR}`,
            class: 'stone',
            pass: true,
          },
          {
            id: 3,
            text: `Culture and multiply <span class="thicc">${intendedCAR.toUpperCase()}</span>+ cells...`,
            speed: 0.4,
            error: `Failed to culture cells.`,
            class: 'stone',
            pass: true,
          },
          {
            id: 4,
            text: `Administer conditioning chemotherapy...`,
            speed: 0.05,
            error: `Failed to administer conditioning chemotherapy`,
            class: 'stone',
            pass: true,
          },
          {
            id: 5,
            text: `Infuse <span class="thicc">${intendedCAR.toUpperCase()}</span>+ CAR T cells...`,
            speed: 0.05,
            error: `Failed to infuse CAR T cells`,
            class: 'stone',
            pass: true,
          },
          {
            id: 6,
            text: `Nice! You've successfully expressed <span class="thicc swamp">${intendedCAR.toUpperCase()}</span> on killer t cells.`,
            class: 'wheat',
          },
        ];
        executions.forEach((execution) => {
          returnOutput(createOutputDiv(execution.text, execution.class), outputDelay[execution.id - 1]);
        });
        sysStatus.solidTumorCells.visibleToKillers = true;
        if (secondCommand !== '') {
          setTimeout(() => {
            commands[secondCommand].run(input);
          }, outputDelay[executions.length]);
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
    keywords: ['inhibit', 'cpt', 'block', 'prevent', 'checkpoint', 'pd-1', 'ctla-4', 'activate', 'bind', 'binding'],
    defaultHints: {
      'b cpt': {
        command: `b <span class="regular lilac">cpt</span>`,
        title: 'Inhibit checkpoint',
        description: 'Release the brakes on killer T cells.',
      },
      'b cpt sd': {
        command: `b <span class="regular lilac">cpt</span> <span class="clay">sd</span>`,
        title: 'Inhibit checkpoint then hunt',
        description: 'Release the brakes on killer T cells, then set them on the loose.',
      },
    },
    run: (input) => {
      let intendedInhibitor = input.split(' ')[1].toLowerCase();
      clearZetsu();
      thread.innerHTML = '';
      if (intendedInhibitor === '--h') {
        let output = createOutputDiv(`Inhibitors: <span class="sweetgrass" style="font-weight: 600">${ligands.join(', ').toUpperCase()}</span>`, 'wheat');
        returnOutput(output, 0);
        return;
      }
      if (ligands.includes(intendedInhibitor) || intendedInhibitor === 'cpt') {
        if (intendedInhibitor === 'cpt') {
          intendedInhibitor = randomLigand;
        }
        let target = '';
        if (intendedInhibitor === 'pd-l1') {
          target = 'pd-1';
        } else if (intendedInhibitor === 'pd-l2') {
          target = 'pd-1';
        } else if (intendedInhibitor === 'cd80') {
          target = 'ctla-4';
        }
        let executions = [
          {
            id: 1,
            text: `Administering checkpoint inhibitor drug...`,
            error: `Failed to administer checkpoint inhibitor drug`,
            class: 'stone',
            pass: true,
          },
          {
            id: 2,
            text: `Binding <span class="thicc">${intendedInhibitor.toUpperCase()}</span> to <span class="thicc">${target.toUpperCase()}</span>...`,
            error: `Failed to bind ${intendedInhibitor} to ${target}`,
            class: 'stone',
            pass: true,
          },
          {
            id: 3,
            text: `Nice! You've successfully inhibited <span class="thicc lilac">${target.toUpperCase()}</span>.`,
            class: 'wheat',
          },
        ];
        executions.forEach((execution) => {
          returnOutput(createOutputDiv(execution.text, execution.class), outputDelay[execution.id - 1]);
        });
        sysStatus.liquidTumorCells.immuneBrakes = false;
      } else {
        returnNullAndHelp(intendedInhibitor);
      }
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
    defaultHints: {
      sd: {
        command: 'sd',
        title: 'Find and destroy antigens',
        description: 'Search the system for antigens and phagocytose them.',
      },
    },
    run: () => {
      clearZetsu();
      let output = createOutputDiv('Searching for cancer cells...', 'stone');
      returnOutput(output, outputDelay[0]);
      if (sysStatus.solidTumorCells.visibleToKillers === true && sysStatus.liquidTumorCells.immuneBrakes === false) {
        output = createOutputDiv('Found and eliminated 100% of cancer cells.', 'wheat');
        returnOutput(output, outputDelay[1]);
      } else if (sysStatus.solidTumorCells.visibleToKillers === true && sysStatus.liquidTumorCells.immuneBrakes === true) {
        output = createOutputDiv('Found and eliminated 50% of cancer cells.', 'wheat');
        returnOutput(output, outputDelay[1]);
      } else if (sysStatus.solidTumorCells.visibleToKillers === false && sysStatus.liquidTumorCells.immuneBrakes === false) {
        output = createOutputDiv('Found and eliminated 50% of cancer cells.', 'wheat');
        returnOutput(output, outputDelay[1]);
      } else if (sysStatus.solidTumorCells.visibleToKillers === false && sysStatus.liquidTumorCells.immuneBrakes === true) {
        output = createOutputDiv('Found and eliminated 0% of cancer cells.', 'wheat');
        returnOutput(output, outputDelay[1]);
      } else {
        output = createOutputDiv('Found and eliminated 0% of cancer cells.', 'wheat');
        returnOutput(output, outputDelay[1]);
      }
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
    defaultHints: {
      r: {
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
    defaultHints: {
      h: {
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
