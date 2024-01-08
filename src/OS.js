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

// fix
const fixKeywords = [
  'fix',
  'repair',
  'heal',
  'cure',
  'treat',
  'restore',
  'regenerate',
  'rejuvenate',
  'renew',
  'replenish',
  'rebuild',
  'reconstruct',
  'reform',
  'reconstitute',
  'reestablish',
  'reinstate',
  'reinvigorate',
  'reanimate',
  'reawaken',
  'rekindle',
  'recharge',
  'reenergize',
  'reignite',
  'reintegrate',
];
// disorder
const disorderKeywords = [
  'disorder',
  'disorders',
  'disease',
  'diseases',
  'ill',
  'illness',
  'illnesses',
  'sick',
  'sickness',
  'sicknesses',
  'infection',
  'infect',
  'infections',
  'injury',
  'injuries',
  'degen',
  'degenerative',
  'degeneratives',
  'autoimmune',
  'autoimmunes',
  'cancer',
  'cancers',
  ...disorders,
];
const disorderArgs = [...disorders];
// disorder outputs - gene therapy
const geneOutputs = [
  {
    step: '0',
    text: `Run <span class='thicc lilac'>gene therapy</span> protocol...`,
  },
  {
    step: '1',
    text: `<span class='thicc honey'>Approach:</span> In gene therapy, defective genes that cause disease are replaced or repaired. Stem cells can be engineered to carry healthy copies of these genes. These modified stem cells are then reintroduced into the patient.`,
  },
  {
    step: '2',
    text: `<span class='thicc swamp'>Example:</span> For genetic blood disorders like sickle cell anemia, stem cells from the patient's bone marrow can be extracted, genetically corrected in the lab, and then reinfused back into the patient.`,
  },
];
// disorder outputs - regenerative medicine
const regenTissueOutputs = [
  {
    step: '0',
    text: `Run <span class='thicc lilac'>regenerative medicine</span> protocol...`,
  },
  {
    step: '1',
    text: `<span class='thicc honey'>Mechanism:</span> Stem cells can be programmed to differentiate into specific cell types. For instance, embryonic stem cells or induced pluripotent stem cells (iPSCs) can be used to generate heart muscle cells, nerve cells, or pancreatic cells.`,
  },
  {
    step: '2',
    text: `<span class='thicc swamp'>Applications:</span> This ability is harnessed to replace damaged or diseased cells in the body. For example, in patients with heart disease, stem cells can be used to generate healthy heart muscle cells that are then transplanted into the patient's heart. This can potentially restore function to damaged areas of the heart.`,
  },
];

// --- COMMANDS ---

const commands = {
  embyr: {
    do: `embyr <span class='stone'>[command] [argument]</span>`,
    description: `Run embyr commands to orchestrate stem cells.`,
    keywords: [...makeKeywords, ...tissueKeywords, ...fixKeywords, ...disorderKeywords],
    subCommands: {
      mt: {
        keywords: [...makeKeywords, ...tissueKeywords],
        do: `embyr mt <span class='stone'>[tissue]</span>`,
        description: 'Engineer new tissue cells or molecules.',
        syntax: `embyr mt [type of tissue]`,
        ops: {
          neuro: {
            keywords: [...tissueKeywords],
            argFlag: '--',
            syntax: `embyr mt neuro --[modifier]`,
            do: 'embyr mt neuro',
            description: `Engineer new neuronal cells`,
            exe: function runMakeTissue(input) {
              // Check for help
              if (input.includes('-h') || input.includes('-help')) {
                let output = createOutputDiv(`Here's some help...`, 'wheat');
                returnOutput(output, 0);
                return;
              }
              // return a new output for each step in the output array
              newTissueOutputs.forEach((output) => {
                setTimeout(() => {
                  let outputDiv = createOutputDiv(output.text, 'wheat');
                  returnOutput(outputDiv, 0);
                }, outputDelay[output.step]);
              });
              return;
            },
          },
        },
      },
      fd: {
        keywords: [...fixKeywords, ...disorderKeywords],
        do: `embyr fd <span class='stone'>[disorder]</span>`,
        description: 'Engineer stem cells to treat a disorder.',
        syntax: `embyr fd [type of disorder]`,
        ops: {
          cancer: {
            keywords: [...disorderKeywords],
            argFlag: '--',
            syntax: `embyr fd cancer --[modifier]`,
            do: 'embyr fd cancer',
            description: `Use stem cells for personalized cancer treatments.`,
            exe: function runFixDisorder(input) {
              // Check for help
              if (input.includes('-h') || input.includes('-help')) {
                let output = createOutputDiv(`Here's some help...`, 'wheat');
                returnOutput(output, 0);
                return;
              }
              geneOutputs.forEach((output) => {
                setTimeout(() => {
                  let outputDiv = createOutputDiv(output.text, 'wheat');
                  returnOutput(outputDiv, 0);
                }, outputDelay[output.step]);
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
      if (inputArray[1] in commands.embyr.subCommands) {
        // Check if third word is an operation
        if (inputArray[2] in commands.embyr.subCommands[inputArray[1]].ops) {
          // run the operation's exe
          commands.embyr.subCommands[inputArray[1]].ops[inputArray[2]].exe(input);
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
