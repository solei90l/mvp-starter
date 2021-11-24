import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class AddProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      quantity: "",
      image: ""
    }
  }

  resetState() {
    this.setState({
      name: "",
      description: "",
      price: "",
      quantity: "",
      image: ""
    })
  }

  handleClick(event) {
    event.preventDefault();
    var data = {};
    for (var keys in this.state) {
      data[keys] = this.state[keys]
    }
    data.user = this.props.user;
    var that = this
    console.log("DATA is going to be sent!!!")
    $.post("/products", data, function(){
      that.props.getMyProducts();
      that.props.getProducts();
      that.resetState();
    })

  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render () {
    return (
      <form action="/products" method="post">
        <div className='form_view'>
          <div className='form_item'>
            <label name="name">Product Name</label>
            <input type="text" id="name" value={this.state.name} onChange={this.typing.bind(this)}/>
          </div>
          <div className='form_item'>
            <label name="description">Description</label>
            <input type="text" id="description" value={this.state.description} onChange={this.typing.bind(this)}/>
          </div>
          <div className='form_item'>
            <label name="price">Product Price</label>
            <input type="number" id="price" value={this.state.price} onChange={this.typing.bind(this)}/>
          </div>
          <div className='form_item'>
            <label name="quantity">Quantity</label>
            <input type="number" id="quantity" value={this.state.quantity} onChange={this.typing.bind(this)}/>
          </div>
          <div className='form_item'>
            <label name="image">Image URL</label>
            <input type="text" id="image" value={this.state.image} onChange={this.typing.bind(this)}/>
          </div>
          <div className='form_button'>
            <button onClick={this.handleClick.bind(this)}>Confirm</button>
          </div>
        </div>
      </form>
    )
  }
}

export default AddProductForm;