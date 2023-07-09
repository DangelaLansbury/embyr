// --- DOM VARIABLES ---

let container = document.querySelector('.container');
let zetsuContainer = document.querySelector('.zetsu-container');
let thread = document.querySelector('.thread');
let zetsu = document.querySelector('.zetsu-input-text');
let cursor = document.querySelector('.cursor');
let suggestionsContainer = document.querySelector('.suggestions-container');

// --- FOCUS ON EDITOR ---

window.onload = () => {
  thread.innerHTML = defaultThread;
};

zetsu.focus();

// Listening for click and focusing on editor
document.body.addEventListener('click', function (e) {
  zetsu.focus();
});

// --- MANAGING FAKE CURSOR ---

// Hide fake cursor once user starts typing
function hideCursor(elem) {
  elem.addEventListener('input', function () {
    if (this.innerText !== '') {
      cursor.style.display = 'none';
    } else {
      cursor.style.display = 'inline-flex';
    }
  });
  elem.addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && this.innerText.toString().trim().length == 1) {
      this.innerText = '';
      cursor.style.display = 'inline-flex';
      suggestionsContainer.innerHTML = '';
    }
  });
}

hideCursor(zetsu);

// --- PATHOGENS ---

// Pathogens object
const pathogens = {
  virus: {
    name: 'virus',
    description: 'A virus is a submicroscopic infectious agent that replicates only inside the living cells of an organism. Viruses infect all types of life forms, from animals and plants to microorganisms, including bacteria and archaea.',
    symptoms:
      'Symptoms of viral infections include: Fever, Muscle ache, Fatigue, Coughing, Sneezing, Runny nose, Watery eyes, Sore throat, Nausea, Vomiting, Diarrhea, Loss of appetite, Rash, Depression, Irritability, Hallucinations, Paralysis, Coma, Death',
    transmission:
      'Viruses can be transmitted in a variety of ways. Some viruses can spread through touch, saliva, or even the air. Other viruses can be transmitted through sexual contact or by sharing contaminated needles. Insects including ticks and mosquitoes can act as "vectors," transmitting a virus from one host to another.',
    treatment: 'Treatment of viral infections focuses on supportive care, such as getting enough rest and drinking plenty of fluids. Antiviral medications that inhibit viral reproduction are available for some viral infections.',
    prevention: 'The best way to prevent a viral infection is to avoid being exposed to the virus. There are vaccines available for many viral infections such as measles, chickenpox, hepatitis A and B, and human papillomavirus (HPV).',
  },
  bacteria: {
    name: 'bacteria',
    description:
      'Bacteria are microscopic, single-celled organisms that thrive in diverse environments. These organisms can live in soil, the ocean and inside the human gut. Humans’ relationship with bacteria is complex. Sometimes they lend a helping hand, by curdling milk into yogurt, or helping with our digestion. At other times they are destructive, causing diseases like pneumonia and MRSA.',
    symptoms:
      'Symptoms of bacterial infections vary depending on the type of bacterial infection, the area of the body that is infected, and other factors, such as age and health history. Symptoms may include: swelling, redness, or pain, pus or fluid, fever, chills, fatigue, skin rash, and muscle aches.',
    transmission:
      'Bacteria can be transmitted in a variety of ways. Some bacteria can spread through touch, saliva, or even the air. Other bacteria can be transmitted through sexual contact or by sharing contaminated needles. Insects including ticks and mosquitoes can act as "vectors," transmitting a bacteria from one host to another.',
    treatment: 'Treatment of bacterial infections focuses on supportive care, such as getting enough rest and drinking plenty of fluids. Antibiotics that inhibit bacterial reproduction are available for some bacterial infections.',
    prevention: 'The best way to prevent a bacterial infection is to avoid being exposed to the bacteria. There are vaccines available for some bacterial infections such as tetanus, diphtheria, pertussis, and pneumococcus.',
  },
  fungus: {
    name: 'fungus',
    description:
      'Fungi are one of the five kingdoms of life. They are neither plants nor animals. Instead, they range from mushrooms to yeasts, to molds and even mildews. Fungi are eukaryotic organisms. This means that their cells have a nucleus. They also have cell walls, which are made of chitin. Fungi are heterotrophs. This means that they cannot make their own food. Instead, they get their nutrients from other organisms. Fungi are decomposers. They break down dead organic matter and return nutrients to the soil. They also help plants absorb water and nutrients from the soil.',
    symptoms:
      'Symptoms of fungal infections vary depending on the type of fungal infection, the area of the body that is infected, and other factors, such as age and health history. Symptoms may include: swelling, redness, or pain, pus or fluid, fever, chills, fatigue, skin rash, and muscle aches.',
    transmission:
      'Fungi can be transmitted in a variety of ways. Some fungi can spread through touch, saliva, or even the air. Other fungi can be transmitted through sexual contact or by sharing contaminated needles. Insects including ticks and mosquitoes can act as "vectors," transmitting a fungi from one host to another.',
    treatment: 'Treatment of fungal infections focuses on supportive care, such as getting enough rest and drinking plenty of fluids. Antifungal medications that inhibit fungal reproduction are available for some fungal infections.',
    prevention: 'The best way to prevent a fungal infection is to avoid being exposed to the fungi. There are vaccines available for some fungal infections such as tetanus, diphtheria, pertussis, and pneumococcus.',
  },
  parasite: {
    name: 'parasite',
    description:
      'A parasite is an organism that lives on or in a host organism and gets its food from or at the expense of its host. There are three main classes of parasites that can cause disease in humans: protozoa, helminths, and ectoparasites.',
    symptoms:
      'Symptoms of parasitic infections vary depending on the type of parasitic infection, the area of the body that is infected, and other factors, such as age and health history. Symptoms may include: swelling, redness, or pain, pus or fluid, fever, chills, fatigue, skin rash, and muscle aches.',
    transmission:
      'Parasites can be transmitted in a variety of ways. Some parasites can spread through touch, saliva, or even the air. Other parasites can be transmitted through sexual contact or by sharing contaminated needles. Insects including ticks and mosquitoes can act as "vectors," transmitting a parasite from one host to another.',
    treatment:
      'Treatment of parasitic infections focuses on supportive care, such as getting enough rest and drinking plenty of fluids. Antiparasitic medications that inhibit parasitic reproduction are available for some parasitic infections.',
    prevention: 'The best way to prevent a parasitic infection is to avoid being exposed to the parasite. There are vaccines available for some parasitic infections such as tetanus, diphtheria, pertussis, and pneumococcus.',
  },
  prion: {
    name: 'prion',
    description:
      'Prions are infectious agents composed entirely of a protein material that can fold in multiple, structurally abstract ways, at least one of which is transmissible to other prion proteins, leading to disease in a manner that is epidemiologically comparable to the spread of viral infection.',
    symptoms:
      'Symptoms of prion infections vary depending on the type of prion infection, the area of the body that is infected, and other factors, such as age and health history. Symptoms may include: swelling, redness, or pain, pus or fluid, fever, chills, fatigue, skin rash, and muscle aches.',
    transmission:
      'Prions can be transmitted in a variety of ways. Some prions can spread through touch, saliva, or even the air. Other prions can be transmitted through sexual contact or by sharing contaminated needles. Insects including ticks and mosquitoes can act as "vectors," transmitting a prion from one host to another.',
    treatment: 'Treatment of prion infections focuses on supportive care, such as getting enough rest and drinking plenty of fluids. Antiprion medications that inhibit prion reproduction are available for some prion infections.',
    prevention: 'The best way to prevent a prion infection is to avoid being exposed to the prion. There are vaccines available for some prion infections such as tetanus, diphtheria, pertussis, and pneumococcus.',
  },
};

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

