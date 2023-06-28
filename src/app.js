// --- DOM VARIABLES ---

let container = document.querySelector('#container');
let cliContainer = document.querySelector('#cliContainer');
let prompt = document.querySelector('#cliPrompt');
let cli = document.querySelector('#cli');
let cliSuggest = document.querySelector('#cliSuggest');
let cursor = document.querySelector('#cursor');

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
    prompt.innerHTML = 'you wrote innate ' + args;
  },
  adapt: (args) => {
    // code to handle the "adapt" command
    prompt.innerHTML = 'you wrote adapt ' + args;
  },
  memory: (args) => {
    // code to handle the "memory" command
    prompt.innerHTML = 'you wrote memory ' + args;
  },
  help: () => {
    // code to handle the "help" command
    prompt.innerHTML = 'you wrote help';
  },
  clear: () => {
    // code to handle the "clear" command
    prompt.innerHTML = 'you wrote clear';
  },
  new: (args) => {
    // code to handle the "new" command
    prompt.innerHTML = 'you wrote new ' + args;
  },
};

// --- DEFAULT PROMPTS ---

const nullPrompt = `<div class="cli-prompt-text">Hmm I'm not following. Did you try using a command?</div>`;

// --- OUTPUTS ---

const output00 = document.createElement('div');

const output01 = document.createElement('div');
output01.innerHTML = `<div class="cli-prompt-text">Something happens</div>`;
const output02 = document.createElement('div');
output02.innerHTML = `<div class="cli-prompt-text">Something else happens</div>`;
const output03 = document.createElement('div');
output03.innerHTML = `<div class="cli-prompt-text">This is the outcome of what happened</div>`;

function returnOutput(output, time) {
  setTimeout(() => {
    prompt.appendChild(output);
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
        prompt.innerHTML = nullPrompt;
      }
    }
  }
});

// --- Old Code ---

// // commands
// let command = '';
// const commands = [
//   {
//     name: 'new',
//     active: false,
//     color: '#83A598',
//   },
//   {
//     name: 'env',
//     active: false,
//     color: '#FD6D5C',
//   },
//   {
//     name: 'status',
//     active: false,
//     color: '#FABD2F',
//   },
// ];

// // arguments
// let arg = '';
// const args = [
//   {
//     type: 'new',
//     arg: ['virus', 'bacteria', 'fungus', 'parasite'],
//   },
//   {
//     type: 'env',
//     arg: ['radiation', 'stress', 'injury', 'heat', 'cold'],
//   },
//   {
//     type: 'status',
//     arg: ['innate', 'adaptive'],
//   },
// ];

// // modifiers
// let modifier = '';
// const modifiers = [
//   {
//     type: 'new',
//     modifier: ['--infectious', '--noninfectious'],
//   },
//   {
//     type: 'env',
//     modifier: ['--acute', '--chronic'],
//   },
// ];

// // Listening for command and set to true if present
// cli.addEventListener('input', function () {
//   let editorID = this.id;
//   let editorContent = document.getElementById(editorID).innerText.toLowerCase();
//   // remove first word from editor string and check if it matches a command
//   let editorFirstWord = editorContent.split(' ')[0];
//   let commandsPresent = commands.filter(function (command) {
//     return command.name == editorFirstWord;
//   });
//   if (commandsPresent.length > 0) {
//     commandsPresent.forEach((command) => (command.active = true));
//   } else {
//     commands.forEach((command) => (command.active = false));
//   }
// });

// // --- EXECUTING COMMANDS ---

// // Listening for enter key and executing commands
// cli.addEventListener('keydown', function (e) {
//   cliSuggest.innerHTML = '';
//   let editorID = this.id;
//   let editor = document.getElementById(editorID);
//   let editorValue = editor.innerText;
//   let editorContent = editorValue.toLowerCase().trim();
//   if (e.keyCode === 13 && editorContent !== '') {
//     e.preventDefault();
//     commandOutput = editorContent;
//     console.log(editorID, editorValue, editorContent);
//     let commandsPresent = commands.filter(function (command) {
//       return command.active;
//     });
//     commandsPresent.forEach((command) => (commandOutput = commandOutput.replace(command.name, `<span style="color: ${command.color}">${command.name}</span>`)));
//     if (editorContent == '-c') {
//       prompt.innerHTML = `<div class="cli-user-input">${commandOutput}</div> ${commandList}`;
//       clearCLI();
//     } else if (editorContent == '-h') {
//       // trigger link to open modal
//       document.querySelector('#stamp').click();
//       clearCLI();
//     } else if (editorContent == '-r') {
//       prompt.innerHTML = `<div class="cli-prompt-text">Hi there. Run a command or use -h for help.</div>`;
//       commands.forEach((command) => (command.active = false));
//       clearCLI();
//     } else if (commandsPresent.length == 0) {
//       prompt.innerHTML = nullPrompt;
//       clearCLI();
//     } else {
//       cliContainer.style.display = 'none';
//       prompt.innerHTML = `<div class="cli-user-input">${commandOutput}</div>`;
//       output00.innerHTML = `<div class="cli-prompt-text">Immune system respone:</div>`;
//       output01.innerHTML = `<div class="cli-prompt-text">Searching for ${commandOutput}...</div>`;
//       output02.innerHTML = `<div class="cli-prompt-text">Here's a relevant piece of info.</div>`;
//       output03.innerHTML = `<div class="cli-prompt-text">And here's what that means for the system.</div>`;
//       returnOutput(output00, 300);
//       returnOutput(output01, 450);
//       returnOutput(output02, 600);
//       returnOutput(output03, 900);
//       setTimeout(() => {
//         cliContainer.style.display = 'flex';
//         cli.focus();
//       }, 1000);
//       clearCLI();
//     }
//     return;
//   } else {
//     return;
//   }
// });
