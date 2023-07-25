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
  targetIsSelf: true,
  targetIsAltered: false,
  tCellActive: false,
};

// --- COMMANDS ---

const commands = {
  det: {
    meta: false,
    nickname: 'det',
    name: 'Detect',
    title: 'Detect characteristics',
    description: 'Evaluate or interpret something in the system.',
    arguments: [
      {
        name: 'mhc',
        description: 'Detect MHC class I molecules to check for self.',
        return: 'mhc',
      },
      {
        name: 'peptide',
        description: 'Detect peptides to check for altered self.',
        return: 'peptide',
      },
      {
        name: '.',
        description: 'Detect both MHC class I molecules and peptides to check for self and altered self.',
        return: 'mhc peptide',
      },
    ],
    run: (input, arg) => {
      returnInput(input);
      // let result = commands['det'].arguments.find((argument) => argument.name === arg);
      let output = creatOutputDiv('You have successfully detected ' + arg + '.');
      returnOutput(output, outputDelay[1]);
    },
  },
  car: {
    meta: false,
    nickname: 'CAR',
    name: 'Express CAR',
    title: 'Express Chimeric antigen receptor',
    description: 'Express protein or molecule.',
    arguments: {
      CD19: {
        name: 'CD19',
        description: 'Express chimeric antigen receptor to activate T cell against CD19.',
        return: 'You have successfully expressed CAR against CD19.',
      },
      CD20: {
        name: 'CD20',
        description: 'Express chimeric antigen receptor to activate T cell against CD20.',
        return: 'You have successfully expressed CAR against CD20.',
      },
      CD22: {
        name: 'CD22',
        description: 'Express chimeric antigen receptor to activate T cell against CD22.',
        return: 'You have successfully expressed CAR against CD22.',
      },
      CD30: {
        name: 'CD30',
        description: 'Express chimeric antigen receptor to activate T cell against CD30.',
        return: 'You have successfully expressed CAR against CD30.',
      },
      BCMA: {
        name: 'BCMA',
        description: 'Express chimeric antigen receptor to activate T cell against BCMA.',
        return: 'You have successfully expressed CAR against BCMA.',
      },
    },
    run: (input, arg) => {
      returnInput(input);
      let argResult;
      for (let argument in commands['car'].arguments) {
        if (commands['car'].arguments[argument].name.toLowerCase() === arg.toLowerCase()) {
          argResult = commands['car'].arguments[argument].return;
        }
      }
      if (argResult === undefined) {
        clearZetsu();
        let output = creatOutputDiv(`I don't know this antigen. If I've missed it, you can create a new one.`);
        returnOutput(output, outputDelay[1]);
        displaySuggestion(`new antigen ${arg}`, 'third-level');
        suggestions = document.querySelectorAll('.suggestion');
      } else {
        clearZetsu();
        let output = creatOutputDiv(argResult);
        returnOutput(output, outputDelay[1]);
      }
    },
  },
  inh: {
    meta: false,
    nickname: 'inh',
    name: 'Inhibit',
    description: 'Inhibit checkpoint.',
    arguments: {
      'PD-1': {
        name: 'PD-1',
        description: 'Inhibit PD-1 to prevent it from binding to PD-L1 and preventing T cell activation.',
        return: 'You have successfully inhibited PD-1.',
      },
      'CTLA-4': {
        name: 'CTLA-4',
        description: 'Inhibit CTLA-4 to prevent it from binding to CD80 and preventing T cell activation.',
        return: 'You have successfully inhibited CTLA-4.',
      },
    },
    run: (input, arg) => {
      returnInput(input);
      let output = creatOutputDiv('You have successfully inhibited ' + arg + '.');
      returnOutput(output, outputDelay[1]);
    },
  },
  ph: {
    meta: false,
    nickname: 'ph',
    name: 'Phagocytose',
    description: 'Munch this cell right up.',
    arguments: null,
    run: (input) => {
      returnInput(input);
      let output = creatOutputDiv('You have successfully phagocytosed target cell.');
      returnOutput(output, outputDelay[1]);
    },
  },
  new: {
    meta: true,
    nickname: 'new',
    name: 'New object',
    description: 'Create something new.',
    arguments: [
      {
        name: 'antigen',
        description: 'Create a new antigen.',
        return: 'You have successfully created a new antigen.',
      },
    ],
    run: (input, arg) => {
      returnInput(input);
      output = creatOutputDiv('created new antigen called ' + arg);
      returnOutput(output, outputDelay[0]);
    },
  },
  r: {
    meta: true,
    nickname: 'r',
    name: 'Reset',
    description: 'Reset the system... a fresh start.',
    arguments: null,
    run: (input) => {
      returnInput(input);
      output = creatOutputDiv('reset command');
      returnOutput(output, outputDelay[0]);
    },
  },
  a: {
    meta: true,
    nickname: 'a',
    name: 'About',
    description: 'About this project.',
    arguments: null,
    run: (input) => {
      returnInput(input);
      output = creatOutputDiv('about command');
      returnOutput(output, outputDelay[0]);
    },
  },
};

const chains = {
  'det . => % "alteredSelf" "true" $ ph : quit': {
    name: 'Detect MHC class I and peptide and phagocytose if altered self',
    description: 'Check MHC class I molecules and peptides at the same time to see if cell is of part of own body and if it is infected. If it is infected, phagocytose the cell.',
    tags: ['mhc', 'class i', 'class 1', 'class one', 'class-one', 'histocompatibility', 'histocompatibility complex', 'self', 'peptide', 'peptides', 'antigen', 'antigens', 'phagocytose', 'phagocytosis'],
    run: (input) => {
      returnInput(input);
      let output = creatOutputDiv('check mhc peptide and phagocytose if altered self');
      returnOutput(output, outputDelay[1]);
    },
  },
};
