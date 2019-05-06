var userController = require('../controller/userController.js');

module.exports = function (app) {
    app.post('/user', userController.create);
    app.get('/user', userController.read);
    app.post('/login', userController.login);
}
