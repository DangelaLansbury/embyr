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

const focusAtEnd = () => {
  let range = document.createRange();
  let sel = window.getSelection();
  range.setStart(zetsu.childNodes[0], zetsu.innerText.length);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
};

// Listening for click and focusing at end of editor
workbook.addEventListener('click', function (e) {
  zetsu.focus();
  // Set cursor at end of editor if target is not zetsu
  if (e.target !== zetsu && zetsu.innerText.toString().trim().length > 0) {
    focusAtEnd();
  }
});

// Hide cursor if input loses focus
zetsu.addEventListener('blur', function (e) {
  cursor.style.display = 'none';
});

// Show cursor if input gains focus
zetsu.addEventListener('focus', function (e) {
  if (zetsu.innerText.toString().trim().length == 0) {
    cursor.style.display = 'inline-flex';
  }
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

// --- POPULATING CONTENT ---

const nullThread = `<div class="thread-text">Shoot, I don't recognize that command.</div>`;

// display suggestions and detail
const displaySuggestion = (command, name) => {
  let suggestion = document.createElement('div');
  suggestion.className = 'suggestion';
  suggestion.innerHTML = `<div class="chain-parent">${command}</div> <div class="suggestion-name">${name}</div>`;
  suggestionsList.appendChild(suggestion);
};

const displayChainSuggestion = (command, chain) => {
  let suggestion = document.createElement('div');
  suggestion.className = 'suggestion chain';
  suggestion.innerHTML = `<div class="chain-parent">${command}</div> <div class="chain-arguments">${chain}</div>`;
  suggestionsList.appendChild(suggestion);
};

const displayErrorSuggestion = (error, description) => {
  let suggestion = document.createElement('div');
  suggestion.className = 'suggestion error';
  suggestion.innerHTML = `<div class="chain-parent">${error}</div>`;
  details.innerHTML = `<div class="details-name">${error}</div><div class="details-description">${description}</div>`;
  suggestionsList.appendChild(suggestion);
};

// populate help bar with commands
const displayHelpCommands = (commands) => {
  for (let command in commands) {
    let commandHint = document.createElement('div');
    commandHint.className = 'help-bar-hint';
    commandHint.innerHTML = `<div class="help-bar-cmd">${command}</div><div class="help-bar-text">${commands[command].name.toLowerCase()}</div>`;
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

const returnInput = (input) => {
  let output = creatOutputDiv(input);
  output.classList.add('cmd');
  returnOutput(output, 0);
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
    if (command.startsWith(input.toLowerCase()) || commands[command].name.toLowerCase().startsWith(input.toLowerCase())) {
      // Create suggestion element
      displaySuggestion(command, commands[command].name.toLowerCase());
    }
    if (suggestionsList.innerHTML === '') {
      for (let chain in commands[command].chains) {
        if (commands[command].chains[chain].full.startsWith(input.toLowerCase())) {
          // Display details of related chains
          displayChainSuggestion(command, chain);
        }
        // else {
        //   // Display details of related chains
        //   for (let argument in commands[command].chains[chain].arguments) {
        //     if (commands[command].chains[chain].arguments[argument].name.startsWith(input.toLowerCase())) {
        //       displayChainSuggestion(command, chain);
        //     }
        //   }
        // }
      }
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
        } else if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.add('active');
          // Check if suggestion is a chain
          if (suggestions[suggestionIndex].classList.contains('chain')) {
            zetsu.innerText = suggestions[suggestionIndex].firstElementChild.innerText + ' ' + suggestions[suggestionIndex].lastElementChild.innerText;
            details.innerHTML = `<div class="details-name">${commands[suggestions[suggestionIndex].firstElementChild.innerText].chains[suggestions[suggestionIndex].lastElementChild.innerText].name}</div><div class="details-description">${
              commands[suggestions[suggestionIndex].firstElementChild.innerText].chains[suggestions[suggestionIndex].lastElementChild.innerText].description
            }</div>`;
          } else {
            zetsu.innerText = suggestions[suggestionIndex].firstElementChild.innerText;
            details.innerHTML = `<div class="details-name">${commands[suggestions[suggestionIndex].firstElementChild.innerText].name}</div><div class="details-description">${
              commands[suggestions[suggestionIndex].firstElementChild.innerText].description
            }</div>`;
          }
          suggestions[suggestionIndex].scrollIntoView({
            block: 'nearest',
            inline: 'end',
            behavior: 'smooth',
          });
        }
        focusAtEnd();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.remove('active');
        }
        suggestionIndex--;
        if (suggestionIndex === -1) {
          zetsu.innerText = input;
          details.innerHTML = '';
        }
        if (suggestionIndex < -1) {
          suggestionIndex = suggestions.length - 1;
        }
        if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.add('active');
          // Check if suggestion is a chain
          if (suggestions[suggestionIndex].classList.contains('chain')) {
            zetsu.innerText = suggestions[suggestionIndex].firstElementChild.innerText + ' ' + suggestions[suggestionIndex].lastElementChild.innerText;
            details.innerHTML = `<div class="details-name">${commands[suggestions[suggestionIndex].firstElementChild.innerText].chains[suggestions[suggestionIndex].lastElementChild.innerText].name}</div><div class="details-description">${
              commands[suggestions[suggestionIndex].firstElementChild.innerText].chains[suggestions[suggestionIndex].lastElementChild.innerText].description
            }</div>`;
          } else {
            zetsu.innerText = suggestions[suggestionIndex].firstElementChild.innerText;
            details.innerHTML = `<div class="details-name">${commands[suggestions[suggestionIndex].firstElementChild.innerText].name}</div><div class="details-description">${
              commands[suggestions[suggestionIndex].firstElementChild.innerText].description
            }</div>`;
          }
          // Scroll to active suggestion
          suggestions[suggestionIndex].scrollIntoView({
            block: 'nearest',
            inline: 'end',
            behavior: 'smooth',
          });
        }
        focusAtEnd();
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
      let parts = input.split(' ');
      let command = parts[0].toLowerCase();
      let args = parts.slice(1);
      // Check if command exists
      if (commands[command]) {
        // Check if user args match any chains
        for (let chain in commands[command].chains) {
          if (commands[command].chains[chain].full === input.toLowerCase()) {
            commands[command].chains[chain].run(input);
            clearzetsu();
            return;
          } else {
            commands[command].run(input, args);
          }
        }
      } else {
        returnInput(input);
        returnOutput(creatOutputDiv(nullThread), 0);
      }
      clearzetsu();
    }
  }
});
