import React from 'react';
import ProductOrder from './ProductOrder.jsx';
import $ from 'jquery'


class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order,
      products: []
    }
    this.getProducts();
  }

  getProducts() {
    $.ajax({
      url: '/productscart',
      success: (data) => {
        var myProducts = [];
        data.map(element => {
          if (this.state.order.productsIds.includes(element._id)) {
            myProducts.push(element)
          }
        })
        this.setState({
          products: myProducts
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return(
      <div className="order_elem">
        <h1>Order # {this.props.order._id}</h1>
        <h4>Total: ${this.props.order.price}</h4>
        <div className="flex_div">
          { this.state.products.map(product => <ProductOrder product={product} />)}
        </div>
      </div>
    )
  }
}

export default OrderItem;