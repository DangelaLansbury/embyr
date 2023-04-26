let cli = document.querySelector('#cli');
let prompt = document.querySelector('#cliPrompt');
let commandLine = document.querySelector('#commandLine');
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

const defaultPrompt = `<span style="color: #8ec07c">&rsaquo;</span> <span style="color: #fabd2f">Namaste</span>. Welcome to
<span style="color: #8ec07c">Zetsu</span>.
<br />
<span style="color: #8ec07c">&rsaquo;</span> With the time you have, what do you want to do?`;
const defaultPlaceholder = `Run a command or write 'h' for help`;
const commandList = `<span style="color: #8ec07c">&rsaquo;</span> Here are some commands you can use:
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
const commandExamples = `<span style="color: #8ec07c">&rsaquo;</span> Some examples to inspire you:
<div class="examples">
  <span style="color: #d3869b">connect</span> with my granddaughter
  <span style="color: #fabd2f">learn</span> Chinese
  <br />
  <span style="color: #b8bb26">achieve</span> finishing my novel
  <br />
  <span style="color: #8ec07c">contribute</span> to conservation
  <span style="color: #fd6d5c">explore</span> the outdoors
 </div>
<span style="color: #8ec07c">&rsaquo;</span> So, with the time you have, what do you want to do?`;

// --- OUTPUTS ---

const output01 = document.createElement('div');
output01.innerHTML = `<span style="color: #8ec07c">&rsaquo;</span> Output 01`;
const output02 = document.createElement('div');
output02.innerHTML = `<span style="color: #8ec07c">&rsaquo;</span> Output 02`;
const output03 = document.createElement('div');
output03.innerHTML = `<span style="color: #8ec07c">&rsaquo;</span> Output 03`;

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
    let editorContent = editorValue.toLowerCase().trim();
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
        editor.placeholder = `Run a command or write 'e' for examples`;
      } else if (editorContent == 'e') {
        prompt.innerHTML = commandExamples;
        editor.value = '';
        editor.placeholder = `Try running a command or write 'h' for help`;
      } else if (editorContent == '~') {
        prompt.innerHTML = defaultPrompt;
        editor.value = '';
        editor.placeholder = defaultPlaceholder;
        commands.forEach((command) => (command.active = false));
      } else if (commandsPresent.length == 0) {
        prompt.innerHTML = `<span style="color: #8ec07c">&rsaquo;</span> Hmm I'm not following. Did you try using a command?`;
        editor.value = '';
      } else {
        commandLine.style.display = 'none';
        prompt.innerHTML = `<span style="color: #8ec07c">&rsaquo;</span> ${commandOutput}`;
        setTimeout(() => {
          prompt.appendChild(output01);
        }, 500);
        setTimeout(() => {
          prompt.appendChild(output02);
        }, 1000);
        setTimeout(() => {
          prompt.appendChild(output03);
        }, 1500);
        setTimeout(() => {
          commandLine.style.display = 'flex';
          cliEditor.focus();
        }, 1600);
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
