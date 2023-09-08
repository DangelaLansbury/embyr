// --- RECEPTORS & inhibitors ---
let TAAs = ['a-folate', 'cd19', 'cd20', 'cd22', 'cd30', 'cd33', 'egfr', 'gd2', 'her2', 'l1cam'];
let inhibitors = ['cd80', 'pd-l1', 'pd-l2', 'ctla-4', 'pd-1'];
let randomReceptor = TAAs[Math.floor(Math.random() * TAAs.length)];
let randomInhibitor = inhibitors[Math.floor(Math.random() * inhibitors.length)];

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
    culprit: randomReceptor,
  },
  liquidTumorCells: {
    self: true,
    altered: true,
    immuneBrakes: true,
    culprit: randomInhibitor,
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
  hunt: {
    meta: false,
    nickname: 'hunt',
    name: 'Recognize & Kill',
    description: 'Express chimeric antigen receptor to recognize Tumor-Associated Antigens and kill cancer cells.',
    keywords: ['express', 'hunt', 'find', 'receptor', 'protein', 'molecule', 'chimeric', 'antigen', 'car', 'show', 'display', 'add', 'unmask', 'unveil', 'reveal', ...TAAs],
    acceptedArgs: TAAs,
    hints: {
      default: {
        title: 'Express CAR',
        description: 'Show chimeric antigen receptor on cell surface to recognize covert cancer cells.',
      },
      egfr: {
        title: 'Express EGFR',
        description: 'Show chimeric antigen receptor for EGFR on cell surface to recognize covert cancer cells.',
      },
    },
    run: (input) => {
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
        let output = createOutputDiv(`TAAs: <span class="lilac" style="font-weight: 600">${receptors.join(', ').toUpperCase()}</span>`, 'wheat');
        returnOutput(output, 0);
        return;
      }
      if (TAAs.includes(intendedCAR) || intendedCAR === 'car') {
        if (intendedCAR === 'car') {
          intendedCAR = randomReceptor;
        }
        let executions = [
          {
            id: 1,
            text: `Extract T cells...`,
            error: `Failed to extract T cells`,
            class: 'stone',
            pass: true,
          },
          {
            id: 2,
            text: `Engineer cells to express <span class="thicc">${intendedCAR.toUpperCase()}</span> receptors...`,
            error: `Failed to express ${intendedCAR}`,
            class: 'stone',
            pass: true,
          },
          {
            id: 3,
            text: `Culture and multiply <span class="thicc">${intendedCAR.toUpperCase()}</span>+ cells...`,
            error: `Failed to culture cells.`,
            class: 'stone',
            pass: true,
          },
          {
            id: 4,
            text: `Administer conditioning chemotherapy...`,
            error: `Failed to administer conditioning chemotherapy`,
            class: 'stone',
            pass: true,
          },
          {
            id: 5,
            text: `Infuse <span class="thicc">${intendedCAR.toUpperCase()}</span>+ CAR T cells...`,
            error: `Failed to infuse CAR T cells`,
            class: 'stone',
            pass: true,
          },
          {
            id: 6,
            text: `Booyah. Successfully hunted tumor cells expressing <span class="thicc swamp">${intendedCAR.toUpperCase()}</span> and phagocytosed them.`,
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
  block: {
    meta: false,
    name: 'Inhibit checkpoint',
    description: 'Release the brakes on killer T cells and the immune system.',
    keywords: ['inhibit', 'cpt', 'block', 'prevent', 'checkpoint', ...inhibitors],
    acceptedArgs: inhibitors,
    hints: {
      default: {
        title: 'Inhibit checkpoint',
        description: 'Release the brakes on killer T cells.',
        placeholder: 'cpt',
      },
    },
    run: (input) => {
      let intendedInhibitor = input.split(' ')[1].toLowerCase();
      clearZetsu();
      thread.innerHTML = '';
      if (intendedInhibitor === '--h') {
        let output = createOutputDiv(`Inhibitors: <span class="sweetgrass" style="font-weight: 600">${inhibitors.join(', ').toUpperCase()}</span>`, 'wheat');
        returnOutput(output, 0);
        return;
      }
      if (inhibitors.includes(intendedInhibitor) || intendedInhibitor === 'cpt') {
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
        } else if (intendedInhibitor === 'ctla-4') {
          target = 'cd80';
        } else if (intendedInhibitor === 'pd-1') {
          target = 'pd-l1';
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
            text: `Nice! You've successfully blocked killer <span class="thicc river">${target.toUpperCase()}</span> from binding with <span class="thicc swamp">${intendedInhibitor.toUpperCase()}</span>.`,
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
  r: {
    meta: true,
    nickname: 'r',
    name: 'Reset all',
    description: 'Reset the system... a fresh start.',
    keywords: ['reset', 'clear', 'restart', 'refresh', 'start over', 'reset all'],
    acceptedArgs: [],
    hints: {
      default: {
        title: 'Clear thread and reset system',
        description: 'Reset the system... a fresh start.',
        placeholder: '',
      },
    },
    run: (input, arg) => {
      thread.innerHTML = '';
    },
  },
  help: {
    meta: true,
    nickname: 'help',
    name: 'More commands',
    description: 'Get help.',
    keywords: ['h', 'help', 'about', 'project', 'zetsu', 'immune system', 'immunity', 'commands', 'info'],
    acceptedArgs: [],
    hints: {
      default: {
        title: 'Show information about how to use Zetsu',
        description: 'Get help.',
        placeholder: '',
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
