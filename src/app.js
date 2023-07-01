// --- DOM VARIABLES ---

let container = document.querySelector('.container');
let cliContainer = document.querySelector('.cli-container');
let thread = document.querySelector('.thread');
let cli = document.querySelector('.cli-input-text');
let suggestion = document.querySelector('.suggestion');
let cursor = document.querySelector('.cursor');

// --- FOCUS ON EDITOR ---

cli.focus();

// Listening for click and focusing on editor
document.body.addEventListener('click', function (e) {
  cli.focus();
});

// --- MANAGING FALSE CURSOR ---

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
    }
  });
}

hideCursor(cli);

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

let pathogen;

// --- COMMANDS ---

const commands = {
  innate: (obj, mod) => {
    // code to handle the "innate" command
    thread.innerHTML = 'you wrote innate ' + obj + ' ' + mod;
  },
  adapt: (obj, mod) => {
    // code to handle the "adapt" command
    thread.innerHTML = 'you wrote adapt ' + obj + ' ' + mod;
  },
  mem: (args) => {
    // code to handle the "memory" command
    thread.innerHTML = 'you wrote mem ' + args;
  },
  help: () => {
    // code to handle the "help" command
    thread.innerHTML = 'you wrote help';
  },
  clear: () => {
    // code to handle the "clear" command
    thread.innerHTML = 'Hi there. Run a command or use -h for help.';
  },
  new: (obj, mod) => {
    // check if args contains a pathogen
    if (obj in pathogens) {
      thread.innerHTML = 'you wrote new ' + obj + ' ' + mod;
    } else {
      thread.innerHTML = "Hmm, I'm not following. Did you try using a command?";
    }
  },
};

// --- DEFAULT THREADS ---

const nullthread = `<div class="cli-thread-text">Hmm I'm not following. Did you try using a command?</div>`;

// --- OUTPUTS ---

function returnOutput(output, time) {
  setTimeout(() => {
    thread.appendChild(output);
  }, time);
}

// --- ADDING EVENT LISTENERS FOR COMMANDS ---

let input = '';

// Listening for input and setting input variable
cli.addEventListener('input', function () {
  input = this.innerText;
});

// Clear editor if user presses enter, refocus on editor, and show fake cursor
function clearCLI() {
  cli.innerText = '';
  cli.focus();
  cursor.style.display = 'inline-flex';
}

// Listening for command and executing function when user presses enter
cli.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (input !== '') {
      let parts = input.split(' ');
      let command = parts[0];
      let args = parts.slice(1);
      if (commands[command]) {
        // split args into object and modifier where modifier is anything that starts with "--"
        let modifier = args.filter((arg) => arg.startsWith('--'));
        let objectArray = args.filter((arg) => !arg.startsWith('--'));
        let object = objectArray.join(' ');
        commands[command](object, modifier);
        clearCLI();
      } else {
        thread.innerHTML = nullthread;
        clearCLI();
      }
    }
  }
});
