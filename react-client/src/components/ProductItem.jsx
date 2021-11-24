import React from 'react';

const ProductItem = (props) => (
  <div className="product_view">
    <h2 >{ props.product.name }</h2>
    <img src={props.product.image}/>
    <p>{ props.product.description }</p>
    <div className="details">
      <span>Qte: {props.product.quantity}</span>
      <span><b>Price: ${props.product.price}</b></span>
    </div>
      {
        (props.authed) ? <button onClick={props.updateOrder} id={props.product._id} data-value={props.product.price}>Order</button> : null
      }


  </div>
)

export default ProductItem;