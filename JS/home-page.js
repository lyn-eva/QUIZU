const optionBox = document.getElementsByClassName('option-box');
const options = Array.from(document.getElementsByClassName('options'));
const start = document.getElementById('start');
const back = document.getElementById('back');
const welcome = document.getElementById('welcome');
const customize = document.getElementById('customize');
const fetchData = document.getElementById('fetch-data');


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
         let ttt = e.target.parentNode;
         iter.parentNode.classList.remove('drop-down');
      });  
   });
}

function removeActive(i) {
   Array.from(optionBox).forEach( (iter, index) => {
      if (index != i)
         iter.lastElementChild.classList.remove('drop-down');
   });
}


// API


fetchData.addEventListener('click', e => {
   e.preventDefault();
   createAJAXrequest(options);
});

function createAJAXrequest(opt) {
   let url = "https://opentdb.com/api.php?"
   const amount = opt[0].previousElementSibling.innerText;
   const category = opt[1].previousElementSibling.innerText;
   const diff = opt[2].previousElementSibling.innerText;
   const type = opt[3].previousElementSibling.innerText;
   
   url += `amount=${amount}`;

   if (category != "Any Category") {
      url += ``
   }
   console.log(url);

   // request to API
   const xhr = new XMLHttpRequest();
   xhr.open('GET', url, true);
   xhr.send()

   xhr.onload = function () {
      if (this.status == 200) {
         console.log(this.responseText);
      }
   }

   xhr.onerror = function () {
      console.log('error');
   }
}

