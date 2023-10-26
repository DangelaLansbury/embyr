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
let ghost = document.querySelector('.ghost-input'); // Zetsu input ghost text
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
    // showZetsuInit();
  }
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

// --- SUGGESTIONS ---

// display suggestions and detail
const populateSuggestion = (command, parent, sub, op, arg) => {
  let suggestion = document.createElement('div');
  suggestion.className = 'suggestion thicc sweetgrass';
  suggestion.innerHTML = `<div class="cmd-icon"><img src="public/icons/${op}.svg" class="icon-svg" alt="icon for ${op}" /></div><div class="suggestion-command" data-cmd="${parent}" data-sub="${sub}" data-op="${op}" data-arg=${arg}>${command}</div>`;
  suggestionsList.appendChild(suggestion);
};

const displayDetails = (title, description) => {
  toggleZetsuInit();
  details.innerHTML = '';
  let newDetails = document.createElement('div');
  newDetails.className = 'suggestion-details';
  newDetails.innerHTML = `<div class="title sweetgrass medium thicc">${title}</div><div class="description">${description}</div>`;
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
zetsu.addEventListener('input', function () {
  input = this.innerText;
  ghost.innerText = '';
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
  // Ghost input
  let ghostInput = '';
  for (let cmd in commands) {
    // Check if command starts with input
    if (inputWords[0].toLowerCase() !== cmd) {
      if (cmd.startsWith(inputWords[0].toLowerCase()) && inputWords[0] !== '') {
        // insert remaining command characters into ghost-input
        let remainingCmd = cmd.substring(inputWords[0].length);
        ghostInput = remainingCmd;
        displayDetails(commands[cmd].title, commands[cmd].description);
      }
    } else if (inputWords[0].toLowerCase() === cmd) {
      details.innerHTML = '';
      let subs = commands[cmd].subCommands;
      for (let sub in subs) {
        // Check if subCommand starts with input
        if (inputWords[1].toLowerCase() !== sub) {
          if (sub.startsWith(inputWords[1].toLowerCase()) && inputWords[1] !== '') {
            // insert remaining command characters into ghost-input
            let remainingCmd = sub.substring(inputWords[1].length);
            ghostInput = remainingCmd;
            let subDetails = subs[sub];
            displayDetails(subDetails.title, subDetails.description);
          }
        } else if (inputWords[1].toLowerCase() === sub) {
          details.innerHTML = '';
          let ops = subs[sub].ops;
          for (let op in ops) {
            // Check if op starts with input
            if (inputWords[2].toLowerCase() !== op) {
              if (op.startsWith(inputWords[2].toLowerCase()) && inputWords[2] !== '') {
                // insert remaining command characters into ghost-input
                let remainingCmd = op.substring(inputWords[2].length);
                ghostInput = remainingCmd;
                let opDetails = ops[op];
                displayDetails(opDetails.title, opDetails.description);
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
        let levDist = levenshteinDistance(inputWords[i], keywords[j]);
        let similarity = 1 - levDist / Math.max(inputWords[i].length, keywords[j].length);
        if (similarity > 0.66) {
          // Search through subcommands object for each command
          let subs = commands[cmd].subCommands;
          for (let sub in subs) {
            let ops = subs[sub].ops;
            let subKeywords = subs[sub].keywords;
            // Fuzzy search input and subKeywords
            for (let i = 0; i < inputWords.length; i++) {
              for (let j = 0; j < subKeywords.length; j++) {
                let levDist = levenshteinDistance(inputWords[i], subKeywords[j]);
                let similarity = 1 - levDist / Math.max(inputWords[i].length, subKeywords[j].length);
                if (similarity > 0.66) {
                  // Search through ops object for each command
                  for (let op in ops) {
                    let opsKeywords = ops[op].keywords;
                    for (let i = 0; i < inputWords.length; i++) {
                      for (let j = 0; j < opsKeywords.length; j++) {
                        // Fuzzy search input and opsKeywords
                        let levDist = levenshteinDistance(inputWords[i], opsKeywords[j]);
                        let similarity = 1 - levDist / Math.max(inputWords[i].length, opsKeywords[j].length);
                        if (similarity > 0.66) {
                          let toDo = ops[op].do;
                          let argument = '';
                          // check if input contains any accepted arguments
                          let acceptedArgs = ops[op].acceptedArgs;
                          acceptedArgs.forEach((arg) => {
                            // remove hyphens and slashes from input word and argument
                            let argCheckInput = inputWords[i].replace(/-/g, '').replace(/\//g, '');
                            let argCheckArg = arg.replace(/-/g, '').replace(/\//g, '');
                            // if input word matches argument, add argument to command
                            if (argCheckInput.toLowerCase() === argCheckArg.toLowerCase()) {
                              argument = arg;
                              // check if op has an argFlag
                              if (ops[op].argFlag !== undefined) {
                                toDo += ` ${ops[op].argFlag} ${arg}`;
                              } else {
                                toDo += ` ${arg}`;
                              }
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
                              subCommand: sub,
                              op: op,
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
                              if (!zetsu.innerText.startsWith(suggestionsArray[0].command + ' ')) {
                                populateSuggestion(suggestionsArray[0].command, suggestionsArray[0].parentCommand, suggestionsArray[0].subCommand, suggestionsArray[0].op, suggestionsArray[0].argument);
                              }
                              // Display suggestion details for first suggestion
                              let firstSuggestion = commands[suggestionsArray[0].parentCommand].subCommands[suggestionsArray[0].subCommand].ops[suggestionsArray[0].op];
                              displayDetails(firstSuggestion.title, firstSuggestion.description);
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
  toggleZetsuInit();
});
// Listen for tab and whatever's in ghost-input to input, or if there's a suggestion replace the input with the suggested command
zetsu.addEventListener('keydown', function (e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    if (ghost.innerText !== '') {
      zetsu.innerText += ghost.innerText;
      focusAtEnd();
      ghost.innerText = '';
    } else if (suggestions.length !== 0) {
      grabSuggestionData(0);
      ghost.innerText = '';
    }
  }
});

// --- POPULATING SUGGESTION DETAILS ---

let suggestionIndex = -1;
// Function to grab data from active suggestion
const grabSuggestionData = (indexToUse) => {
  suggestions = document.querySelectorAll('.suggestion');
  let suggCmd = suggestions[indexToUse].querySelector('.suggestion-command').innerText;
  let suggCmdPar = suggestions[indexToUse].querySelector('.suggestion-command').dataset.cmd;
  let suggCmdSub = suggestions[indexToUse].querySelector('.suggestion-command').dataset.sub;
  let suggCmdOp = suggestions[indexToUse].querySelector('.suggestion-command').dataset.op;
  let suggCmdArg = suggestions[indexToUse].querySelector('.suggestion-command').dataset.arg;
  console.log(suggCmdPar, suggCmdSub, suggCmdArg);
  let title = commands[suggCmdPar].subCommands[suggCmdSub].ops[suggCmdOp].title;
  let description = commands[suggCmdPar].subCommands[suggCmdSub].ops[suggCmdOp].description;
  zetsu.innerText = suggCmd;
  focusAtEnd();
  // displayDetails(suggCmd, description);
  // Replace input with suggestion if user wants it
  // if (indexToUse === 0 && suggestionIndex === -1) {
  //   zetsu.innerText = input;
  // } else {
  //   zetsu.innerText = suggCmd;
  //   focusAtEnd();
  // }
};
// Listen for up and down arrow keys to cycle through suggestions
// zetsu.addEventListener('keydown', function (e) {
//   // Check if suggestions are present
//   suggestions = document.querySelectorAll('.suggestion');
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
//           grabSuggestionData(0);
//         } else {
//           zetsu.innerText = '';
//         }
//       } else if (suggestionIndex !== -1) {
//         suggestions[suggestionIndex].classList.add('active');
//         grabSuggestionData(suggestionIndex);
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
//           grabSuggestionData(0);
//         } else {
//           zetsu.innerText = '';
//         }
//       }
//       if (suggestionIndex < -1) {
//         suggestionIndex = suggestions.length - 1;
//       }
//       if (suggestionIndex !== -1) {
//         suggestions[suggestionIndex].classList.add('active');
//         grabSuggestionData(suggestionIndex);
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
    clearZetsu();
  }
});

// Clear editor if user presses enter, refocus on editor, and show fake cursor
const clearZetsu = () => {
  zetsu.innerText = '';
  ghost.innerText = '';
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

// Bonsai thing
// HTML:
// <div class="hidden" id="bonsaiContainer"></div>
// CSS:
// #bonsaiContainer {
//   font-family: 'Courier New', monospace;
//   position: relative;
//   width: 400px;
//   height: 400px;
//   background-color: #1e1e1e;
// }
// .char {
//   position: absolute;
//   transition: opacity 0.2s;
// }
// // JS:
// const bonsaiData = [
//   [' ', ' ', ' ', '#', ' ', ' ', ' '],
//   [' ', ' ', '/', '|', '\\', ' ', ' '],
//   [' ', '/', ' ', '|', ' ', '\\', ' '],
//   ['/', ' ', ' ', '|', ' ', ' ', '\\'],
// ];

// const container = document.getElementById('bonsaiContainer');
// container.classList.remove('hidden');
// const charWidth = 20;
// const charHeight = 20;

// let delay = 0;
// for (let y = 0; y < bonsaiData.length; y++) {
//   for (let x = 0; x < bonsaiData[y].length; x++) {
//     const char = bonsaiData[y][x];
//     const charDiv = document.createElement('div');
//     charDiv.classList.add('char');
//     charDiv.style.left = x * charWidth + 'px';
//     charDiv.style.top = y * charHeight + 'px';
//     charDiv.style.opacity = 0;
//     charDiv.textContent = char;
//     container.appendChild(charDiv);

//     setTimeout(() => {
//       charDiv.style.opacity = 1;
//     }, delay);
//     delay += 50; // Increase for slower animation
//   }
// }
