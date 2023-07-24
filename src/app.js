// --- DOM VARIABLES ---

// Workbook components
let workbook = document.querySelector('.workbook'); // Main container
// Terminal components
let thread = document.querySelector('.thread'); // Thread container
let help1 = document.querySelector('#help1'); // Help container for first set of commands
let help2 = document.querySelector('#help2'); // Help container for second set of commands
// Zetsu components
let zetsuContainer = document.querySelector('.zetsu-container'); // Full Zetsu container for input, suggestions, and details
let zetsuInit = document.querySelector('.zetsu-init'); // Zetsu init content
let meetZetsu = document.querySelector('#meetZetsuHint'); // Meet Zetsu hint in init footer
let zetsuHelper = document.querySelector('.zetsu-helper'); // Zetsu suggestions and description container
// Zetsu input
let zetsu = document.querySelector('.zetsu-input-text'); // Zetsu input field
let cursor = document.querySelector('.cursor'); // Zetsu input fake cursor
// Suggestions and suggestion details
let suggestionsContainer = document.querySelector('.suggestions-container');
let suggestionsListContainer = document.querySelector('.suggestions-list-container');
let suggestionsList = document.querySelector('.suggestions-list');
let details = document.querySelector('.suggestion-details');
let detailsName = document.querySelector('.details-name');
let detailsDescription = document.querySelector('.details-description');
let suggestions = document.querySelectorAll('.suggestion');

// --- FOCUS ON EDITOR ---

window.onload = () => {
  zetsu.focus();
  displayHelpCommands(commands);
};

// Listening for click and focusing on editor
document.body.addEventListener('click', function (e) {
  zetsu.focus();
});

// --- HANDLE DELETING INPUT ---

zetsu.addEventListener('keydown', function (e) {
  if (e.key === 'Backspace' && this.innerText.toString().trim().length == 1) {
    this.innerText = '';
    cursor.style.display = 'inline-flex';
    suggestionsList.innerHTML = '';
    details.innerHTML = '';
    suggestions = [];
    if (thread.innerHTML === '') {
      zetsuHelper.classList.add('hidden');
      zetsuInit.classList.remove('hidden');
    }
  }
});

// --- DEFAULTS ---

const nullThread = `<div class="thread-text">Shoot, I don't recognize that command.</div>`;

// display suggestions and detail

const displaySuggestion = (command) => {
  let suggestion = document.createElement('div');
  suggestion.className = 'suggestion';
  suggestion.innerHTML = command;
  suggestionsList.appendChild(suggestion);
};

// populate help bar with commands
const displayHelpCommands = (commands) => {
  for (let command in commands) {
    let commandHint = document.createElement('div');
    commandHint.className = 'help-bar-hint';
    commandHint.innerHTML = `<div class="help-bar-cmd">${command}</div><div class="help-bar-text">${commands[command].name}</div>`;
    if (commands[command].meta === false) {
      help1.appendChild(commandHint);
    } else {
      help2.appendChild(commandHint);
    }
  }
};

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

// --- ADDING EVENT LISTENERS ---

// Listen for help toggle: '?'
zetsu.addEventListener('keydown', function (e) {
  if (e.key === '?') {
    e.preventDefault();
    if (help1.classList.contains('hidden') && help2.classList.contains('hidden')) {
      help1.classList.remove('hidden');
    } else if (!help1.classList.contains('hidden') && help2.classList.contains('hidden')) {
      help1.classList.add('hidden');
      help2.classList.remove('hidden');
    } else if (help1.classList.contains('hidden') && !help2.classList.contains('hidden')) {
      help2.classList.add('hidden');
    }
  }
});

