var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  productsIds: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  }],
  price: Number
});

var Order = mongoose.model('Order', orderSchema);

var orderSelectAll = function(callback) {
  Order.find({}, function(err, orders) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, orders);
    }
  });
};

var orderSelectByUser = function(userId, callback) {
  Order.find({userId}, function(err, order) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, order);
    }
  });
};

var orderSave = function(userId, productsIds, price, callback) {

  var order = {
    userId: userId,
    productsIds: productsIds,
    price: price
  }

  order = new Order(order)

  order.save(function(err, order) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, order);
    }
  });
}

module.exports.orderSelectAll = orderSelectAll; // Retrieves all orders
module.exports.orderSelectByUser = orderSelectByUser; // Selects all orders of a user with a given userId
module.exports.orderSave = orderSave; // Saves order given (user, [array of products])