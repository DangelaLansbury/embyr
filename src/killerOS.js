// --- DOM DECLARATIONS ---
let logoBtn = document.querySelector('.logo-container');
let quitOp = document.querySelector('#quitOp');

// --- KEYWORDS AND ARGUMENTS ---

// Biologics
let TAAs = ['a-folate', 'cd19', 'cd20', 'cd22', 'cd30', 'cd33', 'egfr', 'gd2', 'her2', 'l1cam'];
let CSDomains = ['cd28', '4-1bb', 'ox40', 'icos'];
let inhibitors = ['cd80', 'pd-l1', 'pd-l2', 'ctla-4', 'pd-1'];

// Make
const makeSubs = ['car'];
const makeKeywords = ['make', 'build', 'new', 'construct', 'engineer', 'manufacture'];
const carKeywords = ['car', 'express', 'hunt', 'find', 'receptor', 'protein', 'molecule', 'chimeric', 'antigen', 'show', 'display', 'unmask', 'unveil', 'reveal', ...TAAs, ...CSDomains];
const carArgs = [...TAAs];

let randomReceptor = TAAs[Math.floor(Math.random() * TAAs.length)];
let randomInhibitor = inhibitors[Math.floor(Math.random() * inhibitors.length)];

// Show/hide toggleHelp + quitOp and running + zetsu
function toggleForRun() {
  quitOp.classList.toggle('hidden');
  running.classList.toggle('hidden');
  zetsu.classList.toggle('hidden');
}

// --- COMMANDS ---

