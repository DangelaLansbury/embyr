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

// --- COMMANDS ---

const commands = {
  innate: (args) => {
    // code to handle the "innate" command
    // split args into object and modifier where modifier is anything that starts with "--"
    let modifier = args.filter((arg) => arg.startsWith('--'));
    let objectArray = args.filter((arg) => !arg.startsWith('--'));
    let object = objectArray.join(' ');
    thread.innerHTML = 'you wrote innate ' + object + ' ' + modifier;
  },
  adapt: (args) => {
    // code to handle the "adapt" command
    // split args into object and modifier where modifier is anything that starts with "--"
    let modifier = args.filter((arg) => arg.startsWith('--'));
    let objectArray = args.filter((arg) => !arg.startsWith('--'));
    let object = objectArray.join(' ');
    thread.innerHTML = 'you wrote adapt ' + object + ' ' + modifier;
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
  new: (args) => {
    // code to handle the "new" command
    thread.innerHTML = 'you wrote new ' + args;
  },
};

// --- DEFAULT threadS ---

const nullthread = `<div class="cli-thread-text">Hmm I'm not following. Did you try using a command?</div>`;

// --- OUTPUTS ---

const output00 = document.createElement('div');

const output01 = document.createElement('div');
output01.innerHTML = `<div class="thread-text">Something happens</div>`;
const output02 = document.createElement('div');
output02.innerHTML = `<div class="thread-text">Something else happens</div>`;
const output03 = document.createElement('div');
output03.innerHTML = `<div class="thread-text">This is the outcome of what happened</div>`;

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
      console.log(command, args);
      if (commands[command]) {
        commands[command](args);
        clearCLI();
      } else {
        thread.innerHTML = nullthread;
        clearCLI();
      }
    }
  }
});
