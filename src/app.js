let cliBlock = document.querySelector('#cliBlock');
let prompt = document.querySelector('#cliPrompt');
let cliEditor = document.querySelector('#cliEditor');
let cliBlockHelp = document.querySelector('#cliBlockHelp');
let cliHelp = document.querySelector('#cliHelp');

// --- STATE MANAGEMENT ---

let init = true;
let user = '';
let diagnosis = false;
let disease = '';

// commands

const commands = [
  {
    name: 'help',
    active: false,
    color: '#83A598',
  },
  {
    name: 'achieve',
    active: false,
    color: '#B8BB26',
  },
  {
    name: 'connect',
    active: false,
    color: '#D3869B',
  },
  {
    name: 'contribute',
    active: false,
    color: '#8EC07C',
  },
  {
    name: 'explore',
    active: false,
    color: '#FD6D5C',
  },
  {
    name: 'learn',
    active: false,
    color: '#FABD2F',
  },
];

// focus on CLI editor at start

cliEditor.focus();

// --- ADDING EVENT LISTENERS ---

// Listening for command and changing color of text

function listenForCommand(elem) {
  elem.addEventListener('input', function () {
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorContent = editor.value.toLowerCase();
    if (!init && !diagnosis) {
      if (editorContent === commands[0].name) {
        editor.style.color = commands[0].color;
        commands[0].active = true;
      } else if (editorContent.includes(commands[1].name)) {
        commands[1].active = true;
      } else if (editorContent.includes(commands[2].name)) {
        commands[2].active = true;
      } else if (editorContent.includes(commands[3].name)) {
        commands[3].active = true;
      } else if (editorContent.includes(commands[4].name)) {
        commands[4].active = true;
      } else if (editorContent.includes(commands[5].name)) {
        commands[5].active = true;
      } else {
        editor.style.color = '#ebdbb2';
        commands.forEach((command) => (command.active = false));
      }
      return commands;
    } else {
      return;
    }
  });
}

// Listening for enter key and executing commands
function listenForEnter(elem) {
  elem.addEventListener('keydown', function (e) {
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorContent = editor.value.toLowerCase();
    if (e.keyCode === 13 && editorContent !== '') {
      e.preventDefault();
      if (init) {
        user = editor.value;
        prompt.innerHTML = `Hello, <span style="color: #83A598">${user}</span>. Can you describe your diagnosis?`;
        editor.value = '';
        editor.placeholder = 'Cancer type and stage...';
        editor.style.color = '#ebdbb2';
        init = false;
        diagnosis = true;
      } else if (diagnosis) {
        disease = editorContent;
        prompt.innerHTML = `With the time you have, what do you want to do?`;
        editor.value = '';
        editor.placeholder = 'Start with a command...';
        editor.style.color = '#ebdbb2';
        diagnosis = false;
      } else {
        if (commands[0].active) {
          cliBlockHelp.classList.toggle('hidden');
          cliHelp.focus();
          editor.style.color = '#ebdbb2';
        } else if (commands[1].active) {
          prompt.innerText = `You wrote ${commands[1].name}`;
          editor.value = '';
          editor.placeholder = `${commands[1].name} follow up`;
          editor.style.color = '#ebdbb2';
        } else if (commands[2].active) {
          prompt.innerText = `You wrote ${commands[2].name}`;
          editor.value = '';
          editor.placeholder = `${commands[2].name} follow up`;
          editor.style.color = '#ebdbb2';
        } else if (commands[3].active) {
          prompt.innerText = `You wrote ${commands[3].name}`;
          editor.value = '';
          editor.placeholder = `${commands[3].name} follow up`;
          editor.style.color = '#ebdbb2';
        } else if (commands[4].active) {
          prompt.innerText = `You wrote ${commands[4].name}`;
          editor.value = '';
          editor.placeholder = `${commands[4].name} follow up`;
          editor.style.color = '#ebdbb2';
        } else if (commands[5].active) {
          prompt.innerText = `You wrote ${commands[5].name}`;
          editor.value = '';
          editor.placeholder = `${commands[5].name} follow up`;
          editor.style.color = '#ebdbb2';
        } else if (editorContent === 'restart') {
          init = true;
          diagnosis = false;
          disease = '';
          prompt.innerHTML = `Namaste. Welcome to <span style="color: #8ec07c">Zetsu</span>.
              What can I call you?`;
          editor.style.color = '#ebdbb2';
          editor.value = '';
          editor.placeholder = 'Write your preferred name...';
          commands.forEach((command) => (command.active = false));
        } else {
          prompt.innerText =
            "Hmm I don't understand. Write help for a list of commands.";
          editor.value = '';
          editor.style.color = '#ebdbb2';
        }
      }
    } else {
      return;
    }
  });
}

listenForEnter(cliEditor);
listenForCommand(cliEditor);

// ------------------------------

const artisanWords = [
  'work',
  'create',
  'build',
  'make',
  'finish',
  'develop',
  'produce',
  'engineer',
  'craft',
];
const sentimentalistWords = [
  'love',
  'loved',
  'care',
  'help',
  'support',
  'serve',
  'nurture',
  'teach',
  'mentor',
  'coach',
  'counsel',
  'guide',
  'protect',
  'family',
  'friend',
  'community',
  'money',
];
const adventurerWords = [
  'explore',
  'travel',
  'visit',
  'hike',
  'world',
  'mountain',
  'fitness',
  'workout',
  'sports',
  'play',
  'taste',
  'experience',
];

// Path: zetsu-00/public/src/book.js
