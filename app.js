

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , ingredient = require('./routes/ingredient')
  , order = require('./routes/order')
  , orders = require('./routes/orders')
  , models = require('./models')
  , http = require('http')
  , path = require('path');

var app = express();
var Ingredient = models.Ingredient

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/ingredient/new', ingredient.new);
app.post('/ingredient/create', ingredient.create)
app.get('/order/new',order.new);
app.get('/orders',orders.list);
app.post('/order/create', order.create)
app.post('/order/delete', order.deleteorder)
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});