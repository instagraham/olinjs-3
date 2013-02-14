
var models = require('../models')

exports.list = function(req, res){ 
  models.Order.find({}).populate('ingredients').exec(function(err, orders){
  if (err)
    return console.log("error", err);
  res.render('orders', {title:'order', orders:orders})
    });
};