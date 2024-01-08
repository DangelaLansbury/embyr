// --- DOM VARIABLES ---

// Workbook components
let workbook = document.querySelector('.workbook'); // Main container
// Terminal components
let thread = document.querySelector('.thread'); // Thread
let help1 = document.querySelector('#help1'); // Help container for first set of commands
// embyr components
let embyrContainer = document.querySelector('.embyr-container'); // Full embyr container for input, suggestions, and details
let embyrInit = document.querySelector('.embyr-init'); // embyr init container
let embyrInitContent = document.querySelector('.embyr-init-content'); // embyr init text
let standardInitMsg = `Command suggestions and info will appear here.`;
let firstTime = document.querySelector('#firstTime'); // First time hint
let embyrHelper = document.querySelector('.embyr-helper'); // embyr suggestions and description container
// embyr input
let moniker = document.querySelector('.moniker'); // User moniker
let embyr = document.querySelector('.embyr-input-text'); // embyr input field
let cursor = document.querySelector('.cursor'); // embyr input fake cursor
let ghost = document.querySelector('.ghost-input'); // embyr input ghost text
let running = document.querySelector('.running'); // embyr running indicator
let history = []; // embyr input history
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

// --- HELP BAR ---

// Help bar hints
const historyHint = `<div class="help-bar-hint">
    <div class="help-bar-cmd thicc">&#x2191;/&#x2193;</div>
    <div class="help-bar-text">history</div>
  </div>`;

const helpHint = `<div class="help-bar-hint">
    <div class="help-bar-cmd thicc">help</div>
    <div class="help-bar-text">more info</div>
  </div>`;

const quitHint = `<div class="help-bar-hint">
    <div class="help-bar-cmd thicc">q</div>
    <div class="help-bar-text">quit</div>
  </div>`;

const tabHint = `<div class="help-bar-hint">
    <div class="help-bar-cmd thicc">tab</div>
    <div class="help-bar-text">autocomplete</div>
  </div>`;

const initHints = helpHint;

const defaultHints = historyHint + helpHint;

// --- FOCUS ON EDITOR ---

window.onload = () => {
  // Check if user has visited before
  let visited = localStorage.getItem('visited');
  if (visited === null) {
    // Show first time message
    embyrInitContent.innerHTML = `Hi there. This is embyr, a CLI for orchestrating stem cells.<br>Not sure what to run? Describe what you want to do, and I'll suggest commands down here.`;
    // Set visited to true
    localStorage.setItem('visited', JSON.stringify(true));
  } else {
    // Show standard init message
    embyrInitContent.innerHTML = standardInitMsg;
  }
  // Check if user has history
  let history = localStorage.getItem('history');
  if (history !== null) {
    history = JSON.parse(history);
  } else {
    history = [];
  }
  // Set default help bar hints
  help1.innerHTML = initHints;
  // Set default moniker
  moniker.innerText = 'neo@embyr:~$';
  // Focus on embyr
  embyr.focus();
};

