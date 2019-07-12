const model = require("../model").data;
var exports = module.exports = {};

exports.create = (req, res) => {
   model.create({
      file: req.body.file,
      email: req.body.email,
      password: req.body.password,
   }).then(data => res.json(data));
};
