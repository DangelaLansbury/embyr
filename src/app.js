let cliBlock = document.querySelector('#cliBlock');
let prompt = document.querySelector('#cliPrompt');
let cliEditor = document.querySelector('#cliEditor');
let cliBlockHelp = document.querySelector('#cliBlockHelp');
let cliHelp = document.querySelector('#cliHelp');

// state management

let init = true;
let user = '';
let diagnosis = false;
let disease = '';

// commands

const commands = [
  {
    name: 'help',
    active: false,
    color: '#83A598',
  },
  {
    name: 'achieve',
    active: false,
    color: '#B8BB26',
  },
  {
    name: 'connect',
    active: false,
    color: '#D3869B',
  },
  {
    name: 'contribute',
    active: false,
    color: '#8EC07C',
  },
  {
    name: 'explore',
    active: false,
    color: '#FD6D5C',
  },
  {
    name: 'learn',
    active: false,
    color: '#FABD2F',
  },
];

// focus on CLI editor at start

cliEditor.focus();

// Adding event listeners

// function addInputEventListener(elem) {
//   elem.addEventListener('input', function () {
//     let editorID = this.id;
//     let goalEditor = document.getElementById(editorID);
//     let goal = goalEditor.innerText;
//     console.log(goal);
//     if (artisanWords.some((word) => goal.toLowerCase().includes(word))) {
//       templateExpSelector.style.backgroundColor = '#D3869B';
//     } else {
//       templateExpSelector.style.backgroundColor = '#8EC07C';
//     }
//     if (sentimentalistWords.some((word) => goal.toLowerCase().includes(word))) {
//       block2Selector.style.backgroundColor = '#FABD2F';
//     } else {
//       block2Selector.style.backgroundColor = '#8EC07C';
//     }
//     if (adventurerWords.some((word) => goal.toLowerCase().includes(word))) {
//       block3Selector.style.backgroundColor = '#FD6D5C';
//     } else {
//       block3Selector.style.backgroundColor = '#8EC07C';
//     }
//   });
// }

// Listening for command and changing color of text

function listenForCommand(elem) {
  elem.addEventListener('input', function () {
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorContent = editor.value.toLowerCase();
    if (!init && !diagnosis) {
      if (editorContent === commands[0].name) {
        editor.style.color = commands[0].color;
        commands[0].active = true;
      } else if (editorContent.includes(commands[1].name)) {
        editor.style.color = commands[1].color;
        commands[1].active = true;
      } else if (editorContent.includes(commands[2].name)) {
        editor.style.color = commands[2].color;
        commands[2].active = true;
      } else if (editorContent.includes(commands[3].name)) {
        editor.style.color = commands[3].color;
        commands[3].active = true;
      } else if (editorContent.includes(commands[4].name)) {
        editor.style.color = commands[4].color;
        commands[4].active = true;
      } else if (editorContent.includes(commands[5].name)) {
        editor.style.color = commands[5].color;
        commands[5].active = true;
      } else {
        editor.style.color = '#ebdbb2';
        commands.forEach((command) => (command.active = false));
      }
      return commands;
    } else {
      return;
    }
  });
}

