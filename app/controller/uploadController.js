const model = require("../model").data;
var exports = module.exports = {};

exports.create = function (req, res) {
   


	:wmodel.create({
      file: req.body.file,
      email: req.body.email,
      password: req.body.password,
   }).then(user => res.json(user));
};
