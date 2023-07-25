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
let suggestions = document.querySelectorAll('.suggestion');
let details = document.querySelector('.details');
let detailsName = document.querySelector('.details-name');
let detailsDescription = document.querySelector('.details-desc');
let detailsArguments = document.querySelector('.details-args-accepted');
let detailsSyntax = document.querySelector('.details-syntax');

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
const displaySuggestion = (command, classParam) => {
  let suggestion = document.createElement('div');
  suggestion.className = `suggestion ${classParam}`;
  suggestion.innerHTML = `<div class="suggestion-command">${command}</div>`;
  suggestionsList.appendChild(suggestion);
};

const displaySuggestionDetails = (name, description) => {
  let newDetails = document.createElement('div');
  newDetails.className = 'suggestion-details';
  newDetails.innerHTML = `<div class="details-name">${name}</div><div class="details-description">${description}</div>`;
  details.appendChild(newDetails);
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

// Disable spacebar if input is empty
zetsu.addEventListener('keydown', function (e) {
  if (e.key === ' ' && zetsu.innerText.toString().trim().length == 0) {
    e.preventDefault();
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
  suggestions = [];
  // Check if input is a command
  for (let command in commands) {
    if (command.startsWith(input.toLowerCase()) || commands[command].name.toLowerCase().startsWith(input.toLowerCase())) {
      // Create suggestion element
      displaySuggestion(commands[command].nickname, 'first-level');
      break;
    }
    // Check if input contains an argument
    for (let arg in commands[command].arguments) {
      let fullCommand = commands[command].nickname + ' ' + arg;
      if (fullCommand.toLowerCase().startsWith(input.toLowerCase())) {
        displaySuggestion(fullCommand, 'second-level');
      }
    }
  }
  suggestions = document.querySelectorAll('.suggestion');
  if (suggestions.length === 0) {
    for (let command in commands) {
      if (commands[command].arguments !== null) {
        for (let arg in commands[command].arguments) {
          let argName = commands[command].arguments[arg].name;
          let argDesc = commands[command].arguments[arg].description;
          let cmdDesc = commands[command].description;
          let fullCommand = commands[command].nickname + ' ' + argName;
          let inputWords = input.split(' ');
          let similarities = 0;
          for (let i = 0; i < inputWords.length; i++) {
            if (argDesc.toLowerCase().includes(inputWords[i].toLowerCase())) {
              similarities++;
            }
          }
          if (argName.toLowerCase().startsWith(input.toLowerCase()) || similarities > 2) {
            displaySuggestion(fullCommand, 'third-level');
          }
        }
      } else {
        let cmdDesc = commands[command].description;
        let inputWords = input.split(' ');
        let similarities = 0;
        for (let i = 0; i < inputWords.length; i++) {
          if (cmdDesc.toLowerCase().includes(inputWords[i].toLowerCase())) {
            similarities++;
          }
        }
        if (similarities > 2) {
          displaySuggestion(commands[command].nickname, 'third-level');
        }
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
        details.innerHTML = '';
        if (cursor.style.display === 'inline-flex') {
          cursor.style.display = 'none';
        }
        if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.remove('active');
        }
        suggestionIndex++;
        if (suggestionIndex > suggestions.length - 1) {
          suggestionIndex = -1;
          if (input !== '') {
            zetsu.innerText = input;
          } else {
            zetsu.innerText = '';
          }
        } else if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.add('active');
          let suggestedCommand = suggestions[suggestionIndex].querySelector('.suggestion-command').innerText;
          zetsu.innerText = suggestedCommand;
          // Display suggestion details
          if (suggestions.length !== 0 && suggestionIndex !== -1) {
            let parts = suggestions[suggestionIndex].querySelector('.suggestion-command').innerText.split(' ');
            let commandName = parts[0].toLowerCase();
            let arg = parts.slice(1).join(' ');
            if (commands[commandName].arguments !== null && arg !== '') {
              for (let argument in commands[commandName].arguments) {
                let argName = commands[commandName].arguments[argument].name;
                let argDesc = commands[commandName].arguments[argument].description;
                let fullCommand = commands[commandName].nickname + ' ' + argName;
                if (argName === arg) {
                  displaySuggestionDetails(fullCommand, argDesc);
                }
              }
            } else {
              displaySuggestionDetails(commands[commandName].title, commands[commandName].description);
            }
          } else {
            details.innerHTML = '';
          }
          suggestions[suggestionIndex].scrollIntoView({
            block: 'nearest',
            inline: 'end',
            behavior: 'smooth',
          });
        }
        if (zetsu.innerText !== '') {
          focusAtEnd();
        } else {
          cursor.style.display = 'inline-flex';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        details.innerHTML = '';
        if (cursor.style.display === 'inline-flex') {
          cursor.style.display = 'none';
        }
        if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.remove('active');
        }
        suggestionIndex--;
        if (suggestionIndex === -1) {
          if (input !== '') {
            zetsu.innerText = input;
          } else {
            zetsu.innerText = '';
          }
        }
        if (suggestionIndex < -1) {
          suggestionIndex = suggestions.length - 1;
        }
        if (suggestionIndex !== -1) {
          suggestions[suggestionIndex].classList.add('active');
          let suggestedCommand = suggestions[suggestionIndex].querySelector('.suggestion-command').innerText;
          zetsu.innerText = suggestedCommand;
          // Display suggestion details
          if (suggestions.length !== 0 && suggestionIndex !== -1) {
            let parts = suggestions[suggestionIndex].querySelector('.suggestion-command').innerText.split(' ');
            let commandName = parts[0].toLowerCase();
            let arg = parts.slice(1).join(' ');
            if (commands[commandName].arguments !== null && arg !== '') {
              for (let argument in commands[commandName].arguments) {
                let argName = commands[commandName].arguments[argument].name;
                let argDesc = commands[commandName].arguments[argument].description;
                if (argName === arg) {
                  displaySuggestionDetails(argName, argDesc);
                }
              }
            } else {
              displaySuggestionDetails(commands[commandName].name, commands[commandName].description);
            }
          } else {
            details.innerHTML = '';
          }
          // Scroll to active suggestion
          suggestions[suggestionIndex].scrollIntoView({
            block: 'nearest',
            inline: 'end',
            behavior: 'smooth',
          });
        }
        if (zetsu.innerText !== '') {
          focusAtEnd();
        } else {
          cursor.style.display = 'inline-flex';
        }
      }
    } else {
      suggestionIndex = -1;
    }
  });
  // Reset suggestion index when user presses space or continues to type or hits enter
  zetsu.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Backspace') {
      suggestionIndex = -1;
    } else if (e.key === 'Enter') {
      input = '';
      suggestionIndex = -1;
    }
  });
});

// Clear editor if user presses enter, refocus on editor, and show fake cursor
const clearZetsu = () => {
  zetsu.innerText = '';
  zetsu.focus();
  cursor.style.display = 'inline-flex';
  suggestionsList.innerHTML = '';
  details.innerHTML = '';
  suggestions = [];
};

// Listening for command and executing function when user presses enter
zetsu.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    let input = zetsu.innerText.trim();
    // Execute commands and return output
    if (input !== '') {
      clearZetsu();
      let parts = input.split(' ');
      let command = parts[0].toLowerCase();
      let args = parts.slice(1);
      let arg = args.join(' ');
      if (commands[command]) {
        // Check if command has arguments
        if (commands[command].arguments !== null) {
          // Run command and pass in argument
          commands[command].run(input, arg);
        } else {
          // Run command
          commands[command].run(input);
        }
      } else {
        returnInput(input);
        returnOutput(creatOutputDiv(nullThread), 0);
      }
    }
  }
});
