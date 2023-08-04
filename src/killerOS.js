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
  chk: {
    meta: false,
    nickname: 'chk',
    name: 'Check',
    title: 'Check characteristics',
    description: 'Evaluate or interpret something in the system.',
    keywords: ['detect', 'evaluate', 'interpret', 'check', 'see', 'mhc', 'class i', 'class 1', 'class one', 'histocompatibility', 'histocompatibility complex', 'self', 'peptide', 'antigen'],
    icon: 'magnifying-glass',
    arguments: {
      mhc: {
        name: 'mhc',
        description: 'Detect MHC class I molecules to check for self.',
        return: 'mhc',
      },
      peptide: {
        name: 'peptide',
        description: 'Detect peptides to check for altered self.',
        return: 'peptide',
      },
      '.': {
        name: '.',
        description: 'Detect both MHC class I molecules and peptides to check for self and altered self.',
        return: 'mhc peptide',
      },
    },
    run: (input, arg) => {
      returnInput(input);
      let output = creatOutputDiv('You have successfully detected ' + arg + '.');
      returnOutput(output, outputDelay[1]);
    },
  },
  exp: {
    meta: false,
    nickname: 'exp',
    name: 'Express',
    title: 'Express chimeric antigen receptor',
    description: 'Express protein or molecule.',
    keywords: ['express', 'receptor', 'protein', 'molecule', 'chimeric', 'antigen', 'car', 'a-folate', 'cd', 'cd19', 'cd20', 'cd22', 'cd30', 'cd33', 'egfr', 'gd2', 'her2', 'l1cam', 'l1', 'adhesion', 'kill', 'seek', 'find', 'ninja', 'hunt'],
    icon: 'killer-t-cell',
    arguments: {
      'a-folate': {
        name: 'a-folate',
        description: 'Express chimeric antigen receptor to activate T cell against a-folate.',
        return: 'You have successfully expressed CAR against a-folate.',
      },
      CD_: {
        name: 'CD_',
        description: 'Express chimeric antigen receptor to activate T cell against CD19, CD20, CD22, CD30, etc.',
        return: 'You have successfully expressed CAR against CD19, CD20, CD22, CD30, etc.',
      },
      EGFR: {
        name: 'EGFR',
        description: 'Express chimeric antigen receptor to activate T cell against EGFR.',
        return: 'You have successfully expressed CAR against EGFR.',
      },
      GD2: {
        name: 'GD2',
        description: 'Express chimeric antigen receptor to activate T cell against GD2.',
        return: 'You have successfully expressed CAR against GD2.',
      },
      HER2: {
        name: 'HER2',
        description: 'Express chimeric antigen receptor to activate T cell against HER2.',
        return: 'You have successfully expressed CAR against HER2.',
      },
      L1CAM: {
        name: 'L1CAM',
        description: 'Express chimeric antigen receptor to activate T cell against L1 cell adhesion molecule.',
        return: 'You have successfully expressed CAR against L1 cell adhesion molecule.',
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
        returnOutput(output, 0);
        populateSuggestion(`new antigen ${arg}`, 'third-level');
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
    title: 'Inhibit checkpoint',
    description: 'Inhibit checkpoint.',
    keywords: ['inhibit', 'checkpoint', 'pd-1', 'ctla-4', 'kill', 'activate', 'rage', 'berserker'],
    icon: 'inhibit',
    arguments: {
      'PD-1': {
        name: 'PD-1',
        description: 'Inhibit PD-1 to prevent it from binding to PD-L1 and preventing T cell activation.',
        return: 'You have successfully inhibited PD-1.',
      },
      'CTLA-4': {
        name: 'CTLA-4',
        description: 'Inhibit CTLA-4 to prevent it from binding to CD80 and preventing T cell activation.',
        keywords: ['ctla-4', 'ctla4', 'cd80'],
        return: 'You have successfully inhibited CTLA-4.',
      },
    },
    run: (input, arg) => {
      returnInput(input);
      let output = creatOutputDiv('You have successfully inhibited ' + arg + '.');
      returnOutput(output, outputDelay[1]);
    },
  },
  new: {
    meta: true,
    nickname: 'new',
    name: 'Create new',
    title: 'Create new data object',
    description: 'Create something new.',
    keywords: ['new', 'create', 'make'],
    icon: 'plus',
    arguments: {
      antigen: {
        name: 'antigen',
        description: 'Create a new antigen.',
        return: 'You have successfully created a new antigen.',
      },
    },
    run: (input, arg) => {
      returnInput(input);
      let output = creatOutputDiv('created new antigen called ' + arg);
      returnOutput(output, outputDelay[0]);
    },
  },
  clear: {
    meta: true,
    nickname: 'clear',
    name: 'Clear changes',
    title: 'Reset system',
    description: 'Reset the system... a fresh start.',
    keywords: ['reset', 'clear', 'restart', 'refresh'],
    icon: 'undo',
    arguments: {
      _receptors: {
        name: '_receptors',
        description: 'Reset receptors.',
        return: 'You have successfully reset receptors.',
      },
      _inhibitors: {
        name: '_inhibitors',
        description: 'Reset inhibitors.',
        return: 'You have successfully reset inhibitors.',
      },
    },
    run: (input, arg) => {
      thread.innerHTML = '';
    },
  },
  help: {
    meta: true,
    nickname: 'help',
    name: 'More help',
    title: 'Help',
    description: 'Get help.',
    keywords: ['about', 'project', 'zetsu', 'immune system', 'immunity', 'commands', 'info'],
    icon: 'info-circle',
    arguments: {
      _zetsu: {
        name: 'zetsu',
        description: 'About Zetsu.',
        return: `<div class="thread-text">A reimagined terminal experience to orchestrate Killer T Cells</div>
          <div class="thread-text small">Fuzzy search executables as you type. Don't remember a command or argument? Try describing it.</div>
          <div class="thread-text small"><span style="color: var(--lilac)">Ninja</span>: hunt down and kill specific threats. Use <span style="color: var(--sweetgrass)">exp</span> to express chimeric antigen receptors so cancel cells can't hide.</div>
          <div class="thread-text small"><span style="color: var(--honey)">Berserker</span>: open up a can of whoopass on all they asses. Use <span style="color: var(--sweetgrass)">inh</span> to prevent cancer cells from mellowing you out.</div>
          <div class="thread-text stone small">-- Not what you're looking for? Check out <a href="https://github.com/DangelaLansbury/zetsu">the docs</a> for more info.</div>`,
      },
    },
    run: () => {
      thread.innerHTML = '';
      let output = document.createElement('div');
      output.innerHTML = `
        <div class="logo-container">
          <div class="logo">
            <img src="public/images/logo.svg" class="logo-svg" alt="logo" />
            <div class="logo-text">
              <h1>Zetsu</h1>
            </div>
          </div>
        </div>
        <div class="thread-block">
          ${commands['help'].arguments._zetsu.return}
        </div>
        `;
      returnOutput(output, 0);
    },
  },
};
