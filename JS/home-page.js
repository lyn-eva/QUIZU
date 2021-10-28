const optionBox = document.getElementsByClassName('option-box');
const start = document.getElementById('start');
const welcome = document.getElementById('welcome');
const customize = document.getElementById('customize');

start.addEventListener('click', () => {
   welcome.style.display = "none";
   customize.style.display = "flex";
})

Array.from(optionBox).forEach( (item, index) => {
   item.addEventListener('click', () => {
      let dropDown = item.lastElementChild;
      if (dropDown !== null && dropDown.classList.contains('options')) {
         removeActive(index);
         dropDown.classList.toggle('drop-down');
         
         let option = dropDown.childNodes;
         selectedTypes(option);
      }
   });
});

function selectedTypes(opt) {
   opt.forEach( iter => {
      iter.addEventListener('click', (e) => {
         let temp = iter.parentNode.previousElementSibling;
         temp.innerHTML = iter.innerHTML;
         console.log(iter.parentNode.classList);
         parentNode.classList.remove('drop-down');
      });  
   });
}

function removeActive(i) {
   Array.from(optionBox).forEach( (iter, index) => {
      if (index != i)
         iter.lastElementChild.classList.remove('drop-down');
   });
}