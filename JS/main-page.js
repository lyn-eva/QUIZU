const questionID = document.getElementById("question").lastElementChild;
const choices = document.getElementById("choices");
const boolean = document.getElementById("boolean");

const current_no = document.getElementById("no.");
const bar = document.getElementById("bar");
const points = document.getElementById("point");
const final = document.getElementById("omedetou");

// parse localstorage
const questions = JSON.parse(localStorage.getItem("questions"));

let q_no = 0,
  score = 0,
  max_q = questions.length;
startGame();

function startGame() {
  // dont ne"d
  nextQuestion(questions[q_no]);
}

// next question
function nextQuestion(questObj) {
  questionID.innerHTML = questObj["question"];
  generateQuestion(questObj);
  current_no.innerHTML = `${q_no + 1} / ${max_q}`;
  bar.style.width = `${((q_no + 1) / max_q) * 100}%`;
}

function generateQuestion(question) {
  const choices_array = shuffle(
    question["incorrect_answers"].concat(question["correct_answer"])
  );

  choices_array.forEach((iter) => {
    const div = document.createElement("div");
    div.classList.add("choice");
    if (question.type == "multiple") {
      div.innerHTML = `<span>A</span><p class="choice-text">${iter}</p>`;
    } else {
      div.classList.add("bool");
      div.innerHTML = `<p class="choice-text">${iter}</p>`;
    }

    choices.appendChild(div);
    div.addEventListener("click", settle);
  });
}

function settle(e) {
  let clc = "false";
  const answer = e.target;
  const temp = answer.lastElementChild.innerHTML;

  clc = temp == questions[q_no]["correct_answer"];
  score += clc ? 10 : 0;
  points.innerHTML = score;

  const unmount = () => {
    if (q_no === questions.length) return omedetou(score, questions.length);
    answer.classList.remove(clc);
    q_no++;
    // unmount
    while (choices.firstChild) choices.removeChild(choices.firstChild);
    nextQuestion(questions[q_no]);
  };

  answer.classList.add(clc);
  setTimeout(unmount, 700);
  clearTimeout(unmount);
}

function shuffle(que) {
  let mixed = [], index;
  while (que.length > 0) {
    index = (Math.random() * que.length) | 0;
    mixed.push(que[index]);
    que.splice(index, 1);
  }
  return mixed;
}

function omedetou(res, tot) {
  document.getElementById("wrapper").style.display = "none";
  final.style.display = "block";
  final.lastElementChild.innerHTML = `You got <span>${res}</span> out of <span>${tot}0</span>.`;
}
