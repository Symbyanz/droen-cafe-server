const drone = require('./netology-fake-drone-api.js');



drone
.deliver('user_data', 'dish_data')
.then(() => console.log("Good"))
.catch(() => console.log("Fuck!"));