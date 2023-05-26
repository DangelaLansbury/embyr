let container = document.querySelector('#container');
let cliContainer = document.querySelector('#cliContainer');
let prompt = document.querySelector('#cliPrompt');
let cli = document.querySelector('#cli');
let cliSuggest = document.querySelector('#cliSuggest');
let cursor = document.querySelector('#cursor');

// focus on CLI editor at start

cli.focus();

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
    name: 'innate',
    active: false,
    color: '#FABD2F',
  },
  {
    name: 'adapt',
    active: false,
    color: '#D3869B',
  },
];

// --- DEFAULT PROMPTS ---

const defaultPrompt = `<div class="cli-prompt-text">Hi there. What would you like to do?</div>`;
const defaultPlaceholder = `Run a command or use -h for help`;
const commandList = `<div class="cli-prompt-text">Here are some commands you can run:</div>
  <div class="examples">
    <span style="color: ${commands[0].color}">innate</span> - Access innate immune system tools
    <br />
    <span style="color: ${commands[1].color}">adapt</span> - Access adaptive immune system tools
  </div>
  <div class="cli-prompt-text">So, what do you want to do?</div>`;
const commandExamples = '';
const nullPrompt = `<div class="cli-prompt-text">Hmm I'm not following. Did you try using a command?</div>`;

// --- OUTPUTS ---

const output00 = document.createElement('div');

const output01 = document.createElement('div');
output01.innerHTML = `<div class="cli-prompt-text">Something happens</div>`;
const output02 = document.createElement('div');
output02.innerHTML = `<div class="cli-prompt-text">Something else happens</div>`;
const output03 = document.createElement('div');
output03.innerHTML = `<div class="cli-prompt-text">This is the outcome of what happened</div>`;

function returnOutputs() {
  setTimeout(() => {
    prompt.appendChild(output00);
  }, 300);
  setTimeout(() => {
    prompt.appendChild(output01);
  }, 450);
  setTimeout(() => {
    prompt.appendChild(output02);
  }, 600);
  setTimeout(() => {
    prompt.appendChild(output03);
  }, 900);
  setTimeout(() => {
    cliContainer.style.display = 'flex';
    cli.focus();
  }, 1000);
}

// --- ADDING EVENT LISTENERS ---

// Listening for click and focusing on editor
document.body.addEventListener('click', function (e) {
  cli.focus();
});

// Listening for command and set to true if present
function listenForCommand(elem) {
  elem.addEventListener('input', function () {
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorContent = editor.innerText.toLowerCase();
    commands.forEach((command) => (editorContent.includes(command.name) ? (command.active = true) : (command.active = false)));
  });
}

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

// Clear editor if user presses enter, refocus on editor, and show fake cursor
function clearEditor(elem) {
  elem.innerText = '';
  elem.focus();
  cursor.style.display = 'inline-flex';
}

// Listening for enter key and executing commands
function listenForEnter(elem) {
  elem.addEventListener('keydown', function (e) {
    cliSuggest.innerHTML = '';
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorValue = editor.innerText;
    let editorContent = editorValue.toLowerCase().trim();
    if (e.keyCode === 13 && editorContent !== '') {
      e.preventDefault();
      command = editorContent;
      commandOutput = editorValue;
      console.log(editorID, editorValue, editorContent);
      let commandsPresent = commands.filter(function (command) {
        return command.active;
      });
      commandsPresent.forEach((command) => (commandOutput = commandOutput.replace(command.name, `<span style="color: ${command.color}">${command.name}</span>`)));
      if (editorContent == '-c') {
        prompt.innerHTML = `<div class="cli-user-input">${commandOutput}</div> ${commandList}`;
        editor.innerText = '';
        cli.focus();
      } else if (editorContent == '-h') {
        // trigger link to open modal
        document.querySelector('#stamp').click();
        editor.innerText = '';
      } else if (editorContent == '-e') {
        prompt.innerHTML = `<div class="cli-user-input">${commandOutput}</div> ${commandExamples}`;
        editor.innerText = '';
        cli.focus();
      } else if (editorContent == '-r') {
        prompt.innerHTML = defaultPrompt;
        editor.innerText = '';
        commands.forEach((command) => (command.active = false));
        cli.focus();
      } else if (commandsPresent.length == 0) {
        prompt.innerHTML = nullPrompt;
        editor.innerText = '';
        cli.focus();
      } else {
        cliContainer.style.display = 'none';
        prompt.innerHTML = `<div class="cli-user-input">${commandOutput}</div>`;
        output00.innerHTML = `<div class="cli-prompt-text">Immune system respone:</div>`;
        output01.innerHTML = `<div class="cli-prompt-text">Searching for ${commandOutput}...</div>`;
        output02.innerHTML = `<div class="cli-prompt-text">Here's a relevant piece of info.</div>`;
        output03.innerHTML = `<div class="cli-prompt-text">And here's what that means for the system.</div>`;
        returnOutputs();
        clearEditor(cli);
      }
      return;
    } else {
      return;
    }
  });
}

// --- RUNNING FUNCTIONS ---
hideCursor(cli);
listenForCommand(cli);
listenForEnter(cli);
listenForBackspace(cli);

// -h -e -c -r -doc
