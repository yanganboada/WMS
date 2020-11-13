import React from 'react';
import Header from './header';
import ProductList from './product-list';
import AddEditProduct from './add-edit-product';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'addEditProduct',
        params: {}
      },
      product: []
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    if (this.state.view.name === 'homePage') {
      return (
        <div>
          <Header setView={this.setView}/>
        </div>
      );
    }

    if (this.state.view.name === 'productList') {
      return (
        <div>
          <Header/>
          <ProductList setView={this.setView} product={this.state.product} />
        </div>
      );
    }

    if (this.state.view.name === 'addEditProduct') {
      return (
        <div>
          <Header />
          <AddEditProduct params={this.state.view.params} setView={this.setView}/>
        </div>
      );
    }

    if (this.state.view.name === 'productDetails') {
      return (
        <div>
          <Header />
          <ProductDetails params={this.state.view.params} setView={this.setView} />
        </div>
      );
    }
  }
}
