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
  // let wordsInInput = input.split(' ');
  suggestionsList.innerHTML = '';
  details.innerHTML = '';
  for (let command in commands) {
    if (command.includes(input)) {
      suggestionsContainer.style.display = 'flex';
      let suggestion = document.createElement('div');
      suggestion.className = 'suggestion';
      suggestion.innerHTML = command;
      suggestionsList.appendChild(suggestion);
    }
  }
  // check if a command or actor contains the input letters
  // if (wordsInInput.length === 1 && wordsInInput[0] !== '??') {
  //   let cmd = wordsInInput[0];
  //   for (let command in commands) {
  //     if (command.startsWith(cmd)) {
  //       let suggestion = document.createElement('div');
  //       suggestion.className = 'suggestion';
  //       suggestion.innerHTML = command;
  //       suggestionsList.appendChild(suggestion);
  //     }
  //   }
  // }
  // } else if (wordsInInput.length > 1) {
  //   let arg = wordsInInput[1];
  //   for (let actor in innate) {
  //     if (actor.includes(arg)) {
  //       let suggestion = document.createElement('div');
  //       suggestion.className = 'suggestion';
  //       suggestion.innerHTML = actor;
  //       suggestionsList.appendChild(suggestion);
  //     }
  //   }
  // }
  // Set first suggestion as active
  let suggestions = document.querySelectorAll('.suggestion');
  suggestions[0].classList.add('active');
  // display suggestion description in details section
  let suggestionName = suggestions[0].innerText;
  details.innerHTML = `<div class="details-text">${suggestionName}</div>`;
  // Listening for up and down arrow keys to cycle through suggestions
  let suggestionIndex = 0;
  zetsu.addEventListener('keydown', function (e) {
    if (e.keyCode === 38) {
      // Up arrow
      e.preventDefault();
      suggestions[suggestionIndex].classList.remove('active');
      suggestionIndex--;
      if (suggestionIndex < 0) {
        suggestionIndex = suggestions.length - 1;
      }
      suggestions[suggestionIndex].classList.add('active');
      // display suggestion description in details section
      suggestionName = suggestions[suggestionIndex].innerText;
      details.innerHTML = `<div class="details-text">${suggestionName}</div>`;
      // Scroll to active suggestion
      suggestions[suggestionIndex].scrollIntoView({
        block: 'nearest',
        inline: 'start',
        behavior: 'smooth',
      });
    }
    if (e.keyCode === 40) {
      // Down arrow
      e.preventDefault();
      suggestions[suggestionIndex].classList.remove('active');
      suggestionIndex++;
      if (suggestionIndex > suggestions.length - 1) {
        suggestionIndex = 0;
      }
      suggestions[suggestionIndex].classList.add('active');
      // display suggestion description in details section
      suggestionName = suggestions[suggestionIndex].innerText;
      details.innerHTML = `<div class="details-text">${suggestionName}</div>`;
      // Scroll to active suggestion
      suggestions[suggestionIndex].scrollIntoView({
        block: 'nearest',
        inline: 'end',
        behavior: 'smooth',
      });
    }
  });
  // Listening for tab key to autocomplete suggestion
  zetsu.addEventListener('keydown', function (e) {
    if (e.keyCode === 9) {
      e.preventDefault();
      if (suggestionsList.childElementCount > 0) {
        let currentSelection = document.querySelector('.active').innerText;
        // Check if current selection is a command or an actor in innate or adaptive
        if (currentSelection in commands) {
          // Check if command has a modifier
          if (currentSelection.includes(' ')) {
            let args = currentSelection.split(' ');
            let obj = args[0];
            let mod = args[1];
            zetsu.innerText = obj + ' ' + mod;
          } else {
            zetsu.innerText = currentSelection;
          }
        } else if (currentSelection in innate) {
          zetsu.innerText = 'innate' + ' ' + currentSelection;
        } else if (currentSelection in adaptive) {
          zetsu.innerText = 'adapt' + ' ' + currentSelection;
        }
        // Set cursor to end of text
        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(zetsu.childNodes[0], zetsu.innerText.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        // Remove suggestions
        suggestionsList.innerHTML = '';
        // Remove details
        details.innerHTML = '';
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
          commands[command].subcommands[subcommand](objectArray, modifier);
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
