const optionBox = Array.from(document.getElementsByClassName("option-box"));
const start = document.getElementById("start");
const back = document.getElementById("back");
const welcome = document.getElementById("welcome");
const customize = document.getElementById("customize");
const startGameBtn = document.getElementById("start-game");
const spinner = document.getElementById("spinning-loader");

const optionData = {
  quizType: [
    { id: "D3", txt: "3" },
    { id: "D5", txt: "5" },
    { id: "D7", txt: "7" },
    { id: "D10", txt: "10" },
    { id: "D13", txt: "13" },
    { id: "D15", txt: "15" },
    { id: "D17", txt: "17" },
    { id: "D20", txt: "20" },
    { id: "D23", txt: "23" },
    { id: "D25", txt: "25" },
    { id: "D30", txt: "30" },
  ],
  category: [
    { id: "any", txt: "Any Category" },
    { id: "9", txt: "General Knowledge" },
    { id: "10", txt: "Entertainment: Books" },
    { id: "11", txt: "Entertainment: Film" },
    { id: "12", txt: "Entertainment: Music" },
    { id: "13", txt: "Entertainment: Musicals &amp; Theatres" },
    { id: "14", txt: "Entertainment: Television" },
    { id: "15", txt: "Entertainment: Video Games" },
    { id: "16", txt: "Entertainment: Board Games" },
    { id: "17", txt: "Science &amp; Nature" },
    { id: "18", txt: "Science: Computers" },
    { id: "19", txt: "Science: Mathematics" },
    { id: "20", txt: "Mythology" },
    { id: "21", txt: "Sports" },
    { id: "22", txt: "Geography" },
    { id: "23", txt: "History" },
    { id: "24", txt: "Politics" },
    { id: "25", txt: "Art" },
    { id: "26", txt: "Celebrities" },
    { id: "27", txt: "Animals" },
    { id: "28", txt: "Vehicles" },
    { id: "29", txt: "Entertainment: Comics" },
    { id: "30", txt: "Science: Gadgets" },
    { id: "31", txt: "Entertainment: Japanese Anime &amp; Manga" },
    { id: "32", txt: "Entertainment: Cartoon &amp; Animations" },
  ],
  difficulty: [
    { id: "any", txt: "Any difficulty" },
    { id: "easy", txt: "Easy" },
    { id: "medium", txt: "Medium" },
    { id: "hard", txt: "Hard" },
  ],
  quizType: [
    { id: "any", txt: "Any Type" },
    { id: "multiple", txt: "Multiple Choice" },
    { id: "boolean", txt: "True / False" },
  ],
};

// generate options dynamically
Object.values(optionData).forEach((type, i) => {
  const ul = document.createElement('ul');
  ul.classList.add('options');
  type.forEach(option => {
    const li = document.createElement('li');
    li.classList.add('option');
    li.setAttribute('id', option.id);
    li.innerText = option.txt;
    ul.appendChild(li);
  })
  optionBox[i].appendChild(ul);
})

// events
start.addEventListener("click", () => {
  welcome.style.display = "none";
  customize.style.display = "flex";
});

back.addEventListener("click", () => {
  welcome.style.display = "flex";
  customize.style.display = "none";
});

optionBox.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    const dropDown = e.target.lastElementChild;
    if (dropDown !== null && dropDown.className !== "options drop-down") {
      removeActive(index);
      dropDown.classList.add("drop-down");

      selectedTypes(dropDown);
    } else if (dropDown !== null && dropDown.className == "options drop-down") {
      dropDown.classList.remove("drop-down");
    }
  });
});

function selectedTypes(dropDown) {
  const parentOption = dropDown.previousElementSibling;
  dropDown.childNodes.forEach((option) => {
    option.addEventListener("click", function (e) {
      //  let parentOption = iter.parentNode.previousElementSibling;
      parentOption.innerHTML = option.innerHTML;
      parentOption.className = e.target.id; // for ajax
      dropDown.classList.remove("drop-down");
    });
  });
}

startGameBtn.addEventListener("click", () => {
  const options = document.querySelectorAll(".option-box span");
  customize.style.display = "none";
  spinner.style.display = "flex";
  console.log("ajax");
  createAJAXrequest(options);
});

// functions
function removeActive(i) {
  optionBox.forEach((iter, index) => {
    if (index === i) return;
    iter.lastElementChild.classList.remove("drop-down");
  });
}

function createAJAXrequest(options) {
  const opt = Array.from(options).map((option) => option.className);
  const url = `https://opentdb.com/api.php?amount=${opt[0].slice(1)}${
    opt[1] === "" || opt[1] === "any" ? "" : "&category=" + opt[1]
  }${opt[2] === "" || opt[2] === "any" ? "" : "&difficulty=" + opt[2]}${
    opt[3] === "" || opt[3] === "any" ? "" : "&type=" + opt[3]
  }`;

  // request to API
  const fetchData = async () => {
    const response = await fetch(url);
    return await response.json();
  };
  fetchData().then((response) => {
    localStorage.setItem("questions", JSON.stringify(response.results));
    window.location.assign("Skeleton/main-page.html");
  });
}
