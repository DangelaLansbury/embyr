// const interval = setInterval(scramble, 100); // Adjust the interval as needed

// --- DOM DECLARATIONS ---
const logoBtn = document.querySelector('.logo-container');

// --- KEYWORDS AND ARGUMENTS ---

// make commands

const makeKeywords = [
  'make',
  'track',
  'manage',
  'change',
  'lineage',
  'form',
  'create',
  'new',
  'become',
  'cell',
  'tissue',
  'organ',
  'organism',
  'clone',
  'copy',
  'duplicate',
  'replicate',
  'reproduce',
  'renew',
  'regenerate',
  'rebuild',
  'reconstruct',
  'reform',
  'redevelop',
  'reformulate',
  'reoriginate',
  'resynthesize',
  'regrow',
];

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

let currDir = `~`;
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
  // Hide path while running
  path.style.display = 'none';
  // Set emby contenteditable to false
  embyr.setAttribute('contenteditable', 'false');
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
  make: {
    name: 'make',
    keywords: [...makeKeywords, ...newKeywords, ...cellKeywords],
    do: `make`,
    description: `The <span class="lilac thicc inline-command"> make </span> command is used to track and manage changes in the embryonic stem cell's lineage and form.`,
    preview: `Expected an argument after <span class="lilac thicc inline-command"> make </span>.`,
    subCommands: {
      new: {
        name: 'new',
        keywords: [...makeKeywords, ...newKeywords, ...cellKeywords],
        do: `make new`,
        description: `The <span class="lilac thicc inline-command"> new </span> command is used to create a new cell, tissue, organ, or organism.`,
        preview: `Expected an argument after <span class="lilac thicc inline-command"> new </span>.`,
        ops: {
          cell: {
            keywords: [...cellKeywords],
            do: 'make new cell',
            description: `The <span class="lilac thicc inline-command">cell</span> command is used to create a new cell.`,
            preview: `Woo! It worked.`,
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
          } else if (inputArray[newIdx + 1] in commands.make.subCommands.new.ops) {
            // run the operation's exe
            commands.make.subCommands.new.ops[inputArray[newIdx + 1]].run(inputArray);
            return;
          } else {
            let input = inputArray.join(' ');
            returnInput(input);
            // Return error message
            let failingArg = inputArray[newIdx + 1];
            let output = createOutputDiv(`Something went wrong. <span class="honey">${failingArg}</span> is not a valid argument.`, 'wheat');
            returnOutput(output, 0);
            return;
          }
        },
        runLint: (inputArray) => {
          // Find index of 'new' in inputArray
          let newIdx = inputArray.indexOf('new');
          // Check if 'new' is the last word and if not check if the next word is in ops
          if (newIdx === inputArray.length - 1) {
            return true;
          } else if (inputArray[newIdx + 1] in commands.make.subCommands.new.ops) {
            // run the operation's exe
            return true;
          } else {
            return false;
          }
        },
      },
    },
    run: (input) => {
      // Separate input into array of words
      let inputArray = input.toString().split(' ');
      // Find index of 'make' in inputArray
      let makeIdx = inputArray.indexOf('make');
      // Check if 'make' is the last word and if not check if the next word is in subCommands
      if (makeIdx === inputArray.length - 1) {
        runmake(inputArray);
      } else if (inputArray[makeIdx + 1] in commands.make.subCommands) {
        // run the subCommand's run
        commands.make.subCommands[inputArray[makeIdx + 1]].run(inputArray);
        return;
      } else {
        returnInput(input);
        // Return error message
        let failingArg = inputArray[makeIdx + 1];
        let output = createOutputDiv(`Something went wrong. <span class="honey">${failingArg}</span> is not a valid argument.`, 'wheat');
        returnOutput(output, 0);
      }
    },
    runLint: (input) => {
      // Separate input into array of words
      let inputArray = input.toString().split(' ');
      // Find index of 'make' in inputArray
      let makeIdx = inputArray.indexOf('make');
      // Check if 'make' is the last word and if not check if the next word is in subCommands
      if (makeIdx === inputArray.length - 1) {
        return true;
      } else if (inputArray[makeIdx + 1] in commands.make.subCommands) {
        // run the subCommand's run
        commands.make.subCommands[inputArray[makeIdx + 1]].runLint(inputArray);
        return true;
      } else {
        return false;
      }
    },
  },
  clear: {
    name: 'clear',
    keywords: ['clear', 'cls', 'clr', 'clean', 'purge', 'erase', 'wipe', 'reset'],
    do: `clear`,
    description: `Clear the terminal.`,
    run: (input) => {
      inputArray = input.toString().split(' '); // Separate input into array of words
      let clrIdx = inputArray.indexOf('clear');
      // Check if 'clear' is the last word and if not check if the next word is in ops
      if (clrIdx === inputArray.length - 1) {
        clearEmbyr();
        return;
      } else if (inputArray[clrIdx + 1] === '.') {
        history = [];
        clearEmbyr();
        return;
      } else {
        let input = inputArray.join(' ');
        returnInput(input);
        // Return error message
        let failingArg = inputArray[clrIdx + 1];
        let output = createOutputDiv(`Something went wrong. <span class="honey">${failingArg}</span> is not a valid argument.`, 'wheat');
        returnOutput(output, 0);
        return;
      }
    },
    runLint: (input) => {
      inputArray = input.toString().split(' '); // Separate input into array of words
      let clrIdx = inputArray.indexOf('clear');
      // Check if 'clear' is the last word and if not check if the next word is in ops
      if (clrIdx === inputArray.length - 1) {
        return true;
      } else if (inputArray[clrIdx + 1] === '.') {
        return true;
      } else {
        return false;
      }
    },
  },
};

const lintCommands = (command) => {
  // Get input
  let input = embyr.innerText.toString().trim();
  // Separate input into array of words
  let inputArray = input.split(' ');
  // Find index of first word in inputArray
  let firstWord = inputArray[0];
  let secondWord = inputArray[1];
  let thirdWord = inputArray[2];
  // Check if first word is in commands
  if (firstWord in commands) {
    // if that returns true, display the command's description
    if (commands[firstWord].runLint(input)) {
      displayShort(input, `No errors detected: ${commands[firstWord].preview}`);
      if (secondWord in commands[firstWord].subCommands) {
        displayShort(input, `No errors detected: ${commands[firstWord].subCommands[secondWord].preview}`);
        if (thirdWord in commands[firstWord].subCommands[secondWord].ops) {
          displayShort(input, `No errors detected: ${commands[firstWord].subCommands[secondWord].ops[thirdWord].preview}`);
        }
      }
    } else {
      displayShort(input, 'Command not found.');
    }
    return;
  } else {
    displayShort(input, 'Command not found.');
    return;
  }
};

// listen for "q" and reset if op is running
document.addEventListener('keydown', (e) => {
  if (e.key === 'q' && opRunning) {
    e.preventDefault();
    opRunning = false;
    clearThread();
    // If embyr is invisible, show it
    if (path.style.display === 'none') {
      path.style.display = 'inline-block';
      embyr.setAttribute('contenteditable', 'true');
      embyrFocus();
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
  embyrFocus();
  if (embyr.innerText.toString().trim().length > 0) {
    focusAtEnd();
  }
}

logoBtn.addEventListener('click', cycleActiveColor);
