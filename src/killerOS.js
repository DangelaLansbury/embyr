// --- INNATE IMMUNE SYSTEM ACTORS ---

const innate = {
  macrophage: {
    name: 'macrophage',
    description:
      'Macrophages are a type of white blood cell that engulfs and digests cellular debris, foreign substances, microbes, cancer cells, and anything else that does not have the types of proteins specific to healthy body cells on its surface in a process called phagocytosis.',
    action:
      'Macrophages are the first responders to infections. They are constantly on the lookout for pathogens. When they find a pathogen, they engulf and digest it. They also release cytokines, which are chemical messengers that stimulate other immune cells to attack the pathogen.',
  },
  neutrophil: {
    name: 'neutrophil',
    description:
      'Neutrophils are a type of white blood cell that engulfs and digests cellular debris, foreign substances, microbes, cancer cells, and anything else that does not have the types of proteins specific to healthy body cells on its surface in a process called phagocytosis.',
    action:
      'Neutrophils are the first responders to infections. They are constantly on the lookout for pathogens. When they find a pathogen, they engulf and digest it. They also release cytokines, which are chemical messengers that stimulate other immune cells to attack the pathogen.',
  },
  eosinophil: {
    name: 'eosinophil',
    description:
      'Eosinophils are a type of white blood cell that engulfs and digests cellular debris, foreign substances, microbes, cancer cells, and anything else that does not have the types of proteins specific to healthy body cells on its surface in a process called phagocytosis.',
    action:
      'Eosinophils are the first responders to infections. They are constantly on the lookout for pathogens. When they find a pathogen, they engulf and digest it. They also release cytokines, which are chemical messengers that stimulate other immune cells to attack the pathogen.',
  },
  basophil: {
    name: 'basophil',
    description:
      'Basophils are a type of white blood cell that engulfs and digests cellular debris, foreign substances, microbes, cancer cells, and anything else that does not have the types of proteins specific to healthy body cells on its surface in a process called phagocytosis.',
    action:
      'Basophils are the first responders to infections. They are constantly on the lookout for pathogens. When they find a pathogen, they engulf and digest it. They also release cytokines, which are chemical messengers that stimulate other immune cells to attack the pathogen.',
  },
  mastcell: {
    name: 'mast cell',
    description:
      'Mast cells are a type of white blood cell that engulfs and digests cellular debris, foreign substances, microbes, cancer cells, and anything else that does not have the types of proteins specific to healthy body cells on its surface in a process called phagocytosis.',
    action:
      'Mast cells are the first responders to infections. They are constantly on the lookout for pathogens. When they find a pathogen, they engulf and digest it. They also release cytokines, which are chemical messengers that stimulate other immune cells to attack the pathogen.',
  },
  naturalkiller: {
    name: 'natural killer cell',
    description:
      'Natural killer cells are a type of white blood cell that engulfs and digests cellular debris, foreign substances, microbes, cancer cells, and anything else that does not have the types of proteins specific to healthy body cells on its surface in a process called phagocytosis.',
    action:
      'Natural killer cells are the first responders to infections. They are constantly on the lookout for pathogens. When they find a pathogen, they engulf and digest it. They also release cytokines, which are chemical messengers that stimulate other immune cells to attack the pathogen.',
  },
  dendritic: {
    name: 'dendritic cell',
    description:
      'Dendritic cells are a type of white blood cell that engulfs and digests cellular debris, foreign substances, microbes, cancer cells, and anything else that does not have the types of proteins specific to healthy body cells on its surface in a process called phagocytosis.',
    action:
      'Dendritic cells are the first responders to infections. They are constantly on the lookout for pathogens. When they find a pathogen, they engulf and digest it. They also release cytokines, which are chemical messengers that stimulate other immune cells to attack the pathogen.',
  },
};

// --- ADAPTIVE IMMUNE SYSTEM ACTORS ---

const adaptive = {
  helpert: {
    name: 'helper T cell',
    description: 'Helper T cells are a type of white blood cell.',
    action:
      'Helper T cells stimulate other immune cells by producing and releasing cytokines that bind to receptors on target cells. These cytokines activate signaling pathways within the target cells, leading to specific immune responses that aid in the clearance of pathogens.',
  },
  cytotoxict: {
    name: 'cytotoxic T cell',
    description: 'Cytotoxic T cells are a type of white blood cell.',
    action: 'Cytotoxic T cells kill infected cells.',
  },
  memoryt: {
    name: 'memory T cell',
    description: 'Memory T cells are a type of white blood cell.',
    action: 'Memory T cells remember antigens.',
  },
  bcell: {
    name: 'B cell',
    description: 'B cells are a type of white blood cell.',
    action: 'B cells differentiate into plasma cells and memory cells. Plasma cells produce antibodies. Memory cells remember antigens.',
  },
  antibody: {
    name: 'antibody',
    description: 'Antibodies are proteins that bind to antigens.',
    action: 'Antibodies bind to antigens. This allows other immune cells to destroy the pathogen. Antibodies are produced by B cells.',
  },
};

// --- STATUS ---

const targetCell = {
  isSelf: false,
  isAltered: false,
};

// --- COMMANDS ---

