// --- DOM DECLARATIONS ---
let logoBtn = document.querySelector('.logo-container');

// --- KEYWORDS AND ARGUMENTS ---

// BIOLOGY

// Types of stem cells
const stemCells = ['esc', 'somatic', 'ipsc'];
// All types of cells
const allCells = ['epithelial', 'conn-tissue', 'muscle', 'nerve', 'blood'];
let randomCell = allCells[Math.floor(Math.random() * allCells.length)];

// make
const makeKeywords = ['make', 'make', 'new', 'construct', 'engineer', 'manufacture'];
// ESC
const escKeywords = ['any', 'esc', 'embryonic', 'embryo', 'pluripotent', 'pluripotency', 'totipotent', 'totipotency', 'blastocyst', 'blastula', 'blastomere', ...allCells];
const escArgs = [...allCells];

// --- COMMANDS ---

const commands = {
  zetsu: {
    do: `zetsu <span class='stone'>[command] [argument]</span>`,
    description: `Run zetsu commands to orchestrate stem cells.`,
    keywords: [...makeKeywords, ...escKeywords],
    subCommands: {
      make: {
        keywords: [...makeKeywords, ...escKeywords],
        do: `zetsu make <span class='stone'>[argument]</span>`,
        description: 'Engineer new cells or molecules.',
        ops: {
          esc: {
            keywords: [...escKeywords],
            acceptedArgs: [...escArgs],
            argFlag: '-t',
            syntax: `zetsu make esc -t [cell type]`,
            do: 'zetsu make esc',
            description: `Engineer embryonic stem cells to become a specific type of cell.`,
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
        // Check for ESC
        if (input.includes('esc')) {
          // Check for cell type
          if (input.includes('-t')) {
            // check if what follows -t is a cell type
            let inputArr = input.split(' ');
            let inputIndex = inputArr.indexOf('-t');
            let inputArg = inputArr[inputIndex + 1].toLowerCase();
            if (escArgs.includes(inputArg)) {
              // return success message with cell type
              let output = createOutputDiv(`You've successfully made a <span class="lilac" style="font-weight: 600">${inputArg}</span> cell`, 'wheat thicc');
              returnOutput(output, 0);
              return;
            } else if (inputArg === undefined) {
              // return success message with random cell
              let output = createOutputDiv(`You've successfully made a <span class="lilac" style="font-weight: 600">${randomCell}</span> cell`, 'wheat thicc');
              returnOutput(output, 0);
              return;
            }
          } else {
            // return success message with random cell
            let output = createOutputDiv(`You've successfully made a <span class="lilac" style="font-weight: 600">${randomCell}</span> cell`, 'wheat thicc');
            returnOutput(output, 0);
            return;
          }
        }
      }
      // return success message
      let output = createOutputDiv(`ZETSU is ready to receive commands.`, 'wheat');
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
