import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProductView from './components/ProductView.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import MyProducts from './components/MyProducts.jsx';
import MyOrders from './components/MyOrders.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      user: "",
      viewCount: 0,
      authed: false,
      order: [],
      isOrdering: false,
      orderPrice: 0
    }
  }

  authenticated(email) {
    this.setState({
      user: email,
      authed: true
    })
  }

  redirectOrders(){
    this.setState({
      viewCount: 4
    })
  }

  redirectProducts(){
    this.setState({
      viewCount: 3
    })
  }

  redirectSignUp() {
    this.setState({
      viewCount: 2
    })
  }

  redirectSignIn() {
    this.setState({
      viewCount: 1
    })
  }

  redirectHome() {
    this.setState({
      viewCount: 0
    })
  }

  updateOrder(event) {
    var newOrderArray = this.state.order;
    newOrderArray.push(event.target.id)
    var newPrice = this.state.orderPrice + parseInt(event.target.getAttribute('data-value'), 10)
    console.log(typeof itemPrice)
    this.setState({
      order: newOrderArray,
      isOrdering: true,
      orderPrice: newPrice
    })
    console.log(this.state.order)
  }

  getItemPrice(price){
    return price
  }

  confirmOrder(event) {
    event.preventDefault();
    var data = {
      user: this.state.user,
      productsIds: this.state.order,
      price: this.state.orderPrice
    }
    var that = this
    $.post("/orders", data, function(){
      that.getProducts();
      that.resetState();
    })

  }

  resetState() {
    this.setState({
      order: [],
      isOrdering: false,
      orderPrice: 0
    })
  }

  getProducts() {
    $.ajax({
      url: '/products',
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
    this.getProducts();
  }

  render () {
    return (
    <div>
      <div id="header">
      <img onClick={this.redirectHome.bind(this)} src="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.15752-9/81700599_605012190250338_2945681269599502336_n.png?_nc_cat=101&_nc_ohc=uDJb5-439XkAQk4VpOcxOND78E21OiWd_JHfvmb2Sma26tn0xY21Tre7w&_nc_ht=scontent.ftun4-1.fna&oh=11c3b2a266434c4dfe9c0c43fea1f717&oe=5EAB2552"/>
        <div id="top_buttons">
          {
            (this.state.authed) ? (
                <div>
                  <button onClick={this.redirectProducts.bind(this)}>Your Products</button>
                  <button onClick={this.redirectOrders.bind(this)}>Your Orders</button>
                  {
                    (this.state.isOrdering) ? <button onClick={this.confirmOrder.bind(this)}>Confirm Order!</button> : null
                  }
                </div>
              ) : (
                <div>
                  <button onClick={this.redirectSignIn.bind(this)}>Sign In</button>
                  <button onClick={this.redirectSignUp.bind(this)}>Create account</button>
                </div>
              )
          }

        </div>
      </div>
      <div id="main_container">
        {
          (this.state.viewCount === 0) ? <ProductView getItemPrice={this.getItemPrice.bind(this)} authed={this.state.authed} products={this.state.products} updateOrder={this.updateOrder.bind(this) }/> :
          (this.state.viewCount === 1) ? <SignIn authenticated={this.authenticated.bind(this)} redirectHome={this.redirectHome.bind(this)} redirectSignUp={this.redirectSignUp.bind(this)} /> :
          (this.state.viewCount === 2) ? <SignUp redirectHome={this.redirectHome.bind(this)} redirectSignIn={this.redirectSignIn.bind(this)} /> :
          (this.state.viewCount === 3) ? <MyProducts user={this.state.user} getProducts={this.getProducts.bind(this)}/> :
          (this.state.viewCount === 4) ? <MyOrders user={this.state.user} /> : null
        }
      </div>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
//<AddProductForm getProducts = {this.getProducts.bind(this)} />