// Populating suggestions container with suggestions based on input
zetsu.addEventListener('input', function () {
  let input = this.innerText;
  // Check if input is empty
  if (input !== '') {
    cursor.style.display = 'none';
    if (zetsuHelper.classList.contains('hidden')) {
      zetsuHelper.classList.remove('hidden');
      zetsuInit.classList.add('hidden');
    }
  }
  // Clear suggestions and details
  suggestionsList.innerHTML = '';
  details.innerHTML = '';
  for (let command in commands) {
    if (command.startsWith(input)) {
      // Create suggestion element
      displaySuggestion(command);
    }
  }
  if (suggestionsList.innerHTML === '') {
    displaySuggestion('Testing...');
  }
  // Listening for up and down arrow keys to cycle through suggestions
  suggestions = document.querySelectorAll('.suggestion');
  let suggestionIndex = -1;
  zetsu.addEventListener('keydown', function (e) {
    // Check if suggestions are present
    if (suggestions.length !== 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.remove('active');
        }
        suggestionIndex++;
        if (suggestionIndex > suggestions.length - 1) {
          suggestionIndex = -1;
          zetsu.innerText = input;
          details.innerHTML = '';
          // focus and move cursor to end of input
          let range = document.createRange();
          let sel = window.getSelection();
          range.setStart(zetsu.childNodes[0], zetsu.innerText.length);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.add('active');
          zetsu.innerText = suggestions[suggestionIndex].innerText;
          details.innerHTML = `<div class="details-name">${commands[suggestions[suggestionIndex].innerText].name}</div><div class="details-description">${commands[suggestions[suggestionIndex].innerText].description}</div>`;
          // Scroll to active suggestion
          suggestions[suggestionIndex].scrollIntoView({
            block: 'nearest',
            inline: 'end',
            behavior: 'smooth',
          });
          // focus and move cursor to end of input
          let range = document.createRange();
          let sel = window.getSelection();
          range.setStart(zetsu.childNodes[0], zetsu.innerText.length);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      } else if (e.key === 'ArrowUp' && input.trim().length !== 0) {
        e.preventDefault();
        if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.remove('active');
        }
        suggestionIndex--;
        if (suggestionIndex === -1) {
          zetsu.innerText = input;
          details.innerHTML = '';
          // focus and move cursor to end of input
          let range = document.createRange();
          let sel = window.getSelection();
          range.setStart(zetsu.childNodes[0], zetsu.innerText.length);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        if (suggestionIndex < -1) {
          suggestionIndex = suggestions.length - 1;
        }
        if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.add('active');
          zetsu.innerText = suggestions[suggestionIndex].innerText;
          details.innerHTML = `<div class="details-name">${commands[suggestions[suggestionIndex].innerText].name}</div><div class="details-description">${commands[suggestions[suggestionIndex].innerText].description}</div>`;
          // Scroll to active suggestion
          suggestions[suggestionIndex].scrollIntoView({
            block: 'nearest',
            inline: 'end',
            behavior: 'smooth',
          });
          // focus and move cursor to end of input
          let range = document.createRange();
          let sel = window.getSelection();
          range.setStart(zetsu.childNodes[0], zetsu.innerText.length);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    } else {
      suggestionIndex = -1;
    }
  });
  // Reset suggestion index when user presses space or continues to type or hits enter
  zetsu.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Backspace' || e.key === 'Enter') {
      suggestionIndex = -1;
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
    let input = zetsu.innerText;
    // Clear suggestions
    suggestionsList.innerHTML = '';
    details.innerHTML = '';
    suggestions = [];
    // Execute commands and return output
    if (input !== '') {
      // Split input into command and args
      input = input.toLowerCase().trim();
      let parts = input.split(' ');
      let command = parts[0];
      let subcommand = parts[1];
      let args = parts.slice(2);
      // Check if command exists
      if (commands[command]) {
        // Check if command has subcommands
        if (commands[command].subcommands) {
          // Check if user added subcommand
          if (subcommand === undefined) {
            // Add input to thread
            let output = creatOutputDiv(input);
            output.classList.add('cmd');
            returnOutput(output, 0);
            // Run command
            commands[command].run();
          } else {
            // check if subcommand exists
            if (commands[command].subcommands[subcommand]) {
              // Add input to thread
              let output = creatOutputDiv(input);
              output.classList.add('cmd');
              returnOutput(output, 0);
              // Split args into object and modifier where modifier is anything that starts with "--"
              let modifier = args.filter((arg) => arg.startsWith('--'));
              let objectArray = args.filter((arg) => !arg.startsWith('--'));
              // Run subcommand within command object
              commands[command].subcommands[subcommand].run(objectArray, modifier);
            } else {
              // Add input to thread
              let output = creatOutputDiv(input);
              output.classList.add('cmd');
              returnOutput(output, 0);
              // Add nullThread to thread
              returnOutput(creatOutputDiv(`Hm, I don't recognize this subcommand`), 0);
            }
          }
        } else {
          // Run command
          commands[command].run(input);
        }
      } else {
        // Add nullThread to thread
        returnOutput(creatOutputDiv(nullThread), 0);
      }
      clearzetsu();
    }
  }
});
