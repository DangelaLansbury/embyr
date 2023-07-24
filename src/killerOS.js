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
    name: 'Detect',
    description: 'Evaluate or interpret something in the system.',
    chains: {
      'det .': {
        name: 'Detect MHC class I and peptide',
        description: 'Check MHC class I molecules and peptides at the same time to see if cell is of self and if it is infected.',
        tags: ['green', 'blue', 'red'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('check mhc peptide');
          returnOutput(output, outputDelay[1]);
        },
      },
      'det mhc': {
        name: 'Detect MHC class I',
        description: 'Check MHC class I molecules to see if cell is of self.',
        tags: ['blue'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('check mhc');
          returnOutput(output, outputDelay[1]);
        },
      },
      'det peptide': {
        name: 'Detect peptide',
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
  exp: {
    meta: false,
    name: 'express',
    description: 'Express protein or molecule.',
    chains: {
      'exp car': {
        name: 'Express CAR',
        description: 'Express chimeric antigen receptors to activate T cell.',
        tags: ['crimson'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('You have successfully activated proteinA.');
          returnOutput(output, outputDelay[1]);
        },
      },
      run: (input, args) => {
        returnInput(input);
        output = creatOutputDiv('What do you want to activate?' + args);
        returnOutput(output, outputDelay[0]);
      },
    },
  },
  inh: {
    meta: false,
    name: 'Inhibit',
    description: 'Inhibit checkpoint.',
    chains: {
      'inh PD-1': {
        name: 'Inhibit PD-1',
        description: 'Inhibit PD-1 to prevent it from binding to PD-L1 and preventing T cell activation.',
        tags: ['purple'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('You have successfully inhibited PD-1.');
          returnOutput(output, outputDelay[1]);
        },
      },
      'inh CTLA4': {
        name: 'Inhibit CTLA-4',
        description: 'Inhibit CTLA-4 to prevent it from binding to CD80 and preventing T cell activation.',
        tags: ['indigo'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('You have successfully inhibited CTLA-4.');
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
    chains: {
      ph: {
        name: 'Phagocytose',
        description: 'Phagocytose something.',
        tags: ['amber'],
        run: (input) => {
          returnInput(input);
          let output = creatOutputDiv('You have successfully phagocytosed something.');
          returnOutput(output, outputDelay[1]);
        },
      },
    },
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
    chains: null,
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
    chains: null,
    run: (input) => {
      returnInput(input);
      output = creatOutputDiv('reset command');
      returnOutput(output, outputDelay[0]);
    },
  },
  '&': {
    meta: true,
    name: 'About',
    description: 'About this project.',
    chains: null,
    run: (input) => {
      returnInput(input);
      output = creatOutputDiv('about command');
      returnOutput(output, outputDelay[0]);
    },
  },
};
