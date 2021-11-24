import React from 'react';
import OrderItem from './OrderItem.jsx';

const OrderView = (props) => (
  <div>
    <p>There are { props.orders.length } orders.</p>
    <div id="orders_container">
      { props.orders.map((order, index) => <OrderItem key={index} order={order}/>)}
    </div>
  </div>
)

export default OrderView;