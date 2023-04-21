let cliBlock = document.querySelector('#cliBlock');
let prompt = document.querySelector('#cliPrompt');
let cliEditor = document.querySelector('#cliEditor');
let cliBlockHelp = document.querySelector('#cliBlockHelp');
let cliHelp = document.querySelector('#cliHelp');

// focus on CLI editor at start

cliEditor.focus();

// --- STATE MANAGEMENT ---

let init = false;
let user = '';
let diagnosis = false;
let disease = '';
let sideEffects = [];
let treatments = [];

// commands

let command = '';

const commands = [
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

// --- DEFAULT PROMPTS ---

const defaultPrompt = `<span style="color: #8ec07c">&rsaquo;</span> Namaste. Welcome to
<span style="color: #8ec07c">Zetsu</span>.
<br />
<span style="color: #8ec07c">&rsaquo;</span> With the time you have, what do you want to do?`;

const commandList = `<span style="color: #8ec07c">&rsaquo;</span> Here are some commands you can use...
<br />
<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #B8BB26">achieve</span> - Success, accomplishment, recognition
<br />
<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #D3869B">connect</span> - Meaningful relationships and networks
<br />
<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #8EC07C">contribute</span> - New ideas and a positive impact
<br />
<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #FD6D5C">explore</span> - Discovery and adventure
<br />
<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #FABD2F">learn</span> - Knowledge and personal growth
<br />
<span style="color: #8ec07c">&rsaquo;</span> So, with the time you have, what do you want to do?`;

const commandExamples = `<span style="color: #8ec07c">&rsaquo;</span> Here are some examples. You may use multiple commands at once...
<br />
<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #B8BB26">achieve</span> finishing my novel
<br />
<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #D3869B">connect</span> with my daughter at her father-daughter dance.
<br />
<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #8EC07C">contribute</span> to conservation efforts
<br />
<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #FD6D5C">explore</span> Yosemite
<br />
<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #FABD2F">learn</span> Chinese
<br />
<span style="color: #8ec07c">&rsaquo;</span> So, with the time you have, what do you want to do?`;

// --- ADDING EVENT LISTENERS ---

// Listening for click and focusing on editor in firefox and safari

document.body.addEventListener('click', function (e) {
  cliEditor.focus();
});

// Listening for command and changing color of text

function listenForCommand(elem) {
  elem.addEventListener('input', function () {
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorContent = editor.value.toLowerCase();
    commands.forEach((command) =>
      editorContent.includes(command.name)
        ? (command.active = true)
        : (command.active = false)
    );
  });
}

// Listening for enter key and executing commands
function listenForEnter(elem) {
  elem.addEventListener('keydown', function (e) {
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorValue = editor.value;
    let editorContent = editor.value.toLowerCase().trim();
    if (e.keyCode === 13 && editorContent !== '') {
      e.preventDefault();
      command = editorContent;
      commandOutput = editorValue;
      let commandsPresent = commands.filter(function (command) {
        return command.active;
      });
      commandsPresent.forEach(
        (command) =>
          (commandOutput = commandOutput.replace(
            command.name,
            `<span style="color: ${command.color}">${command.name}</span>`
          ))
      );
      if (editorContent == 'h') {
        prompt.innerHTML = commandList;
        editor.value = '';
        editor.placeholder = `Start with a command. Write 'e' for examples.`;
      } else if (editorContent == 'e') {
        prompt.innerHTML = commandExamples;
        editor.value = '';
        editor.placeholder = `Start with a command. Write 'h' for help.`;
      } else if (editorContent == 'restart') {
        prompt.innerHTML = defaultPrompt;
        editor.value = '';
        commands.forEach((command) => (command.active = false));
      } else if (commandsPresent.length == 0) {
        prompt.innerHTML = `<span style="color: #8ec07c">&rsaquo;</span> Hmm I'm not following. Did you try using a command?`;
        editor.value = '';
      } else {
        prompt.innerHTML = `<span style="color: #8ec07c">&rsaquo;</span> ${commandOutput}<br><span style="color: #8ec07c">&rsaquo;</span> Here are some things to think about`;
        editor.value = '';
        editor.placeholder = `Start a new command. Write 'h' for help.`;
      }
      return;
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
