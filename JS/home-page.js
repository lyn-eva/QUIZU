const optionBox = document.getElementsByClassName("option-box");
const start = document.getElementById("start");
const back = document.getElementById("back");
const welcome = document.getElementById("welcome");
const customize = document.getElementById("customize");
const startGameBtn = document.getElementById("start-game");
const spinner = document.getElementById("spinning-loader");

// events
start.addEventListener("click", () => {
  welcome.style.display = "none";
  customize.style.display = "flex";
});

back.addEventListener("click", () => {
  welcome.style.display = "flex";
  customize.style.display = "none";
});

Array.from(optionBox).forEach((item, index) => {
  item.addEventListener("click", (e) => {
    let dropDown = e.target.lastElementChild;
    if (dropDown !== null && dropDown.className != "options drop-down") {
      removeActive(index);
      dropDown.classList.add("drop-down");

      let option = Array.from(dropDown.childNodes);
      option = option.filter((iter) => iter.nodeType == 1);
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
  Array.from(optionBox).forEach((iter, index) => {
    if (index === i) return;
    iter.lastElementChild.classList.remove("drop-down");
  });
}

function createAJAXrequest(options) {
  const opt = Array.from(options).map((option) => option.className);
  const url = `https://opentdb.com/api.php?amount=${opt[0].slice(1)}${opt[1] === "" || opt[1] === "any" ? "" : "&category=" + opt[1]}${opt[2] === "" || opt[2] === "any" ? "" : "&difficulty=" + opt[2]}${opt[3] === "" || opt[3] === "any" ? "" : "&type=" + opt[3]}`;

  // request to API
  const fetchData =  async() => {
    const response = await fetch(url);
    return await response.json();
  }
  fetchData().then(response => {
    localStorage.setItem("questions", JSON.stringify(response.results));
    window.location.assign("Skeleton/main-page.html");
  })
}

