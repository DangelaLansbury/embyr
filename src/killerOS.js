// --- DOM DECLARATIONS ---
let logoBtn = document.querySelector('.logo-container');

// --- KEYWORDS AND ARGUMENTS ---

// Biologics
let TAAs = ['a-folate', 'cd19', 'cd20', 'cd22', 'cd30', 'cd33', 'egfr', 'gd2', 'her2', 'l1cam'];
let inhibitors = ['cd80', 'pd-l1', 'pd-l2', 'ctla-4', 'pd-1'];

// build
const buildKeywords = ['make', 'build', 'new', 'construct', 'engineer', 'manufacture'];
// car
const carKeywords = ['car', 'express', 'hunt', 'find', 'receptor', 'protein', 'molecule', 'chimeric', 'antigen', 'show', 'display', 'unmask', 'unveil', 'reveal', ...TAAs];
const carArgs = [...TAAs];
// inhibit
const inhibitorKeywords = ['inhibit', 'block', 'hide', 'mask', 'conceal', 'cover', 'prevent', 'stop', 'checkpoint', 'suppress', 'regulate', 'regulator', ...inhibitors];
const inhibitorArgs = [...inhibitors];

let randomReceptor = TAAs[Math.floor(Math.random() * TAAs.length)];
let randomInhibitor = inhibitors[Math.floor(Math.random() * inhibitors.length)];

// --- COMMANDS ---

const commands = {
  zetsu: {
    do: `zetsu <span class='stone'>[command] [argument]</span>`,
    description: `Run zetsu commands to orchestrate T cells and immune system responses.`,
    keywords: [...buildKeywords, ...carKeywords, ...inhibitorKeywords],
    subCommands: {
      build: {
        keywords: [...buildKeywords, ...carKeywords, ...inhibitorKeywords],
        do: `zetsu build <span class='stone'>[argument]</span>`,
        description: 'Genetically engineer new killer T cells or molecules.',
        ops: {
          car: {
            keywords: [...carKeywords],
            acceptedArgs: [...carArgs],
            argFlag: '-t',
            syntax: `zetsu build car -t [TAA]`,
            do: 'zetsu build car',
            description: `Engineer T cells to express chimeric antigen receptor and recognize tumor-associated antigens (TAAs) on covert cancer cells.`,
          },
          inhibitor: {
            keywords: [...inhibitorKeywords],
            acceptedArgs: [...inhibitorArgs],
            argFlag: '-t',
            syntax: `zetsu build inhibitor -t [checkpoint]`,
            do: 'zetsu build inhibitor',
            description: 'Prevent checkpoint proteins from suppressing T cell activity.',
          },
        },
      },
    },
    run: (input) => {
      returnInput(input);
      // Check for help
      if (input.includes('-h') || input.includes('-help')) {
        let output = createOutputDiv(`Inhibitors: <span class="lilac" style="font-weight: 600">${inhibitors.join(', ').toUpperCase()}</span>`, 'wheat');
        returnOutput(output, 0);
        return;
      }
      // Check for build
      if (input.includes('build')) {
        // Check for car
        if (input.includes('car')) {
          // Check for TAA
          if (input.includes('-t')) {
            // check if what follows -t is a TAA
            let inputArr = input.split(' ');
            let inputIndex = inputArr.indexOf('-t');
            let inputArg = inputArr[inputIndex + 1].toLowerCase();
            if (carArgs.includes(inputArg)) {
              // return success message with TAA
              let output = createOutputDiv(`CAR successfully expressed to recognize <span class="lilac" style="font-weight: 600">${inputArg.toUpperCase()}</span>`, 'wheat');
              returnOutput(output, 0);
              return;
            } else if (inputArg === undefined) {
              // return success message with random TAA
              let output = createOutputDiv(`CAR successfully expressed to recognize <span class="lilac" style="font-weight: 600">${randomReceptor.toUpperCase()}</span>`, 'wheat');
              returnOutput(output, 0);
              return;
            }
          } else {
            // return success message with random TAA
            let output = createOutputDiv(`CAR successfully expressed to recognize <span class="lilac" style="font-weight: 600">${randomReceptor.toUpperCase()}</span>`, 'wheat');
            returnOutput(output, 0);
            return;
          }
        }
        // Check for inhibitor
        if (input.includes('inhibitor')) {
          // Check for TAA
          if (input.includes('-t')) {
            // check if what follows -t is an inhibitor
            let inputArr = input.split(' ');
            let inputIndex = inputArr.indexOf('-t');
            let inputArg = inputArr[inputIndex + 1].toLowerCase();
            if (inhibitorArgs.includes(inputArg)) {
              // return success message with inhibitor
              let output = createOutputDiv(`Successfully blocked <span class="lilac" style="font-weight: 600">${inputArg.toUpperCase()}</span> checkpoint signaling pathway`, 'wheat');
              returnOutput(output, 0);
              return;
            } else if (inputArg === undefined) {
              // return success message with random inhibitor
              let output = createOutputDiv(`Successfully blocked <span class="lilac" style="font-weight: 600">${randomInhibitor.toUpperCase()}</span> checkpoint signaling pathway`, 'wheat');
              returnOutput(output, 0);
              return;
            }
          } else {
            // return success message with random inhibitor
            let output = createOutputDiv(`Successfully blocked <span class="lilac" style="font-weight: 600">${randomInhibitor.toUpperCase()}</span> checkpoint signaling pathway`, 'wheat');
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