const commands = {
  chk: {
    meta: false,
    name: 'Check',
    description: 'Evaluate or interpret something in the system.',
    chains: {
      'chk .': {
        name: 'Check MHC class I and peptide',
        description: 'Check MHC class I molecules and peptides at the same time to see if cell is of self and if it is infected.',
        tags: ['green', 'blue', 'red'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('check mhc peptide');
          returnOutput(output, outputDelay[1]);
        },
      },
      'chk mhc': {
        name: 'Check MHC class I',
        description: 'Check MHC class I molecules to see if cell is of self.',
        tags: ['blue'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('check mhc');
          returnOutput(output, outputDelay[1]);
        },
      },
      'chk peptide': {
        name: 'Check peptide',
        description: 'Check peptide to see if it represents an infected cell.',
        tags: ['red'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('check peptide');
          returnOutput(output, outputDelay[1]);
        },
      },
    },
    run: (input, args) => {
      returnInput(input);
      output = creatOutputDiv('What do you want to check?' + args);
      returnOutput(output, outputDelay[0]);
    },
  },
  e: {
    meta: false,
    name: 'Edit',
    description: 'Rewrite genes to alter structure and function.',
    chains: {
      'e c.0000A>C': {
        name: 'Change A to C',
        description: 'Change A to C at position 0000.',
        tags: ['purple'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('You have successfully edited the genome.');
          returnOutput(output, outputDelay[1]);
        },
      },
      'e c.0000A>G': {
        name: 'Change A to G',
        description: 'Change A to G at position 0000.',
        tags: ['indigo'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('You have successfully edited the genome.');
          returnOutput(output, outputDelay[1]);
        },
      },
    },
    run: (input, args) => {
      returnInput(input);
      output = creatOutputDiv('What do you want to edit?' + args);
      returnOutput(output, outputDelay[0]);
    },
  },
  ph: {
    meta: false,
    name: 'Phagocytose',
    description: 'Remove something from the system.',
    run: (input) => {
      returnInput(input);
      output = creatOutputDiv('Kill that cell!');
      returnOutput(output, outputDelay[0]);
    },
  },
  new: {
    meta: true,
    name: 'New cell',
    description: 'Get started.',
    run: (input) => {
      returnInput(input);
      output = creatOutputDiv('init command');
      returnOutput(output, outputDelay[0]);
    },
  },
  r: {
    meta: true,
    name: 'Reset',
    description: 'Reset the system... a fresh start.',
    run: (input) => {
      returnInput(input);
      output = creatOutputDiv('reset command');
      returnOutput(output, outputDelay[0]);
    },
  },
  a: {
    meta: true,
    name: 'About',
    description: 'About this project.',
    run: (input) => {
      returnInput(input);
      output = creatOutputDiv('about command');
      returnOutput(output, outputDelay[0]);
    },
  },
};

// const commands = {
//   kill: (obj, mod) => {
//     // code to handle the "killer" command
//     let output = creatOutputDiv('kill command');
//     returnOutput(output, outputDelay[0]);
//   },
//   help: (obj, mod) => {
//     // code to handle the "helper" command
//     let output = creatOutputDiv('help command');
//     returnOutput(output, outputDelay[0]);
//   },
//   reg: (obj, mod) => {
//     // code to handle the "reg" command
//     let output = creatOutputDiv('reg command');
//     returnOutput(output, outputDelay[0]);
//   },
//   status: (obj, mod) => {
//     // code to handle the "status" command
//     let output = creatOutputDiv('status command');
//     returnOutput(output, outputDelay[0]);
//   },
//   reset: (obj, mod) => {
//     // code to handle the "reset" command
//     let output = creatOutputDiv('reset command');
//     returnOutput(output, outputDelay[0]);
//   },
// };

// const subcommands = {
//   make: (obj, mod) => {
//     console.log('make subcommand');
//   },
//   read: (obj, mod) => {
//     console.log('read subcommand');
//   },
//   phago: (obj, mod) => {
//     console.log('phagocytose subcommand');
//   },
// };

// --------------------------------------------------------------------------------------------

// const commands = {
//   innate: (obj, mod) => {
//     // code to handle the "innate" command
//     // check if args contains an innate immune system actor
//     if (obj in innate) {
//       let output = creatOutputDiv(innate[obj].description);
//       returnOutput(output, outputDelay[0]);
//       output = creatOutputDiv(innate[obj].action);
//       returnOutput(output, outputDelay[1]);
//     } else {
//       let output = creatOutputDiv(nullThread);
//       returnOutput(output, 0);
//     }
//   },
//   adapt: (obj, mod) => {
//     // code to handle the "adapt" command
//     // check if args contains an adaptive immune system actor
//     if (obj in adaptive) {
//       let output = creatOutputDiv(adaptive[obj].description);
//       returnOutput(output, outputDelay[0]);
//       output = creatOutputDiv(adaptive[obj].action);
//       returnOutput(output, outputDelay[1]);
//     } else {
//       let output = creatOutputDiv(nullThread);
//       returnOutput(output, 0);
//     }
//   },
//   help: () => {
//     // code to handle the meta commands
//     let output = creatOutputDiv(helpThread);
//     returnOutput(output, 0);
//   },
//   status: () => {
//     // code to show status
//     let output = creatOutputDiv(statusThread);
//     returnOutput(output, 0);
//   },
// };
