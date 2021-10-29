const FS = require('fs')
const user = {
   "id": 1,
   "name": "John Doe",
   "age": 22
};

let data = JSON.stringify(user);

FS.writeFile('questions.json', data, (err) => {
   if (err) throw err;
   console.log('sus');
})