// --- DOM DECLARATIONS ---
let logoBtn = document.querySelector('.logo-container');

// --- KEYWORDS AND ARGUMENTS ---

// BIOLOGY

// Types of stem cells
const stemCells = ['esc', 'somatic', 'ipsc'];
// All types of cells
const allCells = ['epithelial', 'connective', 'muscle', 'nerve', 'blood'];
let randomCell = allCells[Math.floor(Math.random() * allCells.length)];

// make
const makeKeywords = ['make', 'make', 'new', 'construct', 'engineer', 'manufacture'];
// blood
const bldKeywords = [
  'blood',
  'hematopoietic',
  'hematopoiesis',
  'hematopoietic stem cell',
  'hematopoietic stem cells',
  'hematopoietic stem-cell',
  'hematopoietic stem-cells',
  'hematopoietic stemcell',
  'hematopoietic stemcells',
  'hematopoietic stem-cell',
  'hematopoietic stem-cells',
  'hematopoietic stemcell',
  'hematopoietic stemcells',
  'hematopoietic stem-cell',
  'hematopoietic stem-cells',
  'hematopoietic stemcell',
  'hematopoietic stemcells',
  'hematopoietic stem-cell',
  'hematopoietic stem-cells',
  'hematopoietic stemcell',
  'hematopoietic stemcells',
  'hematopoietic stem-cell',
  'hematopoietic stem-cells',
  'hematopoietic stemcell',
  'hematopoietic stemcells',
  'hematopoietic stem-cell',
  'hematopoietic stem-cells',
  'hematopoietic stemcell',
  'hematopoietic stemcells',
  ...stemCells,
];
const bldArgs = [...stemCells];

// --- COMMANDS ---

const commands = {
  embyr: {
    do: `embyr <span class='stone'>[command] [argument]</span>`,
    description: `Run embyr commands to orchestrate stem cells.`,
    keywords: [...makeKeywords, ...bldKeywords],
    subCommands: {
      make: {
        keywords: [...makeKeywords, ...bldKeywords],
        do: `embyr make <span class='stone'>[argument]</span>`,
        description: 'Engineer new cells or molecules.',
        ops: {
          bld: {
            keywords: [...bldKeywords],
            acceptedArgs: [...bldArgs],
            argFlag: '-t',
            syntax: `embyr make bld -t [stem cell type]`,
            do: 'embyr make bld',
            description: `Engineer a new blood cell`,
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
        // Check for bld
        if (input.includes('bld')) {
          // Check for cell type
          if (input.includes('-t')) {
            // check if what follows -t is a cell type
            let inputArr = input.split(' ');
            let inputIndex = inputArr.indexOf('-t');
            let inputArg = inputArr[inputIndex + 1].toLowerCase();
            if (bldArgs.includes(inputArg)) {
              // return success message with cell type
              let output = createOutputDiv(`You've successfully made a blood cell from a <span class="lilac" style="font-weight: 600">${inputArg}</span> cell`, 'wheat thicc');
              returnOutput(output, 0);
              return;
            } else if (inputArg === undefined) {
              // return success message with random cell
              let output = createOutputDiv(`You've successfully made a blood cell from a <span class="lilac" style="font-weight: 600">multipotent</span> stem cell`, 'wheat thicc');
              returnOutput(output, 0);
              return;
            }
          } else {
            // return success message with random cell
            let output = createOutputDiv(`You've successfully made a blood cell from a <span class="lilac" style="font-weight: 600">multipotent</span> cell`, 'wheat thicc');
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
