
var models = require('../models')

function list_ings(req,res) {
	var listofcats = [] 
    models.Ingredient.find({}).exec(function(err, cats){
  	  if (err)
        return console.log("error", err);
      
      cats.forEach(function(cat) {
        listofcats.push(cat.name)
    })
    res.render('order',{ title:'order', 
		ings:cats })})
}

exports.new = function(req, res){ 
    list_ings(req, res)
}

exports.create = function(req, res){
	ings = Object.keys(req.body)
	ings.splice(ings.indexOf('customerName'),1)
	var bob = new models.Order({
		name:req.body.customerName,
		ingredients:ings,
    completed:"not yet"
	});
	bob.save(function (err) {
      if (err)
        console.log("Problem saving bob", err);
});
    list_ings(req, res)
};

exports.deleteorder = function(req, res){
  models.Order.remove({_id:req.body.ID}, function()
    {res.redirect('/orders')})
}