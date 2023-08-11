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
  normalCells: {
    self: true,
    altered: false,
    visibleToKillers: false,
    immuneBrakes: true,
  },
  solidTumorCells: {
    self: true,
    altered: true,
    visibleToKillers: false,
    immuneBrakes: false,
  },
  liquidTumorCells: {
    self: true,
    altered: true,
    visibleToKillers: true,
    immuneBrakes: true,
  },
  foreignCells: {
    self: false,
    altered: false,
    visibleToKillers: true,
    immuneBrakes: false,
  },
};

// --- COMMANDS ---

const commands = {
  x: {
    meta: false,
    nickname: 'x',
    name: 'Express',
    title: 'Express chimeric antigen receptor',
    description: 'Express protein or molecule.',
    keywords: ['express', 'receptor', 'protein', 'molecule', 'chimeric', 'antigen', 'car', 'a-folate', 'cd', 'cd19', 'cd20', 'cd22', 'cd30', 'cd33', 'egfr', 'gd2', 'her2', 'l1cam', 'l1', 'adhesion', 'show', 'display', 'add'],
    icon: 'sparkles',
    suggestions: {
      default: {
        command: 'x car',
        description: 'Express chimeric antigen receptor.',
        return: 'You have successfully expressed chimeric antigen receptor.',
      },
    },
    run: (input, arg) => {
      returnInput(input);
      let argResult = 'You have successfully expressed CAR against ' + arg + '.';
      clearZetsu();
      let output = creatOutputDiv(argResult);
      returnOutput(output, outputDelay[1]);
    },
  },
  i: {
    meta: false,
    nickname: 'i',
    name: 'Inhibit',
    title: 'Inhibit checkpoint',
    description: 'Inhibit checkpoint.',
    keywords: ['inhibit', 'block', 'prevent', 'checkpoint', 'pd-1', 'ctla-4', 'activate', 'bind', 'binding'],
    icon: 'inhibit',
    suggestions: {
      default: {
        command: 'i checkpoint',
        description: 'Inhibit checkpoint.',
        return: 'You have successfully inhibited checkpoint.',
      },
    },
    run: (input, arg) => {
      returnInput(input);
      let output = creatOutputDiv('You have successfully inhibited ' + arg + '.');
      returnOutput(output, outputDelay[1]);
    },
  },
  sd: {
    meta: false,
    nickname: 'sd',
    name: 'Search & Destroy',
    title: 'Find and kill antigens',
    description: 'Search the system for antigens and phagocytose them.',
    keywords: [
      'detect',
      'evaluate',
      'interpret',
      'look',
      'see',
      'mhc',
      'class i',
      'class 1',
      'class one',
      'histocompatibility',
      'histocompatibility complex',
      'self',
      'peptide',
      'antigen',
      'search',
      'destroy',
      'kill',
      'phagocytosis',
      'phagocytose',
      'eat',
    ],
    icon: 'magnifying-glass',
    suggestions: {
      default: {
        command: 'sd',
        description: 'Search the system for antigens and phagocytose them.',
        return: 'You have successfully searched the system for antigens and phagocytosed them.',
      },
    },
    run: (input, arg) => {
      returnInput(input);
      let output = creatOutputDiv('You have successfully checked mhc + peptide.');
      returnOutput(output, outputDelay[1]);
    },
  },
  // restore: {
  //   meta: true,
  //   nickname: 'restore',
  //   name: 'Revert state',
  //   title: 'Restore',
  //   description: 'Revert to previous receptor or inhibitor state',
  //   keywords: ['restore', 'revert', 'version', 'history', 'go back'],
  //   icon: 'undo',
  //   suggestions: {
  //     default: {
  //       command: 'restore',
  //       description: 'Revert to previous receptor or inhibitor state.',
  //       return: 'You have successfully reverted to previous receptor or inhibitor state.',
  //     },
  //   },
  //   run: (input, arg) => {
  //     thread.innerHTML = '';
  //   },
  // },
  clear: {
    meta: true,
    nickname: 'clear',
    name: 'Reset all',
    title: 'Clear thread and reset system',
    description: 'Reset the system... a fresh start.',
    keywords: ['reset', 'clear', 'restart', 'refresh', 'start over', 'reset all'],
    icon: 'undo',
    suggestions: {
      default: {
        command: 'clear',
        description: 'Reset the system... a fresh start.',
        return: 'You have successfully reset the system.',
      },
    },
    run: (input, arg) => {
      thread.innerHTML = '';
    },
  },
  h: {
    meta: true,
    nickname: 'h',
    name: 'More help',
    title: 'Help',
    description: 'Get help.',
    keywords: ['h', 'help', 'about', 'project', 'zetsu', 'immune system', 'immunity', 'commands', 'info'],
    icon: 'info-circle',
    suggestions: {
      default: {
        command: 'h',
        description: 'Get help.',
        return: 'You have successfully gotten help.',
      },
    },
    run: () => {
      thread.innerHTML = '';
      let output = document.createElement('div');
      output.innerHTML = `
        <div class="thread-block">
          <div class="thread-text">A reimagined terminal experience to orchestrate Killer T Cells</div>
          <div class="thread-text small">Fuzzy search executables as you type. Don't remember a command or argument? Try describing it.</div>
          <div class="thread-text small"><span style="color: var(--lilac)">Ninja</span>: hunt down and kill specific threats. Use <span style="color: var(--sweetgrass)">exp</span> to express chimeric antigen receptors so cancel cells can't hide.</div>
          <div class="thread-text small"><span style="color: var(--honey)">Berserker</span>: open up a can of whoopass on all they asses. Use <span style="color: var(--sweetgrass)">inh</span> to prevent cancer cells from mellowing you out.</div>
          <div class="thread-text stone small">-- Not what you're looking for? Check out <a href="https://github.com/DangelaLansbury/zetsu">the docs</a> for more info.</div>
        </div>
        `;
      returnOutput(output, 0);
    },
  },
};
