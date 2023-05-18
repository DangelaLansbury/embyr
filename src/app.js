let cli = document.querySelector('#cli');
let prompt = document.querySelector('#cliPrompt');
let commandLine = document.querySelector('#commandLine');
let cliEditor = document.querySelector('#cliEditor');
let cliInput = document.querySelector('#cliInputText');
let cliSuggest = document.querySelector('#cliSuggest');
let initExamples = document.querySelector('#initExamples');

// focus on CLI editor at start

cliInput.focus();

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
    name: 'ii',
    active: false,
    color: '#FABD2F',
  },
  {
    name: 'aa',
    active: false,
    color: '#D3869B',
  },
];

// --- DEFAULT PROMPTS ---

const defaultPrompt = `<div class="cli-prompt-text">Hi there. What would you like to do?</div>`;
const defaultPlaceholder = `Run a command or use -h for help`;
const commandList = `<div class="cli-prompt-text">Here are some commands you can run:</div>
  <div class="examples">
    <span style="color: #b8bb26">ii</span> - Access innate immune system tools
    <br />
    <span style="color: #d3869b">aa</span> - Access adaptive immune system tools
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
    commandLine.style.display = 'flex';
    cliInput.focus();
  }, 1000);
}

// --- ADDING EVENT LISTENERS ---

// Listening for click and focusing on editor in firefox and safari
document.body.addEventListener('click', function (e) {
  e.preventDefault();
  cliInput.focus();
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

// Listening for keydown and adding whitespace if backspace is pressed to empty editor
function listenForBackspace(elem) {
  elem.addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && this.innerText.toString().trim().length == 1) {
      this.innerHTML = '&nbsp;';
    }
  });
}

// Listening for input and suggesting commands
// function listenForInput(elem) {
//   elem.addEventListener('input', function (e) {
//     let editorID = this.id;
//     let editor = document.getElementById(editorID);
//     let editorValue = editor.innerText;
//     let editorContent = editorValue.toLowerCase();
//     if (editorContent.startsWith('a')) {
//       cliSuggest.innerHTML = `<div class="cli-suggest-text">chieve</div>`;
//     } else if (editorContent.startsWith('c')) {
//       cliSuggest.innerHTML = `<div class="cli-suggest-text">onnect</div>`;
//     } else if (editorContent.startsWith('cont')) {
//       cliSuggest.innerHTML = `<div class="cli-suggest-text">ribute</div>`;
//     } else if (editorContent.startsWith('e')) {
//       cliSuggest.innerHTML = `<div class="cli-suggest-text">xplore</div>`;
//     } else if (editorContent.startsWith('l')) {
//       cliSuggest.innerHTML = `<div class="cli-suggest-text">earn</div>`;
//     } else {
//       cliSuggest.innerHTML = '';
//     }
//   });
// }

// Listening for tab key and accepting suggestion
// function listenForTab(elem) {
//   elem.addEventListener('keydown', function (e) {
//     let editorID = this.id;
//     let editor = document.getElementById(editorID);
//     let editorValue = editor.innerText;
//     let suggestion = cliSuggest.innerText;
//     if (e.keyCode === 9 && suggestion !== '') {
//       e.preventDefault();
//       editor.innerText = '';
//       editor.innerText = editorValue + suggestion;
//       cliSuggest.innerHTML = '';
//       let editorContent = editor.innerText.toLowerCase();
//       commands.forEach((command) => (editorContent.includes(command.name) ? (command.active = true) : (command.active = false)));
//       // Add focus to end of editor after tab
//       let range = document.createRange();
//       let sel = window.getSelection();
//       range.setStart(editor.childNodes[0], editor.innerText.length);
//       range.collapse(true);
//       sel.removeAllRanges();
//       sel.addRange(range);
//       editor.focus();
//     }
//   });
// }

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
      initExamples.classList.add('hidden');
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
        cliInput.focus();
      } else if (editorContent == '-h') {
        // trigger link to open modal
        document.querySelector('#stamp').click();
        editor.innerText = '';
      } else if (editorContent == '-e') {
        prompt.innerHTML = `<div class="cli-user-input">${commandOutput}</div> ${commandExamples}`;
        editor.innerText = '';
        cliInput.focus();
      } else if (editorContent == '-r') {
        prompt.innerHTML = defaultPrompt;
        editor.innerText = '';
        commands.forEach((command) => (command.active = false));
        cliInput.focus();
      } else if (commandsPresent.length == 0) {
        prompt.innerHTML = nullPrompt;
        editor.innerText = '';
        cliInput.focus();
      } else {
        commandLine.style.display = 'none';
        prompt.innerHTML = `<div class="cli-user-input">${commandOutput}</div>`;
        output00.innerHTML = `<div class="cli-prompt-text">Immune system respone:</div>`;
        output01.innerHTML = `<div class="cli-prompt-text">Searching for ${commandOutput}...</div>`;
        output02.innerHTML = `<div class="cli-prompt-text">Here's a relevant piece of info.</div>`;
        output03.innerHTML = `<div class="cli-prompt-text">And here's what that means for the system.</div>`;
        returnOutputs();
        editor.innerText = '';
      }
      return;
    } else {
      return;
    }
  });
}

// --- RUNNING FUNCTIONS ---
listenForCommand(cliInput);
listenForEnter(cliInput);
listenForBackspace(cliInput);

// -h -e -c -r -doc
