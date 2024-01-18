function generateRandomString(length) {
  const characters = '0123456789!@#$%^&*()-_+=~`[]{}|;:,.<>/?';
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}
// ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789

function handleScrambling(phrase, scrambleTarget) {
  let targetPhrase = phrase;
  let replacedPositions = new Set();

  // Reset the initial state if necessary
  let scrambledPhrase = generateRandomString(targetPhrase.length);
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
  const interval = setInterval(scramble, 80); // Adjust the interval as needed

  function scramble() {
    if (scrambledPhrase === targetPhrase) {
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
// Tissue types
const tissues = ['epithelial', 'connective', 'muscle', 'nerve'];
function getRandomTissue() {
  return tissues[Math.floor(Math.random() * tissues.length)];
}
// Disorder types
const disorders = ['cancer', 'infection', 'injury', 'degenerative', 'autoimmune'];
function getRandomDisorder() {
  return disorders[Math.floor(Math.random() * disorders.length)];
}

// make
const makeKeywords = ['make', 'make', 'new', 'construct', 'engineer', 'manufacture'];
// tissue
const tissueKeywords = [
  'tissue',
  'tissues',
  'organ',
  'organs',
  'organism',
  'organisms',
  'body',
  'bodies',
  'cell',
  'cells',
  'molecule',
  'molecules',
  'protein',
  'proteins',
  'rna',
  'dna',
  'gene',
  'genes',
  'chromosome',
  'chromosomes',
  'chromatin',
  'skin',
  'hair',
  'nail',
  'bone',
  'cartilage',
  'fat',
  'adipose',
  'blood',
  'brain',
  ...tissues,
];
const tissueArgs = [...tissues];
// make outputs - tissue engineering
const newTissueOutputs = [
  {
    step: '0',
    text: `Run <span class='thicc lilac'>tissue engineering</span> protocol...`,
  },
  {
    step: '1',
    text: `<span class='thicc honey'>Extract</span> stem cells from patient's body.`,
  },
  {
    step: '2',
    text: `<span class='thicc swamp'>Engineer </span> stem cells to differentiate into the desired cell type.`,
    // This involves creating biological tissues in the lab using a combination of stem cells, scaffolds, and bioreactors. The stem cells are placed on a scaffold that mimics the structure of the tissue to be grown. The bioreactor provides the cells with the necessary nutrients and growth factors to grow and differentiate into the desired cell type.
  },
  {
    step: '3',
    text: `<span class='thicc clay'>Grow</span> engineered tissue in bioreactor.`,
  },
  {
    step: '4',
    text: `<span class='thicc river'>Transplant</span> engineered tissue into patient.`,
  },
];
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

const commands = {
  esc: {
    do: `esc <span class='stone'>[command] [argument]</span>`,
    description: `Run esc make commands to orchestrate stem cells.`,
    keywords: [...makeKeywords, ...tissueKeywords],
    subCommands: {
      new: {
        keywords: [...makeKeywords, ...tissueKeywords],
        do: `esc new`,
        description: 'Engineer new tissue cells or molecules.',
        syntax: `esc new [type of tissue]`,
        ops: {
          cell: {
            keywords: [...tissueKeywords],
            argFlag: '--',
            syntax: `esc make cell --[modifier]`,
            do: 'esc new cell',
            description: `Engineer new cells`,
            exe: function runMakeTissue(input) {
              // Check for help
              if (input.includes('-h') || input.includes('-help')) {
                let output = createOutputDiv(`Here's some help...`, 'wheat');
                returnOutput(output, 0);
                return;
              }
              function prepareScramble() {
                let phrase = 'There is so much room in a person there should be more of us in here.';
                let output = createOutputDiv(``, 'scramble-text');
                output.id = 'scramble1';
                returnOutput(output, 0);
                handleScrambling(phrase, 'scramble1');
                let phrase2 = 'Something must come of this.';
                let output2 = createOutputDiv(``, 'scramble-text2');
                output2.id = 'scramble2';
                returnOutput(output2, 0);
                handleScrambling(phrase2, 'scramble2');
              }
              // return test output steps with a promise and then start scrambling
              function returnSteps(outputSteps) {
                return new Promise((resolve, reject) => {
                  const outputStepsLength = outputSteps.length;
                  setTimeout(() => {
                    outputSteps.forEach((output) => {
                      setTimeout(() => {
                        let outputDiv = createOutputDiv(output.text, 'wheat');
                        returnOutput(outputDiv, 0);
                      }, outputDelay[output.step]);
                    });
                  }, 0);
                  resolve(outputStepsLength);
                });
              }
              returnSteps(testOutputs).then((outputStepsLength) => {
                setTimeout(() => {
                  thread.innerHTML = '';
                  prepareScramble();
                }, outputDelay[outputStepsLength + 4]);
              });
              return;
            },
          },
        },
      },
      // fd: {
      //   keywords: [...fixKeywords, ...disorderKeywords],
      //   do: `esc fd`,
      //   description: 'Engineer stem cells to treat a disorder.',
      //   syntax: `esc fd [type of disorder]`,
      //   ops: {
      //     cancer: {
      //       keywords: [...disorderKeywords],
      //       argFlag: '--',
      //       syntax: `esc fd cancer --[modifier]`,
      //       do: 'esc fd cancer',
      //       description: `Use stem cells for personalized cancer treatments.`,
      //       exe: function runFixDisorder(input) {
      //         // Check for help
      //         if (input.includes('-h') || input.includes('-help')) {
      //           let output = createOutputDiv(`Here's some help...`, 'wheat');
      //           returnOutput(output, 0);
      //           return;
      //         }
      //         geneOutputs.forEach((output) => {
      //           setTimeout(() => {
      //             let outputDiv = createOutputDiv(output.text, 'wheat');
      //             returnOutput(outputDiv, 0);
      //           }, outputDelay[output.step]);
      //         });
      //         return;
      //       },
      //     },
      //   },
      // },
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
      // // Check for help
      // if (input.includes('-h') || input.includes('-help')) {
      //   let output = createOutputDiv(`Here's some help...`, 'wheat');
      //   returnOutput(output, 0);
      //   return;
      // }
      // let command = '';
      // let arg = '';
      // let argFlag = '';
      // let outputsToDisplay = '';
      // // Check for make
      // if (input.includes('make')) {
      //   command = 'make';
      //   // Check for tissue
      //   if (input.includes('tissue')) {
      //     arg = 'tissue';
      //     // Check for cell type
      //     if (input.includes('--')) {
      //       // check if the word that starts with -- is a tissue type
      //       let inputArg = input.split('--')[1].split(' ')[0];
      //       if (tissueArgs.includes(inputArg)) {
      //         argFlag = inputArg;
      //       } else if (inputArg === undefined) {
      //         // return error message
      //         let output = createOutputDiv(`Please specify a tissue type.`, 'wheat');
      //         returnOutput(output, 0);
      //       }
      //     } else {
      //       // return success message with random tissue
      //       argFlag = getRandomTissue();
      //     }
      //     outputsToDisplay = 'newTissueOutputs';
      //   }
      // }
      // // Check for fix
      // if (input.includes('fix')) {
      //   command = 'fix';
      //   // Check for disorder
      //   if (input.includes('disorder')) {
      //     arg = 'disorder';
      //     // Check for disorder type
      //     if (input.includes('--')) {
      //       // check if the word that starts with -- is a disorder type
      //       let inputArg = input.split('--')[1].split(' ')[0];
      //       if (disorderArgs.includes(inputArg)) {
      //         argFlag = inputArg;
      //       } else if (inputArg === undefined) {
      //         // return error message
      //         let output = createOutputDiv(`Please specify a disorder type.`, 'wheat');
      //         returnOutput(output, 0);
      //       }
      //     } else {
      //       // return success message with random disorder
      //       argFlag = getRandomDisorder();
      //     }
      //   }
      //   if (argFlag === 'cancer' || argFlag === 'infection' || argFlag === 'injury' || argFlag === 'autoimmune') {
      //     outputsToDisplay = 'geneOutputs';
      //   } else if (argFlag === 'degenerative') {
      //     outputsToDisplay = 'regenTissueOutputs';
      //   }
      // }
      // // If command and arg are defined, run the command and return outputs accordingly
      // if (command !== '' && arg !== '' && argFlag !== '') {
      //   // return success message with argFlag
      //   let output = createOutputDiv(`working on it...`, 'stone');
      //   returnOutput(output, 0);
      //   // const outputToReturn = argFlag + 'Outputs';
      //   // return a new output for each step in the output array
      //   eval(outputsToDisplay).forEach((output) => {
      //     setTimeout(() => {
      //       let outputDiv = createOutputDiv(output.text, 'wheat');
      //       returnOutput(outputDiv, 0);
      //     }, outputDelay[output.step]);
      //   });
      //   return;
      // }
      // return confused message
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
  embyr.focus();
  if (embyr.innerText.toString().trim().length > 0) {
    focusAtEnd();
  }
}

logoBtn.addEventListener('click', cycleActiveColor);
