import React from 'react';
import Header from './header';
import HomePage from './home-page';
import ProductList from './product-list';
import AddProduct from './add-product';
import ProductDetails from './product-details';
import Reports from './reports';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'homePage',
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
          <HomePage setView={this.setView}/>
        </div>
      );
    }

    if (this.state.view.name === 'productList') {
      return (
        <div>
          <Header />
          <ProductList setView={this.setView} product={this.state.product} />
        </div>
      );
    }

    if (this.state.view.name === 'addProduct') {
      return (
        <div>
          <Header />
          <AddProduct setView={this.setView} product={this.state.product} />
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

    if (this.state.view.name === 'reports') {
      return (
        <div>
          <Header />
          <Reports setView={this.setView}/>
        </div>
      );
    }

  }
}
