var models = require('../models')

exports.new = function(req, res){
	console.log("hey");
	res.render('ingredient',{title:'ingredient'});
};

exports.create = function(req, res){
	console.log(req.body.ingredient);
	var bob = new models.Ingredient({
		name:req.body.ingredient,
		cost:req.body.cost})
	bob.save(function (err) {
      if (err)
        console.log("Problem saving bob", err);
});
	res.render('ingredient',{title:'ingredient'});
};