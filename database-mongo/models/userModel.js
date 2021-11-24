var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  productsIds : [{
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  }],
  ordersIds : [{
    type: mongoose.Schema.ObjectId,
    ref: 'Order'
  }],
});

var User = mongoose.model('User', userSchema);

var userSelectAll = function(callback) {
  User.find({}, function(err, users) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, users);
    }
  });
};

var userSelectOne = function(email, callback) {
  User.findOne({email: email}, function(err, user) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
};

var userSave = function(name, email, password, callback) {
  var user = {
    name: name,
    email: email,
    password: password,
    productsIds: [],
    ordersIds: []
  }

  user = new User(user)

  user.save(function(err, user) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
}

var userAddProduct = function(email, productId, callback) {
  userSelectOne(email, (err, user) => {
    var newProductsIds = user.productsIds
    newProductsIds.push(productId)
    user.productsIds = newProductsIds
    user.save( function(err, success){
      if(err) {
        callback(err, null);
      } else {
        callback(null, success);
      }
    })
  })
}

var userAddOrder = function(email, orderId, callback) {
  userSelectOne(email, (err, user) => {
    var newOrdersIds = user.ordersIds
    newOrdersIds.push(orderId)
    user.ordersIds = newOrdersIds
    user.save( function(err, success){
      if(err) {
        callback(err, null);
      } else {
        callback(null, success);
      }
    })
  })
}

var userAuthenticate = function (email, attemptedPassword, callback) {
  userSelectOne(email, (err, user) => {
    if (err) {
      callback(err, null);
    } else {
      if (user && user.password === attemptedPassword) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }

  })
}

module.exports.userSelectAll = userSelectAll; // Retrieves all users
module.exports.userSelectOne = userSelectOne; // Selects only one user with a given email
module.exports.userSave = userSave; // Saves user given (name, email, password)
module.exports.userAddProduct = userAddProduct; // Adds a product given user email and product ID
module.exports.userAddOrder = userAddOrder; // Adds a product given user email and product ID
module.exports.userAuthenticate = userAuthenticate // Given an email and a password attempt, return true if true and return false if false