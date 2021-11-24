import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProductView from './ProductView.jsx';
import AddProductForm from './AddProductForm.jsx';

class MyProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  getMyProducts() {
    $.ajax({
      url: `/products/${this.props.user}`,
      success: (data) => {
        this.setState({
          products: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  componentDidMount() {
    console.log(this.props.user)
    this.getMyProducts();
  }

  render () {
    return (
      <div>
        <div className="flex_div">
          <div className='my_product_view'>
            <h2>Your Products</h2>
            <ProductView products={this.state.products} />
          </div>

          <div className='my_product_view'>
            <h2>Add your products</h2>
            <AddProductForm user = {this.props.user} getProducts={this.props.getProducts} getMyProducts = {this.getMyProducts.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default MyProducts;