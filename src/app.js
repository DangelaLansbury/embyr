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
let prevInputs = []; // Zetsu input history
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
  // zetsuInitContent.innerHTML = `Hi there. First time? Use '<span class="sweetgrass thicc">h</span>' for help.`;
  zetsuInitContent.innerHTML = `Command suggestions and info will appear here.`;
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
  // Zetsu on zetsu if target is not thread text
  if (!e.target.classList.contains('thread-text')) {
    zetsu.focus();
  }
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

// populate help bar with commands
const displayHelpCommands = (commands) => {
  for (let command in commands) {
    let commandHint = document.createElement('div');
    commandHint.className = 'help-bar-hint';
    commandHint.innerHTML = `<div class="help-bar-cmd thicc">${command}</div><div class="help-bar-text">${commands[command].name.toLowerCase()}</div>`;
    if (commands[command].meta === true) {
      help2.appendChild(commandHint);
    }
  }
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

// display suggestions and detail
const populateSuggestion = (command, id) => {
  let suggestion = document.createElement('div');
  let cmd = command.split(' ')[0].toLowerCase();
  suggestion.className = 'suggestion thicc sweetgrass';
  suggestion.innerHTML = `<div class="cmd-icon"><img src="public/icons/${cmd}.svg" class="icon-svg" alt="icon for ${cmd}" /></div><div class="suggestion-command" data-id="${id}">${command}</div>`;
  // suggestion.innerHTML = `<div class="suggestion-command">${command}</div>`;
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
zetsu.addEventListener('input', function () {
  let input = this.innerText;
  // Check if input is empty
  if (input !== '') {
    cursor.style.display = 'none';
    // hideZetsuInit();
  } else {
    cursor.style.display = 'inline-flex';
  }
  // Break if input starts with asterisk
  if (input.startsWith('*')) {
    return;
  }
  // Clear suggestions and details
  suggestionsList.innerHTML = '';
  details.innerHTML = '';
  suggestions = [];
  let inputWords = input.split(' ');
  suggestions = document.querySelectorAll('.suggestion');
  let suggestionsArray = [];
  for (let command in commands) {
    // fuzzy search keywords in each command
    let keywords = commands[command].keywords;
    for (let i = 0; i < inputWords.length; i++) {
      for (let j = 0; j < keywords.length; j++) {
        let levDist = levenshteinDistance(inputWords[i], keywords[j]);
        let similarity = 1 - levDist / Math.max(inputWords[i].length, keywords[j].length);
        if (similarity > 0.55) {
          let fullCommand = command;
          let argument = '';
          let commandToDisplay = command;
          let idToPass = 'default';
          // check if input contains any accepted arguments
          let acceptedArgs = commands[command].acceptedArgs;
          acceptedArgs.forEach((arg) => {
            // fuzzy search accepted args
            let levDist = levenshteinDistance(inputWords[i], arg);
            let similarity = 1 - levDist / Math.max(inputWords[i].length, arg.length);
            if (similarity > 0.55) {
              argument = arg;
            }
          });
          if (argument !== '') {
            fullCommand = fullCommand + ' ' + argument.toUpperCase();
            commandToDisplay = commandToDisplay + ' ' + `<span class="lilac">${argument.toUpperCase()}</span>`;
            idToPass = argument.toLowerCase();
            similarity++;
          }
          let alreadySuggested = false;
          for (let k = 0; k < suggestionsArray.length; k++) {
            if (suggestionsArray[k].command.toLowerCase() === fullCommand.toLowerCase()) {
              alreadySuggested = true;
            }
          }
          if (!alreadySuggested) {
            // populateSuggestion(fullCommand, idToPass);
            let suggestion = {
              raw: fullCommand,
              command: commandToDisplay,
              id: idToPass,
              similarity: similarity,
            };
            suggestionsArray.push(suggestion);
            // Sort suggestions by similarity
            if (suggestionsArray.length > 0) {
              suggestionsArray.sort((a, b) => {
                const nameA = a.similarity;
                const nameB = b.similarity;
                return nameB - nameA;
              });
            }
            // Display top suggestion
            suggestionsList.innerHTML = '';
            if (!zetsu.innerText.trim().startsWith(suggestionsArray[0].raw)) {
              populateSuggestion(suggestionsArray[0].command, suggestionsArray[0].id);
              displayDetails(commands[command].hints[suggestionsArray[0].id].title, commands[command].hints[suggestionsArray[0].id].description);
            }
          }
        }
      }
    }
  }
  suggestions = document.querySelectorAll('.suggestion');
  if (suggestions.length !== 0) {
    // zetsuInitContent.innerHTML = 'Command suggestions and info will appear here.';
    if (!zetsuInit.classList.contains('hidden')) {
      hideZetsuInit();
    }
  } else {
    showZetsuInit();
  }
  suggestionsArray = [];
  // listen for tab key to use suggestion
  zetsu.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length !== 0) {
        let suggestedCommand = suggestions[0].querySelector('.suggestion-command').innerText;
        zetsu.innerText = suggestedCommand;
        focusAtEnd();
        suggestions = [];
        showZetsuInit();
      }
    }
  });
  let suggestionIndex = -1;
  // // Listening for up and down arrow keys to cycle through suggestions
  // zetsu.addEventListener('keydown', function (e) {
  //   for (let i = 0; i < suggestions.length; i++) {
  //     suggestions[i].classList.remove('active');
  //   }
  //   // Check if suggestions are present
  //   if (suggestions.length !== 0) {
  //     if (e.key === 'ArrowDown') {
  //       e.preventDefault();
  //       details.innerHTML = '';
  //       if (cursor.style.display === 'inline-flex') {
  //         cursor.style.display = 'none';
  //       }
  //       if (suggestionIndex !== -1) {
  //         suggestions[suggestionIndex].classList.remove('active');
  //       }
  //       suggestionIndex++;
  //       if (suggestionIndex > suggestions.length - 1) {
  //         suggestionIndex = -1;
  //         if (input !== '') {
  //           zetsu.innerText = input;
  //         } else {
  //           zetsu.innerText = '';
  //         }
  //       } else if (suggestionIndex !== -1) {
  //         suggestions[suggestionIndex].classList.add('active');
  //         let suggestedCommand = suggestions[suggestionIndex].querySelector('.suggestion-command').innerText;
  //         let suggestedCommandID = suggestions[suggestionIndex].querySelector('.suggestion-command').dataset.id;
  //         let title = commands[suggestedCommand.split(' ')[0]].hints[suggestedCommandID].title;
  //         let description = commands[suggestedCommand.split(' ')[0]].hints[suggestedCommandID].description;
  //         zetsu.innerText = suggestedCommand;
  //         // Display suggestion details
  //         if (suggestions.length !== 0 && suggestionIndex !== -1) {
  //           displayDetails(title, description);
  //         } else {
  //           details.innerHTML = '';
  //         }
  //         suggestions[suggestionIndex].scrollIntoView({
  //           block: 'nearest',
  //           inline: 'end',
  //           behavior: 'smooth',
  //         });
  //       }
  //       if (zetsu.innerText !== '') {
  //         focusAtEnd();
  //       } else {
  //         cursor.style.display = 'inline-flex';
  //       }
  //     } else if (e.key === 'ArrowUp') {
  //       e.preventDefault();
  //       details.innerHTML = '';
  //       if (cursor.style.display === 'inline-flex') {
  //         cursor.style.display = 'none';
  //       }
  //       if (suggestionIndex !== -1) {
  //         suggestions[suggestionIndex].classList.remove('active');
  //       }
  //       suggestionIndex--;
  //       if (suggestionIndex === -1) {
  //         if (input !== '') {
  //           zetsu.innerText = input;
  //         } else {
  //           zetsu.innerText = '';
  //         }
  //       }
  //       if (suggestionIndex < -1) {
  //         suggestionIndex = suggestions.length - 1;
  //       }
  //       if (suggestionIndex !== -1) {
  //         suggestions[suggestionIndex].classList.add('active');
  //         let suggestedCommand = suggestions[suggestionIndex].querySelector('.suggestion-command').innerText;
  //         let suggestedCommandID = suggestions[suggestionIndex].querySelector('.suggestion-command').dataset.id;
  //         let title = commands[suggestedCommand.split(' ')[0]].hints[suggestedCommandID].title;
  //         let description = commands[suggestedCommand.split(' ')[0]].hints[suggestedCommandID].description;
  //         zetsu.innerText = suggestedCommand;
  //         // Display suggestion details
  //         if (suggestions.length !== 0 && suggestionIndex !== -1) {
  //           displayDetails(title, description);
  //         } else {
  //           details.innerHTML = '';
  //         }
  //         suggestions[suggestionIndex].scrollIntoView({
  //           block: 'nearest',
  //           inline: 'end',
  //           behavior: 'smooth',
  //         });
  //       }
  //       if (zetsu.innerText !== '') {
  //         focusAtEnd();
  //       } else {
  //         cursor.style.display = 'inline-flex';
  //       }
  //     }
  //   } else {
  //     suggestionIndex = -1;
  //   }
  // });
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
      zetsu.innerText = '';
      cursor.style.display = 'inline-flex';
      suggestionsList.innerHTML = '';
      details.innerHTML = '';
      suggestions = [];
      showZetsuInit();
    }
  });
  if (zetsu.innerText.trim().length == 0) {
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
      prevInputs.push(input);
      localStorage.setItem('prevInputs', JSON.stringify(prevInputs));
      console.log(prevInputs);
      clearZetsu();
      let parts = input.split(' ');
      let command = parts[0].toLowerCase();
      if (commands[command]) {
        commands[command].run(input);
      } else {
        returnInput(input);
        returnNullAndHelp(command, outputDelay[0]);
      }
    }
  }
});