const commands = {
  make: {
    description: 'Express chimeric antigen receptor to recognize Tumor-Associated Antigens and kill cancer cells.',
    // keywords: ['make', 'build', 'new', 'construct', 'engineer', 'manufacture', ...TAAs, ...carKeywords, ...makeSubs],
    ops: {
      make: {
        keywords: makeKeywords,
        acceptedArgs: [],
        argModifier: '',
        title: 'Build cell',
        do: 'make',
        description: 'Genetically engineer a new killer T cell.',
      },
      car: {
        keywords: [...carKeywords],
        acceptedArgs: [...carArgs],
        argModifier: '-',
        title: 'Express chimeric antigen receptor',
        do: 'make car',
        description: 'Show CAR on cell surface to recognize covert cancer cells.',
      },
    },
    run: (input) => {
      returnInput(input);
      let intendedCAR = input.split(' ')[1].toLowerCase();
      if (input.includes('--h') || input.includes('--help') || input === 'make') {
        let output = createOutputDiv(`TAAs: <span class="lilac" style="font-weight: 600">${TAAs.join(', ').toUpperCase()}</span>`, 'wheat');
        returnOutput(output, 0);
        return;
      }
      if (TAAs.includes(intendedCAR)) {
        toggleForRun();
        let executions = [
          {
            id: 1,
            text: `Extracting T cells`,
            error: `Failed to extract T cells`,
            class: 'stone',
            pass: true,
          },
          {
            id: 2,
            text: `Engineering cells to express <span class="thicc">${intendedCAR.toUpperCase()}</span> receptors`,
            error: `Failed to express ${intendedCAR}`,
            class: 'stone',
            pass: true,
          },
          {
            id: 3,
            text: `Culturing <span class="thicc">${intendedCAR.toUpperCase()}</span>+ cells`,
            error: `Failed to culture cells.`,
            class: 'stone',
            pass: true,
          },
          {
            id: 4,
            text: `Administering conditioning chemotherapy`,
            error: `Failed to administer conditioning chemotherapy`,
            class: 'stone',
            pass: true,
          },
          {
            id: 5,
            text: `Infusing <span class="thicc">${intendedCAR.toUpperCase()}</span>+ CAR T cells`,
            error: `Failed to infuse CAR T cells`,
            class: 'stone',
            pass: true,
          },
          {
            id: 6,
            text: `<span class="thicc swamp">Success!</span> You can now recognize and phagocytose TAAs expressing <span class="thicc river">${intendedCAR.toUpperCase()}</span>.`,
            class: 'wheat',
          },
        ];
        executions.forEach((execution) => {
          returnOutput(createOutputDiv(execution.text, execution.class), outputDelay[execution.id - 1]);
        });
        // show zetsu again after delay
        setTimeout(() => {
          toggleForRun();
          zetsu.focus();
        }, outputDelay[executions.length - 1]);
      } else {
        returnNullAndHelp(intendedCAR);
      }
    },
  },
  // block: {
  //   description: 'Release the brakes on killer T cells and the immune system.',
  //   keywords: ['inhibit', 'cpt', 'block', 'prevent', 'checkpoint', ...inhibitors],
  //   acceptedArgs: inhibitors,
  //   hints: {
  //     default: {
  //       title: 'Inhibit checkpoint',
  //       do: 'block',
  //       description: 'Release the brakes on killer T cells.',
  //     },
  //     'pd-1': {
  //       title: 'Inhibit PD-1',
  //       do: 'block PD-1',
  //       description: 'Release the brakes on killer T cells by blocking PD-1.',
  //     },
  //     'ctla-4': {
  //       title: 'Inhibit CTLA-4',
  //       do: 'block CTLA-4',
  //       description: 'Release the brakes on killer T cells by blocking CTLA-4.',
  //     },
  //   },
  //   run: (input) => {
  //     returnInput(input);
  //     let intendedInhibitor = input.split(' ')[1].toLowerCase();
  //     if (intendedInhibitor === '--h') {
  //       let output = createOutputDiv(`Inhibitors: <span class="sweetgrass" style="font-weight: 600">${inhibitors.join(', ').toUpperCase()}</span>`, 'wheat');
  //       returnOutput(output, 0);
  //       return;
  //     }
  //     if (inhibitors.includes(intendedInhibitor) || intendedInhibitor === 'cpt') {
  //       if (intendedInhibitor === 'cpt') {
  //         intendedInhibitor = randomLigand;
  //       }
  //       let target = '';
  //       if (intendedInhibitor === 'pd-l1') {
  //         target = 'pd-1';
  //       } else if (intendedInhibitor === 'pd-l2') {
  //         target = 'pd-1';
  //       } else if (intendedInhibitor === 'cd80') {
  //         target = 'ctla-4';
  //       } else if (intendedInhibitor === 'ctla-4') {
  //         target = 'cd80';
  //       } else if (intendedInhibitor === 'pd-1') {
  //         target = 'pd-l1';
  //       }
  //       let executions = [
  //         {
  //           id: 1,
  //           text: `Administering checkpoint inhibitor drug...`,
  //           error: `Failed to administer checkpoint inhibitor drug`,
  //           class: 'stone',
  //           pass: true,
  //         },
  //         {
  //           id: 2,
  //           text: `Binding <span class="thicc">${intendedInhibitor.toUpperCase()}</span> to <span class="thicc">${target.toUpperCase()}</span>...`,
  //           error: `Failed to bind ${intendedInhibitor} to ${target}`,
  //           class: 'stone',
  //           pass: true,
  //         },
  //         {
  //           id: 3,
  //           text: `Nice! You've successfully blocked <span class="thicc river">${target.toUpperCase()}</span> from binding with <span class="thicc swamp">${intendedInhibitor.toUpperCase()}</span>.`,
  //           class: 'wheat',
  //         },
  //       ];
  //       executions.forEach((execution) => {
  //         returnOutput(createOutputDiv(execution.text, execution.class), outputDelay[execution.id - 1]);
  //       });
  //     } else {
  //       returnNullAndHelp(intendedInhibitor);
  //     }
  //   },
  // },
  r: {
    description: 'Reset the system... a fresh start.',
    // keywords: ['reset', 'clear', 'restart', 'refresh', 'start over', 'reset all'],
    ops: {
      r: {
        keywords: ['reset', 'clear', 'restart', 'refresh', 'start over', 'reset all'],
        acceptedArgs: [],
        argModifier: '',
        title: 'Clear thread and reset system',
        do: 'r',
        description: 'Reset the system... a fresh start.',
        // hints: {
        //   default: {
        //     title: 'Clear thread and reset system',
        //     do: 'r',
        //     description: 'Reset the system... a fresh start.',
        //   },
        // },
      },
    },
    run: () => {
      thread.innerHTML = '';
    },
  },
  help: {
    description: 'Get help.',
    // keywords: ['help', 'about', 'project', 'zetsu', 'commands', 'info'],
    ops: {
      help: {
        keywords: ['help', 'about', 'project', 'zetsu', 'commands', 'info'],
        acceptedArgs: [],
        argModifier: '',
        title: 'Get help.',
        do: 'help',
        description: 'Show information about how to use Zetsu',
        // hints: {
        //   default: {
        //     title: 'Show information about how to use Zetsu',
        //     do: 'help',
        //     description: 'Get help.',
        //   },
        // },
      },
    },
    run: () => {
      thread.innerHTML = '';
      let output = document.createElement('div');
      output.innerHTML = `
        <div class="thread-block">
          <div class="thread-text">A reimagined terminal experience to orchestrate Killer T Cells</div>
          <div class="thread-text">Fuzzy search commands as you type. Don't remember a command or argument? Try describing it.</div>
          <div class="thread-text">Not what you're looking for? Check out <a href="https://github.com/DangelaLansbury/zetsu">the docs</a> for more info.</div>
        </div>
        `;
      returnOutput(output, 0);
    },
  },
};

function cycleActiveColor() {
  let currentClass = logoBtn.classList[1];
  let nextClass = '';
  if (currentClass === 'active-color-1') {
    nextClass = 'active-color-2';
  } else if (currentClass === 'active-color-2') {
    nextClass = 'active-color-3';
  } else if (currentClass === 'active-color-3') {
    nextClass = 'active-color-4';
  } else if (currentClass === 'active-color-4') {
    nextClass = 'active-color-5';
  } else if (currentClass === 'active-color-5') {
    nextClass = 'active-color-6';
  } else if (currentClass === 'active-color-6') {
    nextClass = 'active-color-7';
  } else if (currentClass === 'active-color-7') {
    nextClass = 'active-color-1';
  } else {
    nextClass = 'active-color-1';
  }
  logoBtn.classList.remove(currentClass);
  logoBtn.classList.add(nextClass);
  zetsu.focus();
  if (zetsu.innerText.toString().trim().length > 0) {
    focusAtEnd();
  }
}

logoBtn.addEventListener('click', cycleActiveColor);
