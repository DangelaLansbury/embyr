// const interval = setInterval(scramble, 100); // Adjust the interval as needed

// --- DOM DECLARATIONS ---
let logoBtn = document.querySelector('.logo-container');

// --- KEYWORDS AND ARGUMENTS ---

// BIOLOGY

// Types of stem cells
const stemCells = ['esc', 'somatic', 'ipsc'];
// Types of cells
const cells = [
  'neural',
  'cardiomyocyte',
  'heart',
  'cardiac',
  'hepatocytes',
  'liver',
  'hepatic',
  'pancreatic',
  'pancreas',
  'beta',
  'islet',
  'beta-islet',
  'blood',
  'platelet',
  'epithelial',
  'skin',
  'bone',
  'osteoblasts',
  'cartilage',
  'chondrocytes',
  'muscle',
  'myoblasts',
  'skeletal',
  'adipose',
  'fat',
  'adipocytes',
  'fibroblasts',
  'germ',
  'gametes',
  'sperm',
  'egg',
  'oocyte',
];

// new
const newKeywords = ['make', 'construct', 'engineer', 'manufacture', 'build', 'create', 'synthesize', 'grow', 'generate', 'produce', 'develop', 'form', 'originate', 'assemble'];
// tissue
const cellKeywords = ['cell', 'cells', 'cellular', 'cellulars', ...cells];
// test outputs
const testOutputs = [
  {
    step: '0',
    text: `Run <span class='thicc lilac'>test</span> protocol...`,
  },
  {
    step: '1',
    text: `<span class='thicc honey'>Do something</span> super cool.`,
  },
  {
    step: '2',
    text: `<span class='thicc swamp'>Do something else</span> super cool.`,
  },
  {
    step: '3',
    text: `<span class='thicc clay'>Wrap up</span> another awesome operation.`,
  },
];

// --- COMMANDS ---

let currDir = '/';
let opRunning = false;

// executables
function runMakeTissue(inputArray) {
  let input = inputArray.join(' ');
  // Check for help
  if (input.includes('-h') || input.includes('-help')) {
    let output = createOutputDiv(`Here's some help...`, 'wheat');
    returnOutput(output, 0);
    return;
  }
  // Hide input while running
  embyrInputContainer.style.visibility = 'hidden';
  help.innerHTML = quitHint;
  opRunning = true;
  function returnSteps(outputSteps) {
    return new Promise((resolve) => {
      const outputStepsLength = outputSteps.length;
      outputSteps.forEach((output) => {
        setTimeout(() => {
          let outputDiv = createOutputDiv(output.text, 'wheat');
          returnOutput(outputDiv, 0);
        }, outputDelay * output.step);
      });
      setTimeout(() => {
        resolve();
      }, outputDelay * (outputStepsLength + 2));
    });
  }
  returnSteps(testOutputs).then(() => {
    thread.innerHTML = '';
    let outputDiv = createOutputDiv('Woo! It worked!', 'wheat');
    returnOutput(outputDiv, 0);
  });
  return;
}

function runNew(inputArray) {
  let input = inputArray.join(' ');
  returnInput(input);
  let output = createOutputDiv(`You ran a new command with no arguments. Cool.`, 'wheat');
  returnOutput(output, 0);
  return;
}

function runEsc(inputArray) {
  let input = inputArray.join(' ');
  returnInput(input);
  let output = createOutputDiv(`You ran esc with no arguments. Cool.`, 'wheat');
  returnOutput(output, 0);
  return;
}

const commands = {
  esc: {
    name: 'esc',
    keywords: [...newKeywords, ...cellKeywords],
    do: `esc`,
    description: `Run esc commands to orchestrate embryonic stem cells.`,
    subCommands: {
      new: {
        name: 'new',
        keywords: [...newKeywords, ...cellKeywords],
        do: `esc new`,
        description: 'Become a new cell, tissue, organ, or organism.',
        ops: {
          cell: {
            keywords: [...cellKeywords],
            do: 'esc new cell',
            description: `Become a new cell.`,
            run: (inputArray) => {
              runMakeTissue(inputArray);
            },
          },
        },
        run: (inputArray) => {
          // Find index of 'new' in inputArray
          let newIdx = inputArray.indexOf('new');
          // Check if 'new' is the last word and if not check if the next word is in ops
          if (newIdx === inputArray.length - 1) {
            runNew(inputArray);
          } else if (inputArray[newIdx + 1] in commands.esc.subCommands.new.ops) {
            // run the operation's exe
            commands.esc.subCommands.new.ops[inputArray[newIdx + 1]].run(inputArray);
            return;
          } else {
            returnInput(inputArray);
            // Return error message
            let output = createOutputDiv(`Something went wrong. Expected a valid argument or no argument at all.`, 'wheat');
            returnOutput(output, 0);
            return;
          }
        },
      },
    },
    run: (input) => {
      // Separate input into array of words
      let inputArray = input.split(' ');
      // Find index of 'esc' in inputArray
      let escIdx = inputArray.indexOf('esc');
      // Check if 'esc' is the last word and if not check if the next word is in subCommands
      if (escIdx === inputArray.length - 1) {
        runEsc(inputArray);
      } else if (inputArray[escIdx + 1] in commands.esc.subCommands) {
        // run the subCommand's run
        commands.esc.subCommands[inputArray[escIdx + 1]].run(inputArray);
        return;
      } else {
        returnInput(inputArray);
        // Return error message
        let failingArg = inputArray[escIdx + 1];
        let output = createOutputDiv(`Something went wrong. <span class="honey">${failingArg}</span> is not a valid argument.`, 'wheat');
        returnOutput(output, 0);
      }
    },
  },
};

// listen for "q" and reset if op is running
document.addEventListener('keydown', (e) => {
  if (e.key === 'q' && opRunning) {
    e.preventDefault();
    opRunning = false;
    clearThread();
    // If embyr is invisible, show it
    if (embyrInputContainer.style.visibility === 'hidden') {
      embyrInputContainer.style.visibility = 'visible';
    }
    clearEmbyr();
    help.innerHTML = defaultHints;
  }
});

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
  embyr.focus();
  if (embyr.innerText.toString().trim().length > 0) {
    focusAtEnd();
  }
}

logoBtn.addEventListener('click', cycleActiveColor);
