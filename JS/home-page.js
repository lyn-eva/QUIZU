const optionBox = document.getElementsByClassName('option-box');
const options = Array.from(document.getElementsByClassName('options'));
const start = document.getElementById('start');
const back = document.getElementById('back');
const welcome = document.getElementById('welcome');
const customize = document.getElementById('customize');
const fetchData = document.getElementById('fetch-data');

// events
start.addEventListener('click', () => {
   welcome.style.display = "none";
   customize.style.display = "flex";
});

back.addEventListener('click', () => {
   customize.style.display = "none"
   welcome.style.display = "flex"
})

Array.from(optionBox).forEach( (item, index) => {
   item.addEventListener('click', (e) => {
      let dropDown = e.target.lastElementChild;
      if (dropDown !== null && dropDown.className != "options drop-down") {
         removeActive(index);
         dropDown.classList.add('drop-down');
         
         let option = Array.from(dropDown.childNodes);
         option = option.filter((iter) => iter.nodeType == 1);
         selectedTypes(option);
      }
      else if(dropDown !== null && dropDown.className == "options drop-down") {
         dropDown.classList.remove('drop-down');
      }
   });
});

function selectedTypes(opt) {
   opt.forEach( iter => {
      iter.addEventListener('click', (e) => {
         let temp = iter.parentNode.previousElementSibling;
         temp.innerHTML = iter.innerHTML;
         temp.className = e.target.id; // for ajax
         iter.parentNode.classList.remove('drop-down');
      });  
   });
}

fetchData.addEventListener('click', e => {
   e.preventDefault();
   createAJAXrequest(options);
});

// functions
function removeActive(i) {
   Array.from(optionBox).forEach( (iter, index) => {
      if (index != i)
         iter.lastElementChild.classList.remove('drop-down');
   });
}

function createAJAXrequest(opt) {
   let url = "https://opentdb.com/api.php?"
   const amount = opt[0].previousElementSibling.className;
   const category = opt[1].previousElementSibling.className;
   const diff = opt[2].previousElementSibling.className;
   const type = opt[3].previousElementSibling.className;
   
   url += `amount=${amount.slice(1)}`;

   if (category != "" && category != "any") {
      url += `&category=${category}`;
   }
   if (diff != "" && diff != 'any') {
      url += `&difficulty=${diff}`;
   }
   if (type != "" && type != "any") {
      url += `&type=${type}`;
   }

   console.log(url);

   // request to API
   const xhr = new XMLHttpRequest();
   xhr.open('GET', url, true);
   xhr.send()

   xhr.onload = function () {
      if (this.status == 200) {
         const q_set = JSON.parse(this.responseText)
      
         addToLoacl(this.responseText);
         window.location.assign("../Skeleton/main-page.html");
      }
   }

   xhr.onerror = function () {
      console.log('error');
   }
}

function addToLoacl(ary) {
   if (localStorage.getItem('questions') == null) {
      localStorage.setItem('questions', '');
   };
   localStorage.setItem('questions', ary);
}
