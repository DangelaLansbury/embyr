// --- DOM VARIABLES ---

// Terminal components
let container = document.querySelector('.container'); // Main container
let thread = document.querySelector('.thread'); // Thread container
// Zetsu components
let zetsuContainer = document.querySelector('.zetsu-container'); // Full Zetsu container for input, suggestions, and details
let zetsuHelper = document.querySelector('.zetsu-helper'); // Zetsu suggestions and description container
let zetsuDefault = document.querySelector('.zetsu-default'); // Zetsu default text
// Zetsu input
let zetsu = document.querySelector('.zetsu-input-text'); // Zetsu input field
let cursor = document.querySelector('.cursor');
// Suggestions and suggestion details
let suggestionsContainer = document.querySelector('.suggestions-container');
let suggestionsList = document.querySelector('.suggestions-list');
let details = document.querySelector('.suggestion-details');
let detailsName = document.querySelector('.details-name');
let detailsDescription = document.querySelector('.details-description');
let suggestions = document.querySelectorAll('.suggestion');

// --- FOCUS ON EDITOR ---

window.onload = () => {
  thread.innerHTML = defaultThread;
  zetsu.focus();
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
    suggestionsContainer.style.display = 'none';
    suggestionsList.innerHTML = '';
    details.innerHTML = '';
    suggestions = [];
    if (thread.innerHTML === defaultThread) {
      zetsuHelper.classList.add('hidden');
      zetsuDefault.classList.remove('hidden');
    }
  }
});

// --- DEFAULTS ---

const defaultThread = `<div class="thread-text" style="color: #A79C8F">Hi there. Welcome to immuneOS.</div>`;

const nullThread = `<div class="thread-text">Shoot, I don't recognize that command.</div>`;

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

// --- ADDING EVENT LISTENERS FOR COMMANDS ---

// Populating suggestions container with suggestions based on input
zetsu.addEventListener('input', function () {
  let input = this.innerText;
  if (input !== '') {
    cursor.style.display = 'none';
    if (zetsuHelper.classList.contains('hidden')) {
      zetsuHelper.classList.remove('hidden');
      zetsuDefault.classList.add('hidden');
    }
  }
  suggestionsList.innerHTML = '';
  details.innerHTML = '';
  for (let command in commands) {
    if (command.includes(input)) {
      // Create suggestion element
      suggestionsContainer.style.display = 'flex';
      let suggestion = document.createElement('div');
      suggestion.className = 'suggestion';
      suggestion.innerHTML = command;
      suggestionsList.appendChild(suggestion);
    }
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
    // Execute commands and return output
    if (input !== '') {
      // Clear default thread if it's still there
      if (thread.innerHTML === defaultThread) {
        thread.innerHTML = '';
      }
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
          commands[command].run();
        }
      } else {
        // Add input to thread
        let output = creatOutputDiv(input);
        output.classList.add('cmd');
        returnOutput(output, 0);
        // Add nullThread to thread
        returnOutput(creatOutputDiv(nullThread), 0);
      }
      clearzetsu();
    }
  }
});
