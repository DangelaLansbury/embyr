let cliBlockWelcome = document.getElementById('cliBlockWelcome');
let cliWelcome = document.getElementById('cliWelcome');
let cliBlockHelp = document.getElementById('cliBlockHelp');
let cliHelp = document.getElementById('cliHelp');
let cliBlockDemo = document.getElementById('cliBlockDemo');
let cliDemo = document.getElementById('cliDemo');
let editorTimeBlock = document.getElementById('intentionBlockTime');
let editorTime = document.getElementById('intTime');
let truthInput = document.querySelector('input[name="truth"]');
let touchInput = document.querySelector('input[name="touch"]');
let timeInput = document.querySelector('input[name="time"]');

// command booleans

const commands = {
  help: false,
  clear: false,
  achieve: false,
  learn: false,
  innovate: false,
  explore: false,
  connect: false,
  fulfill: false,
};

// focus on truth editor at start

cliWelcome.focus();

// Adding event listeners

function addInputEventListener(elem) {
  elem.addEventListener('input', function () {
    let editorID = this.id;
    let goalEditor = document.getElementById(editorID);
    let goal = goalEditor.innerText;
    console.log(goal);
    if (artisanWords.some((word) => goal.toLowerCase().includes(word))) {
      templateExpSelector.style.backgroundColor = '#D3869B';
    } else {
      templateExpSelector.style.backgroundColor = '#8EC07C';
    }
    if (sentimentalistWords.some((word) => goal.toLowerCase().includes(word))) {
      block2Selector.style.backgroundColor = '#FABD2F';
    } else {
      block2Selector.style.backgroundColor = '#8EC07C';
    }
    if (adventurerWords.some((word) => goal.toLowerCase().includes(word))) {
      block3Selector.style.backgroundColor = '#FD6D5C';
    } else {
      block3Selector.style.backgroundColor = '#8EC07C';
    }
  });
}

function listenForEnter(elem) {
  elem.addEventListener('keydown', function (e) {
    let editorID = this.id;
    let editor = document.getElementById(editorID);
    let editorContent = editor.value.toLowerCase();
    if (e.keyCode === 13) {
      e.preventDefault();
      if (editorContent === 'help') {
        cliBlockHelp.classList.toggle('hidden');
        cliHelp.focus();
        cliBlockWelcome.classList.toggle('hidden');
        selectorGroup.classList.toggle('hidden');
      } else if (editorContent === 'clear') {
        cliWelcome.value = '';
        cliWelcome.focus();
      } else if (editorContent.includes('achieve')) {
        commands.achieve = true;
        cliBlockDemo.classList.toggle('hidden');
        cliDemo.focus();
        cliBlockWelcome.classList.toggle('hidden');
        selectorGroup.classList.toggle('hidden');
      } else {
        return;
      }
    }
  });
}

function hidePlaceholder(elem) {
  elem.addEventListener('focus', function () {
    let editorID = this.id;
    let goalEditor = document.getElementById(editorID);
    if (goalEditor.innerText == experiencePlaceholder) {
      goalEditor.innerText = '';
      goalEditor.style.color = '#E38A57';
    }
  });
}

function showPlaceholder(elem) {
  elem.addEventListener('blur', function () {
    let editorID = this.id;
    let goalEditor = document.getElementById(editorID);
    if (goalEditor.innerText == '') {
      goalEditor.innerText = experiencePlaceholder;
      goalEditor.style.color = 'grey';
    }
  });
}

listenForEnter(cliWelcome);
addInputEventListener(cliWelcome);

// ------------------------------

// Goal placeholders
let experiencePlaceholder =
  'I want to… swim in the Pacific… see Springsteen in concert with my daughter… try chocolate-covered chapulines in Mexico City… read the works of Shakespeare in their original text…';

// Building the archetype string
let archetypeString = '';

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

editorTime.addEventListener('input', function () {
  let timeText = editorTime.innerText;
  console.log(timeText);
  if (artisanWords.some((word) => timeText.toLowerCase().includes(word))) {
    document.getElementById('templateBlock3Selector').style.backgroundColor =
      'green';
  } else {
    document.getElementById('templateBlock3Selector').style.backgroundColor =
      'red';
  }
});

// Path: zetsu-00/public/src/book.js

// ------------------------------

let templateCounter = 0;

function convertCounter(n) {
  n = String(templateCounter);
  if (n.length < 2) {
    n = '0' + n;
  }
  return n;
}

let parentSection = document.getElementById('content');
let selectorGroup = document.getElementById('selectorGroup');

let templateExp = document.getElementById('experienceTemplate');
let templateExpSelector = document.getElementById('templateExpSelector');

let block2 = document.getElementById('templateBlock2');
let block2Selector = document.getElementById('templateBlock2Selector');
let block3 = document.getElementById('templateBlock3');
let block3Selector = document.getElementById('templateBlock3Selector');

templateExpSelector.addEventListener('click', function () {
  let newTemplate = templateExp.cloneNode(true);
  let newTemplateHeader = newTemplate.children[0];
  let newTemplateSubheader = newTemplate.children[1];
  let newTemplateExample = newTemplateSubheader.children[1];
  let newID = convertCounter(templateCounter);
  newTemplate.id = 'experienceTemplate' + newID;
  newTemplateHeader.id = 'experienceTemplateHeader' + newID;
  newTemplateExample.id = 'experienceTemplateExample' + newID;
  parentSection.insertBefore(newTemplate, selectorGroup);
  newTemplate.classList.toggle('hidden');
  addInputEventListener(newTemplateExample);
  hidePlaceholder(newTemplateExample);
  showPlaceholder(newTemplateExample);
  revealCommands(newTemplateExample);
  templateCounter++;
  selectorGroup.style.display = 'none';
});

// ------------------------------

let viewConsiderations = document.querySelector('.considerations-toggle');
let considerations = document.getElementById('considerationsPanel');

viewConsiderations.addEventListener('click', function () {
  considerations.classList.toggle('hidden');
  console.log('considerations toggled');
});

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
