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

const status = {
  health: 100,
  infection: 0,
  infectionRate: 0,
  infectionRateMax: 100,
  infectionRateMin: 0,
};

// --- COMMANDS ---

const commands = {
  check: {
    name: 'Check',
    description: 'Evaluate or interpret something in the system.',
    subcommands: {
      mhc: {
        name: 'MHC',
        description: 'Major histocompatibility complex (MHC) molecules are cell surface proteins that present antigens to T cells.',
        run: (obj, mod) => {
          let output = creatOutputDiv('check mhc' + obj[0] + obj[1] + mod);
          returnOutput(output, outputDelay[0]);
        },
      },
      status: {
        name: 'Status',
        description: 'Evaluate the status of something in the system.',
        run: (obj, mod) => {
          let output = creatOutputDiv('check status' + obj[0] + obj[1] + mod);
          returnOutput(output, outputDelay[0]);
        },
      },
    },
    run: () => {
      let output = creatOutputDiv('What do you want to check?');
      returnOutput(output, outputDelay[0]);
    },
  },
  kill: {
    name: 'Kill',
    description: 'Remove something from the system.',
    subcommands: {
      invader: {
        name: 'Foreign pathogen',
        description: 'Remove pathogen from the system.',
        run: (obj, mod) => {
          let output = creatOutputDiv('phagocytose command');
          returnOutput(output, outputDelay[0]);
        },
      },
    },
    run: () => {
      let output = creatOutputDiv('What do you want to kill?');
      returnOutput(output, outputDelay[0]);
    },
  },
  reg: {
    name: 'Regulate',
    description: 'Suppress or incite immune response.',
    subcommands: {
      up: {
        name: 'Up',
        description: 'Incite immune response.',
        run: (obj, mod) => {
          let output = creatOutputDiv('regulate up command');
          returnOutput(output, outputDelay[0]);
        },
      },
      down: {
        name: 'Down',
        description: 'Suppress immune response.',
        run: (obj, mod) => {
          let output = creatOutputDiv('regulate down command');
          returnOutput(output, outputDelay[0]);
        },
      },
    },
    run: () => {
      let output = creatOutputDiv('What do you want to regulate?');
      returnOutput(output, outputDelay[0]);
    },
  },
  mem: {
    name: 'Remember',
    description: 'Remember antigen.',
    subcommands: {
      antigen: {
        name: 'Antigen',
        description: 'Remember antigen.',
        run: (obj, mod) => {
          let output = creatOutputDiv('remember antigen command');
          returnOutput(output, outputDelay[0]);
        },
      },
    },
    run: () => {
      let output = creatOutputDiv('What do you want to remember?');
      returnOutput(output, outputDelay[0]);
    },
  },
  arm: {
    name: 'Arm',
    description: 'Arm immune system.',
    subcommands: {
      local: {
        name: 'Local',
        description: 'Arm local region by upsurging bloodflow and secreting proteins to attract immune cells.',
        run: (obj, mod) => {
          let output = creatOutputDiv('arm local command');
          returnOutput(output, outputDelay[0]);
        },
      },
    },
    run: () => {
      let output = creatOutputDiv('What do you want to arm?');
      returnOutput(output, outputDelay[0]);
    },
  },
  '-h': {
    name: 'Help',
    description: 'Get help.',
    run: () => {
      // Add input to thread
      let output = creatOutputDiv('-h');
      output.classList.add('cmd');
      returnOutput(output, 0);
      // Add output to thread
      output = creatOutputDiv('help command');
      returnOutput(output, outputDelay[0]);
    },
  },
  '-reset': {
    name: 'Reset',
    description: 'Reset system and start fresh.',
    run: () => {
      // Reset thread
      thread.innerHTML = defaultThread;
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