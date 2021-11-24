import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import OrderView from './OrderView.jsx'


class MyOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  getMyOrders() {
    $.ajax({
      url: `/orders/${this.props.user}`,
      success: (data) => {
        console.log(data)
        this.setState({
          orders: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  componentDidMount() {
    this.getMyOrders();
  }

  render () {
    return (
      <div>
        <div>
          <div>
            <h2>Your Orders</h2>
            <OrderView orders={this.state.orders} />
          </div>

        </div>
      </div>
    )
  }
}

export default MyOrders;
//<OrderView orders={this.state.orders} />