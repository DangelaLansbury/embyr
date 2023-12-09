// --- DOM DECLARATIONS ---
let logoBtn = document.querySelector('.logo-container');

// --- KEYWORDS AND ARGUMENTS ---

// BIOLOGY

// Types of stem cells
const stemCells = ['esc', 'somatic', 'ipsc'];
// All types of cells
const allCells = ['epithelial', 'connective', 'muscle', 'nerve', 'blood'];
// Tissue types
const tissues = ['epithelial', 'connective', 'muscle', 'nerve'];
const randomTissue = tissues[Math.floor(Math.random() * tissues.length)];
// Disorder types
const disorders = ['cancer', 'infection', 'injury', 'degenerative', 'autoimmune'];
const randomDisorder = disorders[Math.floor(Math.random() * disorders.length)];

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
// tissue outputs
const epithelialOutputs = [
  {
    step: '0',
    text: `Collect epithelial cells from a donor.`,
  },
  {
    step: '1',
    text: `Reprogram the cells to become pluripotent stem cells.`,
  },
  {
    step: '2',
    text: `Grow the cells in a lab.`,
  },
  {
    step: '3',
    text: `Use the cells to create new epithelial tissue.`,
  },
  {
    step: '4',
    text: `Implant the tissue into the patient.`,
  },
  {
    step: '5',
    text: `Wait for the tissue to integrate with the patient's body.`,
  },
  {
    step: '6',
    text: `Success! The patient's epithelial tissue has been repaired.`,
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
  'illness',
  'illnesses',
  'sickness',
  'sicknesses',
  'infection',
  'infections',
  'injury',
  'injuries',
  'degenerative',
  'degeneratives',
  'autoimmune',
  'autoimmunes',
  'cancer',
  'cancers',
  ...disorders,
];
const disorderArgs = [...disorders];

// --- COMMANDS ---

const commands = {
  embyr: {
    do: `embyr <span class='stone'>[command] [argument]</span>`,
    description: `Run embyr commands to orchestrate stem cells.`,
    keywords: [...makeKeywords, ...tissueKeywords, ...fixKeywords, ...disorderKeywords],
    subCommands: {
      make: {
        keywords: [...makeKeywords, ...tissueKeywords],
        do: `embyr make <span class='stone'>[argument]</span>`,
        description: 'Engineer new cells or molecules.',
        ops: {
          tissue: {
            keywords: [...tissueKeywords],
            acceptedArgs: [...tissueArgs],
            argFlag: '--',
            syntax: `embyr make tissue --[tissue type]`,
            do: 'embyr make tissue',
            description: `Engineer new tissue cells`,
          },
        },
      },
      fix: {
        keywords: [...fixKeywords, ...disorderKeywords],
        do: `embyr fix <span class='stone'>[argument]</span>`,
        description: 'Repair damaged cells or molecules.',
        ops: {
          disorder: {
            keywords: [...disorderKeywords],
            acceptedArgs: [...disorderArgs],
            argFlag: '--',
            syntax: `embyr fix disorder --[disorder type]`,
            do: 'embyr fix disorder',
            description: `Treat a disorder`,
          },
        },
      },
    },
    run: (input) => {
      returnInput(input);
      // Check for help
      if (input.includes('-h') || input.includes('-help')) {
        let output = createOutputDiv(`Here's some help...`, 'wheat');
        returnOutput(output, 0);
        return;
      }
      let command = '';
      let arg = '';
      let argFlag = '';
      // Check for make
      if (input.includes('make')) {
        command = 'make';
        // Check for tissue
        if (input.includes('tissue')) {
          arg = 'tissue';
          // Check for cell type
          if (input.includes('--')) {
            // check if the word that starts with -- is a tissue type
            let inputArg = input.split('--')[1].split(' ')[0];
            if (tissueArgs.includes(inputArg)) {
              argFlag = inputArg;
            } else if (inputArg === undefined) {
              // return error message
              let output = createOutputDiv(`Please specify a tissue type.`, 'wheat');
              returnOutput(output, 0);
            }
          } else {
            // return success message with random tissue
            argFlag = randomTissue;
          }
        }
      }
      // Check for fix
      if (input.includes('fix')) {
        command = 'fix';
        // Check for disorder
        if (input.includes('disorder')) {
          arg = 'disorder';
          // Check for disorder type
          if (input.includes('--')) {
            // check if the word that starts with -- is a disorder type
            let inputArg = input.split('--')[1].split(' ')[0];
            if (disorderArgs.includes(inputArg)) {
              argFlag = inputArg;
            } else if (inputArg === undefined) {
              // return error message
              let output = createOutputDiv(`Please specify a disorder type.`, 'wheat');
              returnOutput(output, 0);
            }
          } else {
            // return success message with random disorder
            argFlag = randomDisorder;
          }
        }
      }
      // If command and arg are defined, run the command and return outputs accordingly
      if (command !== '' && arg !== '' && argFlag !== '') {
        // return success message with argFlag
        let output = createOutputDiv(`embyr is working on ${argFlag}...`, 'wheat');
        returnOutput(output, 0);
        const outputToReturn = argFlag + 'Outputs';
        // return a new output for each step in the output array
        eval(outputToReturn).forEach((output) => {
          setTimeout(() => {
            let outputDiv = createOutputDiv(output.text, 'wheat');
            returnOutput(outputDiv, 0);
          }, outputDelay[output.step]);
        });
        return;
      }
      // return success message
      let output = createOutputDiv(`embyr is ready to receive commands.`, 'wheat');
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
  embyr.focus();
  if (embyr.innerText.toString().trim().length > 0) {
    focusAtEnd();
  }
}

logoBtn.addEventListener('click', cycleActiveColor);
