const uploadController = require('../controller/uploadController.js');

module.exports = app => {
    //app.post('/user', userController.create);
    //app.get('/user', userController.read);
    //app.post('/login', userController.login);
    app.post('/upload' uploadController.create)
}
