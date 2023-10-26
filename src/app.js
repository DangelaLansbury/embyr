// --- DOM VARIABLES ---

// Workbook components
let workbook = document.querySelector('.workbook'); // Main container
// Terminal components
let thread = document.querySelector('.thread'); // Thread
let help1 = document.querySelector('#help1'); // Help container for first set of commands
let help2 = document.querySelector('#help2'); // Help container for second set of commands
// Zetsu components
let zetsuContainer = document.querySelector('.zetsu-container'); // Full Zetsu container for input, suggestions, and details
let zetsuInit = document.querySelector('.zetsu-init'); // Zetsu init container
let zetsuInitContent = document.querySelector('.zetsu-init-content'); // Zetsu init text
let firstTime = document.querySelector('#firstTime'); // First time hint
let zetsuHelper = document.querySelector('.zetsu-helper'); // Zetsu suggestions and description container
// Zetsu input
let zetsuBar = document.querySelector('.zetsu-input');
let zetsu = document.querySelector('.zetsu-input-text'); // Zetsu input field
let cursor = document.querySelector('.cursor'); // Zetsu input fake cursor
let running = document.querySelector('.running'); // Zetsu running indicator
let history = []; // Zetsu input history
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
  zetsuInitContent.innerHTML = `Command suggestions and info will appear here.`;
};

