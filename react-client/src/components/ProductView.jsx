import React from 'react';
import ProductItem from './ProductItem.jsx';

const ProductView = (props) => (
  <div>
    <h4> Products </h4>
    <p>There are { props.products.length } products.</p>
    <div id="products_container">
      { props.products.map(product => <ProductItem authed={props.authed} product={product} updateOrder={props.updateOrder}/>)}
    </div>
  </div>
)

export default ProductView;