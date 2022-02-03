const questionID = document.getElementById('question').lastElementChild;
const choices = document.getElementById('choices');
const boolean = document.getElementById('boolean');

const current_no = document.getElementById('no.');
const bar = document.getElementById('bar');
const points = document.getElementById('point');
const final = document.getElementById('omedetou');

// parse localstorage
const questions = JSON.parse(localStorage.getItem('questions'));

let q_no = 0, max_q = questions.length;
startGame();

function startGame() {// dont ne"d
   nextQuestion(questions[q_no]);
}

// next question
function nextQuestion(questObj) {
   questionID.innerHTML = questObj["question"]
   generateQuestion(questObj);
   current_no.innerHTML = `${q_no+1} / ${max_q}`;
   bar.style.width = `${((q_no+1)/max_q) * 100}%`;
}

function generateQuestion(obj) {
   let choices_array = obj["incorrect_answers"].concat(obj["correct_answer"])
   choices_array = shuffle(choices_array)

   choices_array.forEach( iter => {
      let createDiv = document.createElement('div');
      createDiv.classList.add("choice");
      if (obj.type == 'multiple') {
         createDiv.innerHTML = `<span>A</span><p class="choice-text">${iter}</p>`
      }
      else {
         createDiv.classList.add("bool");
         createDiv.innerHTML = `<p class="choice-text">${iter}</p>`
      }
         
      choices.appendChild(createDiv);
      createDiv.addEventListener('click', settle);
   });
}

function settle(e) {
   let clc = 'false';
   const temp = e.target.lastElementChild.innerHTML;

   if (temp == questions[q_no]["correct_answer"]) {
      clc = 'true';   
      points.innerHTML = parseInt(points.innerHTML) + 10; // this is legit 0-0-
   } 

   e.target.classList.add(clc);
   setTimeout(() => {
      e.target.classList.remove(clc);
      q_no++;
      
      while(choices.firstChild)
         choices.removeChild(choices.firstChild);

      if (q_no < questions.length)
         nextQuestion(questions[q_no]);
      else 
         omedetou(points.innerHTML, questions.length);
   }, 700);
}

function shuffle(que) {
   let mixed = [], rand, index;
   while (que.length > 0) {
      index = Math.random()*que.length | 0;
      rand = que[index];
      mixed.push(rand);
      que.splice(index, 1);
   }
   return mixed;
}

function omedetou(res, tot) {
   document.getElementById('wrapper').style.display = "none";
   final.style.display = "block"
   final.lastElementChild.innerHTML = `You got <span>${res}</span> out of <span>${tot}0</span>.`;
}