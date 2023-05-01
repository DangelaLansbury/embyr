let cli = document.querySelector('#cli');
let prompt = document.querySelector('#cliPrompt');
let commandLine = document.querySelector('#commandLine');
let cliEditor = document.querySelector('#cliEditor');
let cliInput = document.querySelector('#cliInputText');

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

const defaultPrompt = `<div class="cli-prompt-text">Namaste. Welcome to Zetsu.</div>
  <div class="cli-prompt-text">With the time you have, what do you want to do?</div>`;
const defaultPlaceholder = `Run a command or use -h for help`;
const commandList = `<div class="cli-prompt-text">Here are some commands you can run:</div>
  <div class="examples">
    <span style="color: #b8bb26">achieve</span> - Success, accomplishment, recognition
    <br />
    <span style="color: #d3869b">connect</span> - Meaningful relationships and networks
    <br />
    <span style="color: #8ec07c">contribute</span> - New ideas and a positive impact
    <br />
    <span style="color: #fd6d5c">explore</span> - Discovery and adventure
    <br />
    <span style="color: #fabd2f">learn</span> - Knowledge and personal growth
  </div>
  <div class="cli-prompt-text">So, what do you want to do?</div>`;
const commandExamples = `<div class="cli-prompt-text">Here are some examples to inspire you:</div>
<div class="examples">
  <span style="color: #d3869b">connect</span> with my granddaughter
  <span style="color: #fabd2f">learn</span> Chinese
  <br />
  <span style="color: #b8bb26">achieve</span> finish my novel
  <br />
  <span style="color: #8ec07c">contribute</span> to conservation
  <span style="color: #fd6d5c">explore</span> the outdoors
</div>
<div class="cli-prompt-text">So, what do you want to do?</div>`;
const nullPrompt = `<div class="cli-prompt-text">Hmm I'm not following. Did you try using a command?</div>`;

// --- OUTPUTS ---

const output00 = document.createElement('div');
output00.innerHTML = `<div class="cli-prompt-text">Fresh-brewed templates to help plan care & realize goals:</div>`;
const output01 = document.createElement('div');
output01.innerHTML = `<div class="cli-prompt-text">Savor this flavorful <a href=''>Coda</a> template</div>`;
const output02 = document.createElement('div');
output02.innerHTML = `<div class="cli-prompt-text">Enjoy this rich and zesty <a href=''>Notion</a> template</div>`;
const output03 = document.createElement('div');
output03.innerHTML = `<div class="cli-prompt-text">Or give this silky smooth <a href=''>Markwhen</a> timeline a try</div>`;

// --- ADDING EVENT LISTENERS ---

// Listening for click and focusing on editor in firefox and safari

document.body.addEventListener('click', function (e) {
  cliInput.focus();
});

// Listening for command and changing color of text

function listenForCommand(elem) {
  elem.addEventListener('input', function () {
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorContent = editor.innerText.toLowerCase();
    commands.forEach((command) => (editorContent.includes(command.name) ? (command.active = true) : (command.active = false)));
    // let commandsPresent = commands.filter(function (command) {
    //   return command.active;
    // });
    // commandsPresent.forEach((command) => (editor.innerHTML = editor.innerHTML.replace(command.name, `<span style="color: ${command.color}">${command.name}</span>`)));
  });
}

// Listening for enter key and executing commands
function listenForEnter(elem) {
  elem.addEventListener('keydown', function (e) {
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorValue = editor.innerText;
    let editorContent = editorValue.toLowerCase().trim();
    if (e.keyCode === 13 && editorContent !== '') {
      e.preventDefault();
      command = editorContent;
      commandOutput = editorValue;
      let commandsPresent = commands.filter(function (command) {
        return command.active;
      });
      commandsPresent.forEach((command) => (commandOutput = commandOutput.replace(command.name, `<span style="color: ${command.color}">${command.name}</span>`)));
      if (editorContent == '-c') {
        prompt.innerHTML = `<div class="cli-user-input">${commandOutput}</div> ${commandList}`;
        editor.innerText = '';
        // editor.placeholder = `Write -e for examples or -h for more help`;
        cliInput.focus();
      } else if (editorContent == '-h') {
        // trigger link to open modal
        document.querySelector('#stamp').click();
        editor.innerText = '';
        // editor.placeholder = defaultPlaceholder;
      } else if (editorContent == '-e') {
        prompt.innerHTML = `<div class="cli-user-input">${commandOutput}</div> ${commandExamples}`;
        editor.innerText = '';
        // editor.placeholder = `Try running a command or write -h for help`;
        cliInput.focus();
      } else if (editorContent == '-r') {
        prompt.innerHTML = defaultPrompt;
        editor.innerText = '';
        // editor.placeholder = defaultPlaceholder;
        commands.forEach((command) => (command.active = false));
        cliInput.focus();
      } else if (commandsPresent.length == 0) {
        prompt.innerHTML = nullPrompt;
        editor.innerText = '';
        cliInput.focus();
      } else {
        commandLine.style.display = 'none';
        prompt.innerHTML = `<div class="cli-user-input">${commandOutput}</div>`;
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
        editor.innerText = '';
        // editor.placeholder = `Run a new command or write -h for help`;
      }
      return;
    } else {
      return;
    }
  });
}

listenForEnter(cliInput);
listenForCommand(cliInput);

// -h -e -c -r -doc
