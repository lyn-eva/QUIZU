const questionID = document.getElementById('question').lastElementChild;
const choice_text = Array.from(document.getElementsByClassName('choice-text'));
const choices = Array.from(document.getElementsByClassName('choice'));
const current_no = document.getElementById('no.');
const bar = document.getElementById('bar');
const points = document.getElementById('point');

// parse localstorage
let q_set = JSON.parse(localStorage.getItem('questions'));
let questions = q_set["results"];
console.log(questions);

let q_no = 0, max_q = 3;
startGame();


// eve
choices.forEach( choice => {
   choice.addEventListener('click', e => {
      let index = q_no, clc = 'false', len = questions.length;
      const temp = e.target.lastElementChild.innerHTML;

      if (temp == questions[index-1]["correct_answer"]) {
         clc = true;   
         points.innerHTML = parseInt(points.innerHTML) + 10; // this is legit 0-0-
      } 

      e.target.classList.add(clc);
      setTimeout(() => {
         e.target.classList.remove(clc);
         if (index < len)
            nextQuestion(questions[index]);
      }, 700);
   })
})

// func
function startGame() {// dont ne"d
   nextQuestion(questions[q_no])
}

// next question
function nextQuestion(questObj) {
   questionID.innerHTML = questObj["question"]
   if (questObj["type"] == "multiple") {
      mcq(questObj)
   }

   q_no++;
   current_no.innerHTML = `${q_no} / ${max_q}`;
   bar.style.width = `${(q_no/max_q) * 100}%`;
}

// mcq
function mcq(obj) {
   let choices_array = obj["incorrect_answers"].concat(obj["correct_answer"])
   choices_array = shuffle(choices_array)
   choice_text.forEach( (iter, i) => {
      iter.innerHTML = choices_array[i];
   })
}

function shuffle(que) {
   let mixed = [], rand, index;
   while (que.length > 0) {
      index = Math.random()*que.length | 0;
      rand = que[index];
      mixed.push(rand);
      que.splice(index, 1);
   }
   return mixed
}