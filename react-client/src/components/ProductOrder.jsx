import React from 'react';

const ProductOrder = (props) => (
  <div id="product_view">
    <h2>{ props.product.name }</h2>
    <img src={props.product.image}/>
    <div>
      <h5>Price: ${props.product.price}</h5>
      {
        (props.authed) ? <button onClick={props.updateOrder} id={props.product._id}>Order</button> : null
      }

    </div>
  </div>
)

export default ProductOrder;