// --- COMMANDS ---

const commands = {
  innate: (obj, mod) => {
    // code to handle the "innate" command
    // check if args contains an innate immune system actor
    if (obj in innate) {
      let output = creatOutputDiv(innate[obj].description);
      returnOutput(output, outputDelay[0]);
      output = creatOutputDiv(innate[obj].action);
      returnOutput(output, outputDelay[1]);
    } else {
      let output = creatOutputDiv(nullThread);
      returnOutput(output, 0);
    }
  },
  adapt: (obj, mod) => {
    // code to handle the "adapt" command
    // check if args contains an adaptive immune system actor
    if (obj in adaptive) {
      let output = creatOutputDiv(adaptive[obj].description);
      returnOutput(output, outputDelay[0]);
      output = creatOutputDiv(adaptive[obj].action);
      returnOutput(output, outputDelay[1]);
    } else {
      let output = creatOutputDiv(nullThread);
      returnOutput(output, 0);
    }
  },
  zetsu: () => {
    // code to handle the meta commands
    let output = creatOutputDiv(helpThread);
    returnOutput(output, 0);
  },
};

// --- DEFAULTS ---

const defaultThread = `<div class="thread-text">Hi there. Welcome to zetsu.</div>`;

const nullThread = `<div class="thread-text">Shoot, I don't recognize that command. You can use h to see the commands I know.</div>`;

