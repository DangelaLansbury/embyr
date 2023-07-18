// --- DOM VARIABLES ---

let container = document.querySelector('.container');
let zetsuContainer = document.querySelector('.zetsu-container');
let zetsuHelper = document.querySelector('.zetsu-helper');
let zetsuDefault = document.querySelector('.zetsu-default');
let thread = document.querySelector('.thread');
let zetsu = document.querySelector('.zetsu-input-text');
let cursor = document.querySelector('.cursor');
let suggestionsContainer = document.querySelector('.suggestions-container');
let suggestionsList = document.querySelector('.suggestions-list');
let details = document.querySelector('.suggestion-details');
let detailsName = document.querySelector('.details-name');
let detailsDescription = document.querySelector('.details-description');

// --- FOCUS ON EDITOR ---

window.onload = () => {
  thread.innerHTML = defaultThread;
  zetsu.focus();
};

// Listening for click and focusing on editor
document.body.addEventListener('click', function (e) {
  zetsu.focus();
});

// --- MANAGING FAKE CURSOR ---

// Hide fake cursor once user starts typing and resetting everything if user deletes input
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
      suggestionsContainer.style.display = 'none';
      suggestionsList.innerHTML = '';
      details.innerHTML = '';
      suggestionIndex = 0;
    }
  });
}

hideCursor(zetsu);

const smartAssist = (input) => {
  // code to handle the smart assistant
  // check if input is a command
  if (input in commands) {
    // check if input has a modifier
    if (input.includes(' ')) {
      let args = input.split(' ');
      let obj = args[0];
      let mod = args[1];
      commands[obj](mod);
    } else {
      commands[input]();
    }
  } else {
    let output = creatOutputDiv(nullThread);
    returnOutput(output, 0);
  }
};

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

// let input = '';

// Populating suggestions container with suggestions based on input
zetsu.addEventListener('input', function () {
  let input = this.innerText;
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
  let suggestions = document.querySelectorAll('.suggestion');
  let suggestionIndex = -1;
  zetsu.addEventListener('keydown', function (e) {
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
    } else if (e.key === 'ArrowUp') {
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
    suggestionsContainer.style.display = 'none';
    suggestionsList.innerHTML = '';
    details.innerHTML = '';
    suggestionIndex = 0;
    // Execute commands and return output
    if (input !== '') {
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
        // check if subcommand exists
        if (commands[command].subcommands[subcommand]) {
          // Add input to thread
          let output = creatOutputDiv(input);
          output.classList.add('cmd');
          returnOutput(output, 0);
          // Split args into object and modifier where modifier is anything that starts with "-"
          let modifier = args.filter((arg) => arg.startsWith('-'));
          let objectArray = args.filter((arg) => !arg.startsWith('-'));
          // Run subcommand within command object
          commands[command].subcommands[subcommand].run(objectArray, modifier);
          clearzetsu();
        } else {
          // Add input to thread
          let output = creatOutputDiv(input);
          output.classList.add('cmd');
          returnOutput(output, 0);
          // Add nullThread to thread
          returnOutput(creatOutputDiv('Please add an argument'), 0);
          clearzetsu();
        }
      } else {
        // Add input to thread
        let output = creatOutputDiv(input);
        output.classList.add('cmd');
        returnOutput(output, 0);
        // Add nullThread to thread
        returnOutput(creatOutputDiv(nullThread), 0);
        clearzetsu();
      }
    }
  }
});