// Listening for enter key and executing commands
function listenForEnter(elem) {
  elem.addEventListener('keydown', function (e) {
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorContent = editor.value.toLowerCase();
    if (e.keyCode === 13 && editorContent !== '') {
      e.preventDefault();
      if (init) {
        user = editor.value;
        prompt.innerHTML = `Hello, <span style="color: #83A598">${user}</span>. Can you describe your diagnosis?`;
        editor.value = '';
        editor.placeholder = 'Write your cancer type and stage...';
        editor.style.color = '#ebdbb2';
        init = false;
        diagnosis = true;
      } else if (diagnosis) {
        disease = editorContent;
        prompt.innerHTML = `With the time you have, what do you want to do?`;
        editor.value = '';
        editor.placeholder = 'Start with a command...';
        editor.style.color = '#ebdbb2';
        diagnosis = false;
      } else {
        if (commands[0].active) {
          cliBlockHelp.classList.toggle('hidden');
          cliHelp.focus();
          editor.style.color = '#ebdbb2';
        } else if (commands[1].active) {
          prompt.innerText = `You wrote ${commands[1].name}`;
          editor.value = '';
          editor.placeholder = `${commands[1].name} follow up`;
          editor.style.color = '#ebdbb2';
        } else if (commands[2].active) {
          prompt.innerText = `You wrote ${commands[2].name}`;
          editor.value = '';
          editor.placeholder = `${commands[2].name} follow up`;
          editor.style.color = '#ebdbb2';
        } else if (commands[3].active) {
          prompt.innerText = `You wrote ${commands[3].name}`;
          editor.value = '';
          editor.placeholder = `${commands[3].name} follow up`;
          editor.style.color = '#ebdbb2';
        } else if (commands[4].active) {
          prompt.innerText = `You wrote ${commands[4].name}`;
          editor.value = '';
          editor.placeholder = `${commands[4].name} follow up`;
          editor.style.color = '#ebdbb2';
        } else if (commands[5].active) {
          prompt.innerText = `You wrote ${commands[5].name}`;
          editor.value = '';
          editor.placeholder = `${commands[5].name} follow up`;
          editor.style.color = '#ebdbb2';
        } else if (editorContent === 'restart') {
          init = true;
          prompt.innerHTML = `Namaste. Welcome to <span style="color: #8ec07c">Zetsu</span>.
              What can I call you?`;
          editor.style.color = '#ebdbb2';
          editor.value = '';
          editor.placeholder = 'Write your preferred name...';
          commands.forEach((command) => (command.active = false));
        } else {
          prompt.innerText =
            "Hmm I don't understand. Write help for a list of commands.";
          editor.value = '';
          editor.style.color = '#ebdbb2';
        }
      }
    } else {
      return;
    }
  });
}

listenForEnter(cliEditor);
listenForCommand(cliEditor);

// ------------------------------

const artisanWords = [
  'work',
  'create',
  'build',
  'make',
  'finish',
  'develop',
  'produce',
  'engineer',
  'craft',
];
const sentimentalistWords = [
  'love',
  'loved',
  'care',
  'help',
  'support',
  'serve',
  'nurture',
  'teach',
  'mentor',
  'coach',
  'counsel',
  'guide',
  'protect',
  'family',
  'friend',
  'community',
  'money',
];
const adventurerWords = [
  'explore',
  'travel',
  'visit',
  'hike',
  'world',
  'mountain',
  'fitness',
  'workout',
  'sports',
  'play',
  'taste',
  'experience',
];

// Path: zetsu-00/public/src/book.js

// ------------------------------

// let templateCounter = 0;

// function convertCounter(n) {
//   n = String(templateCounter);
//   if (n.length < 2) {
//     n = '0' + n;
//   }
//   return n;
// }

// let parentSection = document.getElementById('content');
// let selectorGroup = document.getElementById('selectorGroup');

// let templateExp = document.getElementById('experienceTemplate');
// let templateExpSelector = document.getElementById('templateExpSelector');

// let block2 = document.getElementById('templateBlock2');
// let block2Selector = document.getElementById('templateBlock2Selector');
// let block3 = document.getElementById('templateBlock3');
// let block3Selector = document.getElementById('templateBlock3Selector');

// templateExpSelector.addEventListener('click', function () {
//   let newTemplate = templateExp.cloneNode(true);
//   let newTemplateHeader = newTemplate.children[0];
//   let newTemplateSubheader = newTemplate.children[1];
//   let newTemplateExample = newTemplateSubheader.children[1];
//   let newID = convertCounter(templateCounter);
//   newTemplate.id = 'experienceTemplate' + newID;
//   newTemplateHeader.id = 'experienceTemplateHeader' + newID;
//   newTemplateExample.id = 'experienceTemplateExample' + newID;
//   parentSection.insertBefore(newTemplate, selectorGroup);
//   newTemplate.classList.toggle('hidden');
//   addInputEventListener(newTemplateExample);
//   hidePlaceholder(newTemplateExample);
//   showPlaceholder(newTemplateExample);
//   revealCommands(newTemplateExample);
//   templateCounter++;
//   selectorGroup.style.display = 'none';
// });