// --- OUTPUTS ---

const creatOutputDiv = (text) => {
  let output = document.createElement('div');
  output.className = 'thread-text';
  output.innerHTML = text;
  return output;
};

const returnOutput = (output, time) => {
  setTimeout(() => {
    thread.appendChild(output);
    // Scroll to bottom of thread
    thread.scrollTop = thread.scrollHeight;
  }, time);
};

const outputDelay = [600, 800, 1000, 1200, 1400, 1600, 1800, 2000];

// --- ADDING EVENT LISTENERS FOR COMMANDS ---

let input = '';

// Listening for input and setting input variable
zetsu.addEventListener('input', function () {
  input = this.innerText;
});

// Populating suggestions container with suggestions based on input and remove suggestions if input if user deletes input
zetsu.addEventListener('input', function () {
  suggestionsContainer.innerHTML = '';
  for (let command in commands) {
    // check if a command contains the input letters
    if (command.includes(input)) {
      let suggestion = document.createElement('div');
      suggestion.className = 'suggestion';
      suggestion.innerHTML = command;
      suggestionsContainer.appendChild(suggestion);
    }
  }
  // Set first suggestion as active
  let suggestions = document.querySelectorAll('.suggestion');
  suggestions[0].classList.add('active');
  // Listening for up and down arrow keys to cycle through suggestions
  let suggestionIndex = 0;
  zetsu.addEventListener('keydown', function (e) {
    if (e.keyCode === 38) {
      // Up arrow
      e.preventDefault();
      suggestions[suggestionIndex].classList.remove('active');
      suggestionIndex--;
      if (suggestionIndex < 0) {
        suggestionIndex = suggestions.length - 1;
      }
      suggestions[suggestionIndex].classList.add('active');
    }
    if (e.keyCode === 40) {
      // Down arrow
      e.preventDefault();
      suggestions[suggestionIndex].classList.remove('active');
      suggestionIndex++;
      if (suggestionIndex > suggestions.length - 1) {
        suggestionIndex = 0;
      }
      suggestions[suggestionIndex].classList.add('active');
    }
  });
  // Listening for tab key to autocomplete suggestion
  zetsu.addEventListener('keydown', function (e) {
    if (e.keyCode === 9) {
      e.preventDefault();
      zetsu.innerText = suggestions[suggestionIndex].innerText;
      // Set cursor to end of text
      let range = document.createRange();
      let sel = window.getSelection();
      range.setStart(zetsu.childNodes[0], zetsu.innerText.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      // Remove suggestions
      suggestionsContainer.innerHTML = '';
    }
  });
});

// Clear editor if user presses enter, refocus on editor, and show fake cursor
const clearzetsu = () => {
  zetsu.innerText = '';
  zetsu.focus();
  cursor.style.display = 'inline-flex';
};

// Listening for command and executing function when user presses enter
zetsu.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (input !== '') {
      console.log(thread.lastChild.innerHTML);
      if (thread.innerHTML === defaultThread) {
        thread.innerHTML = '';
      }
      // Split input into command and args
      input = input.toLowerCase().trim();
      let parts = input.split(' ');
      let command = parts[0];
      let args = parts.slice(1);
      if (commands[command]) {
        // Add input to thread
        let output = creatOutputDiv(input);
        output.classList.add('cmd');
        returnOutput(output, 0);
        // Split args into object and modifier where modifier is anything that starts with "-"
        let modifier = args.filter((arg) => arg.startsWith('-'));
        let objectArray = args.filter((arg) => !arg.startsWith('-'));
        let object = objectArray.join(' ');
        // Run command
        commands[command](object, modifier);
        clearzetsu();
      } else {
        // Add input to thread
        let output = creatOutputDiv(input);
        output.classList.add('cmd');
        returnOutput(output, 0);
        // Add nullThread to thread
        returnOutput(creatOutputDiv(nullThread), 0);
        clearzetsu();
      }
    }
  }
});
