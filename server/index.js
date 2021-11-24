var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path')
var UserModel= require('../database-mongo/models/userModel.js')
var OrderModel= require('../database-mongo/models/orderModel.js')
var ProductModel= require('../database-mongo/models/productModel.js')
// var = require('')
// var = require('')
// var = require('')

var items = require('../database-mongo');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/products', function (req, res) {
  ProductModel.productSelectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/productscart', function (req, res) {
  ProductModel.productSelectAllCart(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/products/:email', function (req, res) {
  var email = req.params.email
  console.log(email)
  UserModel.userSelectOne(email, (err, user)=> {
    if (err) {
      console.log("error")
    } else {
      var userId = user._id
      ProductModel.productSelectByUserId(userId, (err, result)=> {
        if(err) {
          res.sendStatus(500);
        } else {
          res.send(result);
        }
      })
    }
  })
});

app.post('/products', function (req, res) {
  var name = req.body.name
  var description = req.body.description
  var price = req.body.price
  var quantity = req.body.quantity
  var image = req.body.image
  var email = req.body.user

  UserModel.userSelectOne(email, (err, user)=> {

    if (err) {
      console.log("error")
    } else {
      var userId = user._id
      ProductModel.productSave(name, description, price, quantity, image, userId, function(err, data) {
        if(err) {
          res.sendStatus(500);
        } else {
          console.log("data sent in index.js")
          res.send(data);
        }
      });
    }
  })
});

app.get('/orders/:email', function (req, res) {
  var email = req.params.email
  console.log(email)
  UserModel.userSelectOne(email, (err, user)=> {
    if (err) {
      console.log("error")
    } else {
      var userId = user._id
      OrderModel.orderSelectByUser(userId, (err, result)=> {
        if(err) {
          res.sendStatus(500);
        } else {
          res.send(result);
        }
      })
    }
  })
});


app.post('/orders', function (req, res) {
  var productsIds =  req.body.productsIds
  var price =  req.body.price
  var email = req.body.user

  UserModel.userSelectOne(email, (err, user)=> {

    if (err) {
      console.log("error")
    } else {
      var userId = user._id
      OrderModel.orderSave(userId, productsIds, price, function(err, data) {
        if(err) {
          res.sendStatus(500);
        } else {
          // console.log("Order Saved")
          // res.send(data);
          var count = 0;
          productsIds.map( productId => {
            ProductModel.productUpdateQuantity(productId, (err, result) => {
              count++
              if(err) {
                console.log("error")
              } else {
                if (count === productsIds.length -1) {
                  res.send("done")
                }
              }
            })
          })
        }
      });
    }
  })
});

app.post('/signIn', function (req, res) {
  var email = req.body.email
  var password = req.body.password

  UserModel.userAuthenticate(email, password, function(err, boo) {
    res.send(boo);
  });
});

app.post('/signUp', function (req, res) {
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password

  UserModel.userSave(name, email, password, function(err, user) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(user);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port http://localhost:3000');
});