// ------------------------------

let viewConsiderations = document.querySelector('.considerations-toggle');
let considerations = document.getElementById('considerationsPanel');

// viewConsiderations.addEventListener('click', function () {
//   considerations.classList.toggle('hidden');
//   console.log('considerations toggled');
// });

// ------------------------------

// block2Selector.addEventListener('click', function() {
//     let newBlock = block2.cloneNode(true);
//     let newID = convertCounter(templateBlockCounter);
//     newBlock.id = 'newBlock' + newID;
//     parentBlock.insertBefore(newBlock, selectorGroup);
//     newBlock.classList.toggle('hidden');
//     templateBlockCounter++;
//     console.log(newBlock.id);
// });

// block3Selector.addEventListener('click', function() {
//     let newBlock = block3.cloneNode(true);
//     let newID = convertCounter(templateBlockCounter);
//     newBlock.id = 'newBlock' + newID;
//     parentBlock.insertBefore(newBlock, selectorGroup);
//     newBlock.classList.toggle('hidden');
//     templateBlockCounter++;
//     console.log(newBlock.id);
// });

// ------------------------------

// TESTING

// // Get all the desired elements into a node list
// let testBlocks = document.querySelectorAll(".work-block-test");
// let testBlockSelectors = document.querySelectorAll(".work-block-test-selector");

// // Convert the node list into an Array so we can
// // safely use Array methods with it
// let testBlocksArray = Array.prototype.slice.call(testBlocks);
// let testBlockSelectorsArray = Array.prototype.slice.call(testBlockSelectors);

// // Loop over the array of elements
// testBlocksArray.forEach(function(elem){
//   // Assign an event handler
//   elem.addEventListener("click", function(){
//     console.log(this.id);
//     let blockID = this.id;
//     let BlockSelectorID = blockID + 'Selector';
//     let blockToToggle = document.getElementById(blockID);
//     let blockToToggleSelector = document.getElementById(BlockSelectorID);
//     blockToToggle.classList.toggle('hidden');
//     blockToToggleSelector.classList.toggle('hidden');
//   });
// });

// testBlockSelectorsArray.forEach(function(elem){
//     // Assign an event handler
//     elem.addEventListener("click", function(){
//         console.log(this.id);
//         let blockSelectorID = this.id;
//         let blockID = blockSelectorID.toString().slice(0, -8);
//         let blockToToggle = document.getElementById(blockID);
//         let blockToToggleSelector = document.getElementById(blockSelectorID);
//         blockToToggle.classList.toggle('hidden');
//         blockToToggleSelector.classList.toggle('hidden');
//     });
// });

// ------------------------------

// // Get all the desired elements into a node list
// let experienceGoals = document.querySelectorAll('.goal-editor');
// // Convert the node list into an Array so we can safely use Array methods with it
// let experienceGoalsArray = Array.prototype.slice.call(experienceGoals);
// // Loop over the array of elements
// experienceGoalsArray.forEach(function(elem){
//     // Assign an event handler
//     elem.addEventListener("input", function(){
//         console.log(this.id);
//         let editorID = this.id;
//         let inputID = editorID.toString().slice(3);
//         let experienceGoalID = document.getElementById(inputID);
//         console.log(experienceGoal);
//     });
// });

// ------------------------------

// if (artisanWords.some(word => goals.toLowerCase().includes(word))) {
//     document.getElementById('templateBlock1Selector').style.backgroundColor = 'green'
// } else {
//     document.getElementById('templateBlock1Selector').style.backgroundColor = 'red'
// }
// if (sentimentalistWords.some(word => goals.toLowerCase().includes(word))) {
//     document.getElementById('templateBlock2Selector').style.backgroundColor = 'green'
// } else {
//     document.getElementById('templateBlock2Selector').style.backgroundColor = 'red'
// }
// if (adventurerWords.some(word => experienceText.toLowerCase().includes(word))) {
//     document.getElementById('templateBlock3Selector').style.backgroundColor = 'green'
// } else {
//     document.getElementById('templateBlock3Selector').style.backgroundColor = 'red'
// }
