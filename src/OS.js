function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=~`[]{}|;:,.<>/?';
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}
// ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=~`[]{}|;:,.<>/?

function handleScrambling(phrase, scrambleTarget) {
  let targetPhrase = phrase;
  let replacedPositions = new Set();

  let scrambledPhrase = generateRandomString(targetPhrase.length);
  // Reset the initial state if necessary
  replacedPositions.clear();

  function updateDisplay() {
    let displayString = '';
    for (let i = 0; i < scrambledPhrase.length; i++) {
      const charClass = replacedPositions.has(i) ? 'wheat' : 'stone';
      displayString += `<span class="${charClass}">${scrambledPhrase[i]}</span>`;
    }
    document.querySelector(`#${scrambleTarget}`).innerHTML = displayString;
  }

  // Start the scramble interval
  const interval = setInterval(scramble, 200); // Adjust the interval as needed

  function scramble() {
    if (scrambledPhrase === targetPhrase || !opRunning) {
      clearInterval(interval); // Stop the animation
      return;
    }

    // Decide whether to replace a new character or revert an existing one
    if (Math.random() < 0.1 && replacedPositions.size > 0) {
      // 10% chance to revert
      const positionsArray = Array.from(replacedPositions);
      const randomIndex = positionsArray[Math.floor(Math.random() * positionsArray.length)];
      replacedPositions.delete(randomIndex);

      const scrambleArray = scrambledPhrase.split('');
      scrambleArray[randomIndex] = generateRandomString(1);
      scrambledPhrase = scrambleArray.join('');
    } else {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * targetPhrase.length);
      } while (replacedPositions.has(randomIndex));

      replacedPositions.add(randomIndex);

      const scrambleArray = scrambledPhrase.split('');
      scrambleArray[randomIndex] = targetPhrase[randomIndex];
      scrambledPhrase = scrambleArray.join('');
    }

    if (scrambledPhrase === targetPhrase) {
      clearInterval(interval); // Stop the animation
    }

    updateDisplay(); // Update the display
  }
}

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

let opRunning = false;

const commands = {
  esc: {
    do: `esc`,
    description: `Run esc commands to orchestrate embryonic stem cells.`,
    keywords: [...newKeywords, ...cellKeywords],
    subCommands: {
      new: {
        keywords: [...newKeywords, ...cellKeywords],
        do: `esc new`,
        description: 'Become a new cell, tissue, organ, or organism.',
        syntax: `esc new [argument]`,
        ops: {
          cell: {
            keywords: [...cellKeywords],
            do: 'esc new cell',
            description: `Become a new cell.`,
            syntax: `esc make cell --[modifier]`,
            exe: function runMakeTissue(input) {
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
              function prepareScramble() {
                let phrase = `------&&&&&------`;
                let output = createOutputDiv(``, 'scramble-text stone');
                output.id = 'scramble1';
                returnOutput(output, 0);
                let phrase2 = `----&&&&&&&&&----`;
                let output2 = createOutputDiv(``, 'scramble-text stone');
                output2.id = 'scramble2';
                returnOutput(output2, 0);
                let phrase3 = `-------&&&-------`;
                let output3 = createOutputDiv(``, 'scramble-text stone');
                output3.id = 'scramble3';
                returnOutput(output3, 0);
                handleScrambling(phrase, 'scramble1');
                handleScrambling(phrase2, 'scramble2');
                handleScrambling(phrase3, 'scramble3');
              }
              // return test output steps with a promise and then start scrambling
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
                prepareScramble();
              });
              return;
            },
          },
        },
      },
    },
    run: (input) => {
      returnInput(input);
      // Separate input into array of words
      let inputArray = input.split(' ');
      // Check if second word is a subcommand
      if (inputArray[1] in commands.esc.subCommands) {
        // Check if third word is an operation
        if (inputArray[2] in commands.esc.subCommands[inputArray[1]].ops) {
          // run the operation's exe
          commands.esc.subCommands[inputArray[1]].ops[inputArray[2]].exe(input);
          return;
        } else {
          // Return error message
          let output = createOutputDiv(`Please specify a valid operation.`, 'wheat');
          returnOutput(output, 0);
          return;
        }
      } else {
        // Return error message
        let output = createOutputDiv(`Sorry, I don't understand. Please describe what you'd like to do and maybe I can help.`, 'wheat');
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
