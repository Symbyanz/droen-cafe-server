//------------------------ Express ----------------------//


const express = require('express');
const bodyParser = require('body-parser');
const db = require('./mongoose.js');
//-------------------

const app        = express();

//---------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//---------------------------------------------------------

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});



app.post('/users', function(req, res) {
	let data = {	email: req.body.email,
		name: req.body.name	};

		db.loginUser(data).then(user_data => {
			if(user_data === false){
				res.status(400).send('email is not validate!');
			} else {			
				res.status(200).send(user_data);
			}
		})
	});

app.get('/menu', function(req, res) {
	db.getMenu().then(menu_data => {
		if(menu_data === false){
			res.status(404).send('Ups.. Error');
		} else {
			res.status(200).send(menu_data);
		}
	})
});
app.get('/menu/:id', function(req, res) {
	db.getDish(req.params.id).then(menu_data => {
		if(menu_data === false){
			res.status(404).send('Ups.. Error');
		} else {
			res.status(200).send(menu_data);
		}
	})
  });

//---------------------------------------------------------

module.exports   = app;

//---------------------------------------------------------