const focusAtEnd = () => {
  if (zetsu.innerText.toString().trim().length > 0) {
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(zetsu.childNodes[0], zetsu.innerText.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
};

// Listening for click and focusing at end of editor
workbook.addEventListener('click', function (e) {
  // Focus on zetsu if target is not thread text
  if (!e.target.classList.contains('thread-text')) {
    zetsu.focus();
  }
  // Set cursor at end of editor if target is not zetsu
  if (e.target !== zetsu) {
    focusAtEnd();
  }
});

// --- CURSOR ---

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

const generateNullThread = (command) => {
  let nullThread = `Shoot, I don't recognize the command '<span class="honey thicc"">${command}</span>'.`;
  return nullThread;
};

const helpThread = `Use '<span class="sweetgrass thicc">h</span>' to see a list of commands I know.`;

const returnNullAndHelp = (command, delay) => {
  let nullThread = generateNullThread(command);
  returnOutput(createOutputDiv(nullThread, 'stone'), delay);
  returnOutput(createOutputDiv(helpThread, 'wheat'), delay);
};

// --- SUGGESTIONS ---

// toggle zetsu helper display between init and suggestions if there are suggestions
const hideZetsuInit = () => {
  zetsuInit.classList.add('hidden');
  zetsuHelper.classList.remove('hidden');
};

const showZetsuInit = () => {
  zetsuInit.classList.remove('hidden');
  zetsuHelper.classList.add('hidden');
};

const toggleZetsuInit = () => {
  suggestions = document.querySelectorAll('.suggestion');
  if (suggestions.length !== 0) {
    // zetsuInitContent.innerHTML = 'Command suggestions and info will appear here.';
    if (!zetsuInit.classList.contains('hidden')) {
      hideZetsuInit();
    }
  } else {
    showZetsuInit();
  }
};

// display suggestions and detail
const populateSuggestion = (command, parent, sub, arg) => {
  let suggestion = document.createElement('div');
  suggestion.className = 'suggestion thicc sweetgrass';
  suggestion.innerHTML = `<div class="cmd-icon"><img src="public/icons/${sub}.svg" class="icon-svg" alt="icon for ${sub}" /></div><div class="suggestion-command" data-cmd="${parent}" data-sub="${sub}" data-arg=${arg}>${command}</div>`;
  suggestionsList.appendChild(suggestion);
};

const displayDetails = (title, description) => {
  details.innerHTML = '';
  let newDetails = document.createElement('div');
  newDetails.className = 'suggestion-details';
  newDetails.innerHTML = `<div class="title sweetgrass medium thicc">${title}</div><div class="description">${description}</div>`;
  details.appendChild(newDetails);
};

// --- OUTPUTS ---

const createOutputDiv = (text, classParam) => {
  let output = document.createElement('div');
  output.className = 'thread-text ' + classParam;
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
  // Check if first word is command
  let inputWords = input.split(' ');
  let commandColors = ['sweetgrass', 'river', 'lilac'];
  for (let i = 0; i < inputWords.length; i++) {
    let command = inputWords[i].toLowerCase();
    if (commands[command]) {
      inputWords[i] = `<span class="${commandColors[i % 3]} thicc">${command}</span>`;
    }
  }
  input = inputWords.join(' ');
  let output = createOutputDiv(input, 'cmd');
  returnOutput(output, 0);
};

const outputDelay = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400];

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
let input = '';
zetsu.addEventListener('input', function () {
  input = this.innerText;
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
  suggestions = document.querySelectorAll('.suggestion');
  let suggestionsArray = [];
  for (let cmd in commands) {
    // Search through ops object for each command
    for (let op in commands[cmd].ops) {
      let keywords = commands[cmd].ops[op].keywords;
      for (let i = 0; i < inputWords.length; i++) {
        for (let j = 0; j < keywords.length; j++) {
          // Fuzzy search input and keywords
          let levDist = levenshteinDistance(inputWords[i], keywords[j]);
          let similarity = 1 - levDist / Math.max(inputWords[i].length, keywords[j].length);
          if (similarity > 0.66) {
            let toDo = commands[cmd].ops[op].do;
            let argument = '';
            // check if input contains any accepted arguments
            let acceptedArgs = commands[cmd].ops[op].acceptedArgs;
            acceptedArgs.forEach((arg) => {
              // remove hyphens and slashes from input word and argument
              let argCheckInput = inputWords[i].replace(/-/g, '').replace(/\//g, '');
              let argCheckArg = arg.replace(/-/g, '').replace(/\//g, '');
              // if input word matches argument, add argument to command
              if (argCheckInput.toLowerCase() === argCheckArg.toLowerCase()) {
                argument = arg;
                // check suggestions array for existing suggestion with same raw command and remove it from array
                for (let k = 0; k < suggestionsArray.length; k++) {
                  if (suggestionsArray[k].command.toLowerCase() === toDo.toLowerCase()) {
                    suggestionsArray.splice(k, 1);
                  }
                }
                let modifier = commands[cmd].ops[op].argModifier;
                toDo += ` ${modifier}${arg.toUpperCase()}`;
                similarity++;
              }
            });
            let alreadySuggested = false;
            for (let k = 0; k < suggestionsArray.length; k++) {
              // check suggestions array for existing suggestion
              if (suggestionsArray[k].command.toLowerCase() === toDo.toLowerCase()) {
                alreadySuggested = true;
              }
            }
            // Add suggestion to suggestions array if it hasn't already been suggested
            if (!alreadySuggested) {
              let suggestion = {
                command: toDo,
                parentCommand: cmd,
                subCommand: op,
                argument: argument,
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
                  if (!zetsu.innerText.startsWith(suggestionsArray[k].command + ' ')) {
                    populateSuggestion(suggestionsArray[k].command, suggestionsArray[k].parentCommand, suggestionsArray[k].subCommand, suggestionsArray[k].argument);
                  }
                }
                // Display suggestion details for first suggestion
                displayDetails(commands[suggestionsArray[0].parentCommand].ops[suggestionsArray[0].subCommand].title, commands[suggestionsArray[0].parentCommand].ops[suggestionsArray[0].subCommand].description);
              }
            }
          }
        }
      }
    }
  }
  toggleZetsuInit();
});

// --- POPULATING SUGGESTIONs ---

let suggestionIndex = -1;
// Function to grab data from active suggestion
const grabSuggestionData = (indexToUse) => {
  suggestions = document.querySelectorAll('.suggestion');
  let suggCmd = suggestions[indexToUse].querySelector('.suggestion-command').innerText;
  let suggCmdPar = suggestions[indexToUse].querySelector('.suggestion-command').dataset.cmd;
  let suggCmdSub = suggestions[indexToUse].querySelector('.suggestion-command').dataset.sub;
  let suggCmdArg = suggestions[indexToUse].querySelector('.suggestion-command').dataset.arg;
  console.log(suggCmdPar, suggCmdSub, suggCmdArg);
  let title = commands[suggCmdPar].ops[suggCmdSub].title;
  let description = commands[suggCmdPar].ops[suggCmdSub].description;
  displayDetails(title, description);
  // Replace input with suggestion if user wants it
  if (indexToUse === 0 && suggestionIndex === -1) {
    zetsu.innerText = input;
  } else {
    zetsu.innerText = suggCmd;
    focusAtEnd();
  }
};
// Listen for up and down arrow keys to cycle through suggestions
zetsu.addEventListener('keydown', function (e) {
  // Check if suggestions are present
  suggestions = document.querySelectorAll('.suggestion');
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
          grabSuggestionData(0);
        } else {
          zetsu.innerText = '';
        }
      } else if (suggestionIndex !== -1) {
        suggestions[suggestionIndex].classList.add('active');
        grabSuggestionData(suggestionIndex);
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
          grabSuggestionData(0);
        } else {
          zetsu.innerText = '';
        }
      }
      if (suggestionIndex < -1) {
        suggestionIndex = suggestions.length - 1;
      }
      if (suggestionIndex !== -1) {
        suggestions[suggestionIndex].classList.add('active');
        grabSuggestionData(suggestionIndex);
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
  if (e.key === ' ' || e.key === 'Backspace' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    suggestionIndex = -1;
  } else if (e.key === 'Enter') {
    input = '';
    suggestionIndex = -1;
  }
});

// Reset suggestions if all text is deleted at once
zetsu.addEventListener('keydown', function (e) {
  if (e.key === 'Backspace' && zetsu.innerText.trim().length == 1) {
    clearZetsu();
  }
});

// Clear editor if user presses enter, refocus on editor, and show fake cursor
const clearZetsu = () => {
  zetsu.innerText = '';
  zetsu.focus();
  cursor.style.display = 'inline-flex';
  suggestionsList.innerHTML = '';
  details.innerHTML = '';
  suggestions = [];
  showZetsuInit();
};

// Listening for command and executing function when user presses enter
zetsu.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    let input = zetsu.innerText.trim();
    // Execute commands and return output
    if (input !== '') {
      history.push(input);
      localStorage.setItem('history', JSON.stringify(history));
      console.log(history);
      clearZetsu();
      let parts = input.split(' ');
      let command = parts[0].toLowerCase();
      if (commands[command]) {
        thread.innerHTML = '';
        commands[command].run(input);
      } else {
        returnInput(input);
        returnNullAndHelp(command, outputDelay[0]);
      }
    }
  }
});
