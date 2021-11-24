var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  image: String,
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

var Product = mongoose.model('Product', productSchema);

var productSelectAll = function(callback) {
  Product.find({quantity: {$gt: 0}}, function(err, products) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, products);
    }
  });
};

var productSelectAllCart = function(callback) {
  Product.find({}, function(err, products) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, products);
    }
  });
};

var productSelectOne = function(id, callback) {
  Product.findOne({_id: id}, function(err, product) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, product);
    }
  });
};

var productSelectByUserId = function(userId, callback) {
  Product.find({userId}, function(err, products) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, products);
    }
  });
};

var productSave = function(name, description, price, quantity, image, userId, callback) {
  var product = {
    name: name,
    description: description,
    price: price,
    quantity: quantity,
    image: image,
    userId: userId
  }

  product = new Product(product)

  product.save(function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
}

var productUpdateQuantity = function(id, callback) {
  productSelectOne(id, (err, product) => {
    product.quantity = product.quantity - 1;
    product.save(function(err, success){
      if(err) {
        callback(err, null);
      } else {
        callback(null, success);
      }
    })
  })
}

module.exports.productSelectAll = productSelectAll; // Retrieves all products
module.exports.productSelectOne = productSelectOne; // Selects only one product with a given name
module.exports.productSelectByUserId = productSelectByUserId; // Selects all products of a UserId given email
module.exports.productSave = productSave; // Saves product given (name, email, password, type)
module.exports.productUpdateQuantity = productUpdateQuantity // Updates product quantity after purchase given product name
module.exports.productSelectAllCart = productSelectAllCart