const focusAtEnd = () => {
  if (embyr.innerText.toString().trim().length > 0) {
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(embyr.childNodes[0], embyr.innerText.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
};

// Listening for click and focusing at end of editor
workbook.addEventListener('click', function (e) {
  // Focus on embyr if target is not thread text
  if (!e.target.classList.contains('thread-text')) {
    embyr.focus();
  }
  // Set cursor at end of editor if target is not embyr
  if (e.target !== embyr) {
    focusAtEnd();
  }
});

// --- CURSOR ---

// Hide cursor if input loses focus
embyr.addEventListener('blur', function (e) {
  cursor.style.display = 'none';
});

// Show cursor if input gains focus
embyr.addEventListener('focus', function (e) {
  if (embyr.innerText.toString().trim().length == 0) {
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

// toggle embyr helper display between init and suggestions if there are suggestions
const hideEmbyrInit = () => {
  embyrInit.classList.add('hidden');
  embyrHelper.classList.remove('hidden');
};

const showEmbyrInit = () => {
  embyrInitContent.innerHTML = standardInitMsg;
  embyrInit.classList.remove('hidden');
  embyrHelper.classList.add('hidden');
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
    if (help1.classList.contains('hidden')) {
      help1.classList.remove('hidden');
    } else if (!help1.classList.contains('hidden')) {
      help1.classList.add('hidden');
    }
  }
});

// Disable spacebar if input is empty
embyr.addEventListener('keydown', function (e) {
  if (e.key === ' ' && embyr.innerText.toString().trim().length == 0) {
    e.preventDefault();
  }
});

// --- SUGGESTIONS ---

const displayShort = (toDo, description) => {
  hideEmbyrInit();
  details.innerHTML = '';
  let newDetails = document.createElement('div');
  newDetails.className = 'suggestion-details suggestion';
  newDetails.innerHTML = `<div class="sweetgrass thicc">${toDo}</div><div class="description">${description}</div>`;
  details.appendChild(newDetails);
};

const displayFull = (toDo, description, syntax) => {
  hideEmbyrInit();
  details.innerHTML = '';
  let newDetails = document.createElement('div');
  newDetails.className = 'suggestion-details suggestion';
  newDetails.innerHTML = `<div class="sweetgrass thicc"><span class="stone regular">Command:</span> ${toDo}</div>
  <div class="stone" style="margin-bottom: 0.75rem;"><span class="lilac thicc">TAB</span> to paste command into command line</div>
  <div>${description}</div>
  <div class="honey"><span class="stone">Explanation:</span> ${syntax}</div>`;
  details.appendChild(newDetails);
};

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
let suggestionsArray = [];
let suggestionAvailable = '';
embyr.addEventListener('input', function () {
  input = this.innerText;
  // Check if input is empty
  if (input !== '') {
    cursor.style.display = 'none';
  } else {
    cursor.style.display = 'inline-flex';
  }
  // Clear suggestions and details
  suggestionsList.innerHTML = '';
  ghost.innerText = '';
  details.innerHTML = '';
  suggestionAvailable = '';
  let inputWords = input.split(' ');
  // Ghost input
  let ghostInput = '';
  for (let cmd in commands) {
    // Check if command starts with input
    if (inputWords[0].toLowerCase() !== cmd && inputWords.length === 1) {
      if (cmd.startsWith(inputWords[0].toLowerCase()) && inputWords[0]) {
        // insert remaining command characters into ghost-input
        let remainingCmd = cmd.substring(inputWords[0].length);
        ghostInput = remainingCmd;
        displayShort(commands[cmd].do, commands[cmd].description);
      }
    } else if (inputWords[0].toLowerCase() === cmd && inputWords.length > 1) {
      details.innerHTML = '';
      let subs = commands[cmd].subCommands;
      for (let sub in subs) {
        // Check if subCommand starts with input
        if (inputWords[1].toLowerCase() !== sub && inputWords.length === 2) {
          if (sub.startsWith(inputWords[1].toLowerCase()) && inputWords[1]) {
            // insert remaining command characters into ghost-input
            let remainingCmd = sub.substring(inputWords[1].length);
            ghostInput = remainingCmd;
            let subDetails = subs[sub];
            displayShort(subDetails.do, subDetails.description);
          }
        } else if (inputWords[1].toLowerCase() === sub && inputWords.length === 3) {
          details.innerHTML = '';
          let ops = subs[sub].ops;
          for (let op in ops) {
            // Check if op starts with input
            if (inputWords[2].toLowerCase() !== op && inputWords[2] !== '' && inputWords.length === 3) {
              if (op.startsWith(inputWords[2].toLowerCase())) {
                // insert remaining command characters into ghost-input
                let remainingCmd = op.substring(inputWords[2].length);
                ghostInput = remainingCmd;
                let opDetails = ops[op];
                displayShort(opDetails.do, opDetails.description);
              }
            }
          }
        }
      }
    }
  }
  ghost.innerText = ghostInput;
  // Suggestions
  suggestions = document.querySelectorAll('.suggestion');
  suggestionsArray = [];
  for (let cmd in commands) {
    let keywords = commands[cmd].keywords;
    // Fuzzy search input and keywords
    for (let i = 0; i < inputWords.length; i++) {
      for (let j = 0; j < keywords.length; j++) {
        let levDist = levenshteinDistance(inputWords[i].replace(/-/g, '').replace(/\//g, ''), keywords[j].replace(/-/g, '').replace(/\//g, ''));
        let similarity = 1 - levDist / Math.max(inputWords[i].length, keywords[j].length);
        if (similarity > 0.75) {
          // Search through subcommands object for each command
          let subs = commands[cmd].subCommands;
          for (let sub in subs) {
            let ops = subs[sub].ops;
            let subKeywords = subs[sub].keywords;
            // Fuzzy search input and subKeywords
            for (let i = 0; i < inputWords.length; i++) {
              for (let j = 0; j < subKeywords.length; j++) {
                let levDist = levenshteinDistance(inputWords[i].replace(/-/g, '').replace(/\//g, ''), subKeywords[j].replace(/-/g, '').replace(/\//g, ''));
                let similarity = 1 - levDist / Math.max(inputWords[i].length, subKeywords[j].length);
                if (similarity > 0.75) {
                  // Search through ops object for each command
                  for (let op in ops) {
                    let opsKeywords = ops[op].keywords;
                    for (let i = 0; i < inputWords.length; i++) {
                      for (let j = 0; j < opsKeywords.length; j++) {
                        // Fuzzy search input and opsKeywords
                        let levDist = levenshteinDistance(inputWords[i].replace(/-/g, '').replace(/\//g, ''), opsKeywords[j].replace(/-/g, '').replace(/\//g, ''));
                        let similarity = 1 - levDist / Math.max(inputWords[i].length, opsKeywords[j].length);
                        if (similarity > 0.75) {
                          let toDo = ops[op].do;
                          // Check if suggestion has already been suggested
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
                              subCommand: sub,
                              op: op,
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
                              if (suggestionsArray.length > 0) {
                                suggestionAvailable = suggestionsArray[0].command;
                                // Display suggestion details for first suggestion
                                let firstSuggestion = commands[suggestionsArray[0].parentCommand].subCommands[suggestionsArray[0].subCommand].ops[suggestionsArray[0].op];
                                let syntax = firstSuggestion.syntax;
                                displayFull(`${suggestionsArray[0].command}`, firstSuggestion.description, syntax);
                              } else {
                                suggestionAvailable = '';
                              }
                            }
                          }
                        } else {
                          // Suggest the subcommand if there are no matching ops
                          let toDo = subs[sub].do;
                          // Check if suggestion has already been suggested
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
                              subCommand: sub,
                              op: '',
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
                              if (suggestionsArray.length > 0) {
                                suggestionAvailable = suggestionsArray[0].command;
                                // Display suggestion details for first suggestion
                                let firstSuggestion = commands[suggestionsArray[0].parentCommand].subCommands[suggestionsArray[0].subCommand];
                                let syntax = firstSuggestion.syntax;
                                displayFull(`${suggestionsArray[0].command}`, firstSuggestion.description, syntax);
                              } else {
                                suggestionAvailable = '';
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // If there is a suggestion available, show tab hint
  if (suggestionAvailable !== '') {
    help1.innerHTML = tabHint;
  } else {
    if (history.length === 0) {
      help1.innerHTML = initHints;
    } else {
      help1.innerHTML = defaultHints;
    }
  }
  // If there is nothing to suggest, show init message
  if (suggestionsArray.length === 0 && details.innerHTML === '') {
    showEmbyrInit();
  }
});

// Listen for tab and whatever's in ghost-input to input, or if there's a suggestion replace the input with the suggested command
embyr.addEventListener('keydown', function (e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    if (ghost.innerText !== '') {
      embyr.innerText += ghost.innerText;
      suggestionAvailable = '';
      focusAtEnd();
      ghost.innerText = '';
    } else if (suggestionAvailable !== '') {
      embyr.innerText = suggestionAvailable;
      suggestionAvailable = '';
      ghost.innerText = '';
      focusAtEnd();
      displayShort('', '', '');
    }
  }
});

// --- POPULATING SUGGESTION DETAILS ---

// Listen for up and down arrow keys to go back through previous commands and insert into embyr
let historyIndex = 0;
embyr.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp') {
    if (history.length === 0) {
      return;
    }
    e.preventDefault();
    if (historyIndex < history.length) {
      historyIndex++;
      embyr.innerText = history[history.length - historyIndex];
    } else if (historyIndex === history.length) {
      historyIndex = 0;
      embyr.innerText = input;
    } else {
      embyr.innerText = input;
    }
    // check if input is empty
    if (embyr.innerText.toString().trim().length == 0) {
      cursor.style.display = 'inline-flex';
    } else {
      cursor.style.display = 'none';
      focusAtEnd();
    }
  } else if (e.key === 'ArrowDown') {
    if (history.length === 0) {
      return;
    }
    e.preventDefault();
    if (historyIndex > 1) {
      historyIndex--;
      embyr.innerText = history[history.length - historyIndex];
    } else if (historyIndex === 1) {
      historyIndex--;
      embyr.innerText = input;
    } else {
      embyr.innerText = input;
    }
    // check if input is empty
    if (embyr.innerText.toString().trim().length == 0) {
      cursor.style.display = 'inline-flex';
    } else {
      cursor.style.display = 'none';
      focusAtEnd();
    }
  }
});

// Reset suggestions if all text is deleted at once
embyr.addEventListener('keydown', function (e) {
  if (e.key === 'Backspace' && embyr.innerText.trim().length == 1) {
    clearEmbyr();
    suggestionAvailable = '';
  }
});

// Clear editor if user presses enter, refocus on editor, and show fake cursor
const clearEmbyr = () => {
  input = '';
  embyr.innerText = '';
  ghost.innerText = '';
  embyr.focus();
  cursor.style.display = 'inline-flex';
  details.innerHTML = '';
  suggestionAvailable = '';
  showEmbyrInit();
};

// Listening for command and executing function when user presses enter
embyr.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    let input = embyr.innerText.trim();
    // Execute commands and return output
    if (input !== '') {
      history.push(input);
      localStorage.setItem('history', JSON.stringify(history));
      console.log(history);
      historyIndex = 0;
      clearEmbyr();
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
