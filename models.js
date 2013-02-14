
var mongoose = require('mongoose');
console.log(process.env.MONGOLAB_URI)
mongoose.connect(process.env.MONGOLAB_URI || 'localhost')

var schema = mongoose.Schema({
  name: String,
  cost: 'number'
})

var schema2 = mongoose.Schema({
  name: String,
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  completed: String
})

exports.Ingredient = mongoose.model('Ingredient', schema);
exports.Order = mongoose.model('order', schema2)