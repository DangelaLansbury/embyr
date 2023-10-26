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
  killa: {
    description: 'Express chimeric antigen receptor to recognize Tumor-Associated Antigens and kill cancer cells.',
    keywords: [...makeKeywords, ...carKeywords],
    ops: {
      make: {
        keywords: [...makeKeywords],
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
      // Check for help
      if (input.includes('-h') || input.includes('-help') || input === 'make') {
        let output = createOutputDiv(`TAAs: <span class="lilac" style="font-weight: 600">${TAAs.join(', ').toUpperCase()}</span>`, 'wheat');
        returnOutput(output, 0);
        return;
      }
      // return success message
      let output = createOutputDiv(`CAR successfully expressed to recognize <span class="lilac" style="font-weight: 600">${randomReceptor.toUpperCase()}</span>`, 'wheat');
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
