const model = require("../model").user;
var exports = module.exports = {};

exports.create = (req, res) => {
   model.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
   }).then(user => res.json(user));
};

exports.read = (req, res) => {
    model.findAll()
        .then(user => res.json(user))
        .error(err => res.json(err));
};

exports.login = (req ,res) => {
    model.find({
  	where: {
        email: req.body.email,
   	    password: req.body.password
    }
    })
   	.then(user => {
        console.log('user ' + user);
        if (user){
            res.json(user);
        } else {
            res.status(403).render();
        }
	})
    .error(err => res.json(err));
}
