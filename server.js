const express = require('express'),
	bodyParser = require('body-parser'),	
	chalk = require('chalk'),
	app = express();

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie

// Models
const models = require("./app/model");

// Routes
const routes = require("./app/route/routes.js")(app);

// Test the connection
models.sequelize.authenticate()
.then(() => {
	console.log(chalk.green('Connection has been established successfully.'));
})
.catch((err) => {
	console.error(chalk.red('Unable to connect to the database:', err));
});

// Sync Database
models.sequelize.sync().then(function () {
	console.log(chalk.green('Database working correctly.'));
}).catch(function (err) {
	console.log(err, chalk.red("Something went wrong with the Database."));
});


app.listen(8080, (err) => {
	if (!err) {
		console.log('Running on the port: 8080');
	} else {
		console.log('Error: ' + err);
	}
});
