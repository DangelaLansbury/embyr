// --- DOM DECLARATIONS ---
let logoBtn = document.querySelector('.logo-container');

// --- KEYWORDS AND ARGUMENTS ---

// BIOLOGY

// Types of stem cells
const stemCells = ['esc', 'somatic', 'ipsc'];
// All types of cells
const allCells = ['epithelial', 'connective', 'muscle', 'nerve', 'blood'];
let randomCell = allCells[Math.floor(Math.random() * allCells.length)];
// Tissue types
const tissues = ['epithelial', 'connective', 'muscle', 'nerve'];
// Disorder types
const disorders = ['cancer', 'infection', 'injury', 'degenerative', 'autoimmune'];

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
            argFlag: '-t',
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
      // Check for make
      if (input.includes('make')) {
        // Check for tissue
        if (input.includes('tissue')) {
          // Check for cell type
          if (input.includes('--')) {
            // check if the word that starts with -- is a tissue type
            let inputArg = input.split('--')[1].split(' ')[0];
            if (tissueArgs.includes(inputArg)) {
              // return success message with tissue type
              let output = createOutputDiv(`<span class="lilac" style="font-weight: 600">success</span> with a type specified`, 'wheat thicc');
              returnOutput(output, 0);
              return;
            } else if (inputArg === undefined) {
              // return success message with random tissue
              let output = createOutputDiv(`<span class="lilac" style="font-weight: 600">success</span> with no known type specified`, 'wheat thicc');
              returnOutput(output, 0);
              return;
            }
          } else {
            // return success message with random tissue
            let output = createOutputDiv(`<span class="lilac" style="font-weight: 600">success</span> with no type included`, 'wheat thicc');
            returnOutput(output, 0);
            return;
          }
        }
      }
      // Check for fix
      if (input.includes('fix')) {
        // Check for disorder
        if (input.includes('disorder')) {
          // Check for disorder type
          if (input.includes('--')) {
            // check if the word that starts with -- is a disorder type
            let inputArg = input.split('--')[1].split(' ')[0];
            if (disorderArgs.includes(inputArg)) {
              // return success message with disorder type
              let output = createOutputDiv(`<span class="lilac" style="font-weight: 600">success</span> with a type specified`, 'wheat thicc');
              returnOutput(output, 0);
              return;
            } else if (inputArg === undefined) {
              // return success message with random disorder
              let output = createOutputDiv(`<span class="lilac" style="font-weight: 600">success</span> with no known type specified`, 'wheat thicc');
              returnOutput(output, 0);
              return;
            }
          } else {
            // return success message with random disorder
            let output = createOutputDiv(`<span class="lilac" style="font-weight: 600">success</span> with no type included`, 'wheat thicc');
            returnOutput(output, 0);
            return;
          }
        }
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
