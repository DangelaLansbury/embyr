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

// --- POPULATING CONTENT ---

const nullThread = `<div class="thread-text">Shoot, I don't recognize that command.</div>`;

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

// display suggestions and detail
const populateSuggestion = (command) => {
  let suggestion = document.createElement('div');
  let cmd = command.split(' ')[0];
  let newCommand;
  if (command.split(' ').length > 1) {
    let arg = command.slice(cmd.length + 1);
    // extract any text after the last "/" in the path and separate it from the path
    let argName = arg.split('/').pop();
    let path = commands[cmd].arguments[argName].path.split(argName)[0];
    // newCommand = commands[cmd].nickname + ' ' + commands[cmd].arguments[argName].path;
    newCommand = `<div class="suggestion-command">${commands[cmd].nickname} <span class="suggestion-path">${path}</span><span class="suggestion-arg">${argName}</span></div>`;
  } else {
    newCommand = `<div class="suggestion-command">${command}</div>`;
  }
  suggestion.className = 'suggestion';
  suggestion.innerHTML = newCommand;
  // suggestion.style.setProperty('--command-icon', `url(../assets/icons/${commands[cmd].icon}.svg)`);
  suggestionsList.appendChild(suggestion);
};

const populateDetails = (name, description) => {
  let newDetails = document.createElement('div');
  newDetails.className = 'suggestion-details';
  newDetails.innerHTML = `<div class="details-name">${name}</div><div class="details-description">${description}</div>`;
  details.appendChild(newDetails);
};

const displayDetails = (command) => {
  let cmd = command.split(' ')[0];
  if (command.split(' ').length > 1) {
    let arg = command.slice(cmd.length + 1);
    // extract any text after the last "/" in the path
    let argName = arg.split('/').pop();
    let displayCommand = cmd + ' ' + commands[cmd].arguments[argName].path;
    let argDesc = commands[cmd].arguments[argName].description;
    // let argSyntax = command.arguments[argName].syntax;
    details.innerHTML = '';
    populateDetails(displayCommand, argDesc);
  } else {
    details.innerHTML = '';
    populateDetails(commands[cmd].title, commands[cmd].description);
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
window.addEventListener('keydown', function (e) {
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

const levenshteinDistance = (str1, str2) => {
  // Convert strings to lowercase
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  let m = str1.length;
  let n = str2.length;
  let dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(null));
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      let cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
};

// Populating suggestions container with suggestions based on input
zetsu.addEventListener('input', function () {
  let input = this.innerText;
  // Check if input is empty
  if (input !== '') {
    cursor.style.display = 'none';
  } else {
    cursor.style.display = 'inline-flex';
  }
  // Clear suggestions and details
  suggestionsList.innerHTML = '';
  details.innerHTML = '';
  suggestions = [];
  let inputWords = input.split(' ');
  for (let command in commands) {
    for (let arg in commands[command].arguments) {
      let fullCommand = commands[command].nickname + ' ' + commands[command].arguments[arg].name;
      let fullCommandWithPath = commands[command].nickname + ' ' + commands[command].arguments[arg].path;
      if (fullCommand.toLowerCase().startsWith(input.toLowerCase()) || fullCommandWithPath.toLowerCase().startsWith(input.toLowerCase())) {
        if (arg.startsWith('_')) {
          fullCommand = commands[command].nickname;
        }
        suggestions = document.querySelectorAll('.suggestion');
        let alreadySuggested = false;
        for (let k = 0; k < suggestions.length; k++) {
          if (suggestions[k].querySelector('.suggestion-command').innerText === fullCommand) {
            alreadySuggested = true;
          }
        }
        if (!alreadySuggested) {
          populateSuggestion(fullCommand);
        }
      }
    }
  }
  suggestions = document.querySelectorAll('.suggestion');
  let suggestionsArray = [];
  for (let command in commands) {
    // fuzzy search keywords in each command
    let keywords = commands[command].keywords;
    for (let i = 0; i < inputWords.length; i++) {
      for (let j = 0; j < keywords.length; j++) {
        let levDist = levenshteinDistance(inputWords[i], keywords[j]);
        let similarity = 1 - levDist / Math.max(inputWords[i].length, keywords[j].length);
        if (similarity > 0.66) {
          let fullCommand = commands[command].nickname;
          // check to see if keyword matches any arguments
          for (let arg in commands[command].arguments) {
            let argName = commands[command].arguments[arg].name;
            let argPath = commands[command].arguments[arg].path;
            if (!argName.startsWith('_') && argName.toLowerCase() == keywords[j]) {
              fullCommand += ' ' + argName;
            }
          }
          let alreadySuggested = false;
          for (let k = 0; k < suggestionsArray.length; k++) {
            if (suggestionsArray[k].command.toLowerCase() === fullCommand.toLowerCase()) {
              alreadySuggested = true;
            }
          }
          if (!alreadySuggested) {
            populateSuggestion(fullCommand);
            let suggestion = {
              command: fullCommand,
              similarity: similarity,
            };
            suggestionsArray.push(suggestion);
            // Reorder suggestions in order of similarity
            if (suggestionsArray.length > 0) {
              suggestionsArray.sort((a, b) => {
                const nameA = a.similarity;
                const nameB = b.similarity;
                return nameB - nameA;
              });
              // Populate suggestions list with new order
              suggestionsList.innerHTML = '';
              for (let k = 0; k < suggestionsArray.length; k++) {
                populateSuggestion(suggestionsArray[k].command);
              }
            }
          }
        }
      }
    }
  }
  suggestions = document.querySelectorAll('.suggestion');
  suggestionsArray = [];
  let suggestionIndex = -1;
  // Listening for up and down arrow keys to cycle through suggestions
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
            displayDetails(suggestedCommand);
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
            displayDetails(suggestedCommand);
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
  // Reset suggestions if all text is deleted at once
  zetsu.addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && zetsu.innerText.trim().length == 1) {
      zetsu.innerText = '';
      cursor.style.display = 'inline-flex';
      suggestionsList.innerHTML = '';
      details.innerHTML = '';
      suggestions = [];
    }
  });
  if (zetsu.innerText.trim().length == 0) {
    clearZetsu();
  }
  return suggestionsArray;
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
        commands[command].run(input, arg);
      } else {
        returnInput(input);
        returnOutput(creatOutputDiv(nullThread), 0);
      }
    }
  }
});
