import React from 'react';
import Header from './header';
import HomePage from './home-page';
import ProductList from './product-list';
import AddEditProduct from './add-edit-product';
import ProductDetails from './product-details';
import Reports from './reports';
import LowInvReport from './low-inv-report';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'productList',
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
          <Header setView={this.setView}/>
          <ProductList setView={this.setView} product={this.state.product} />
        </div>
      );
    }

    if (this.state.view.name === 'addEditProduct') {
      return (
        <div>
          <Header setView={this.setView}/>
          <AddEditProduct params={this.state.view.params} setView={this.setView}/>
        </div>
      );
    }

    if (this.state.view.name === 'productDetails') {
      return (
        <div>
          <Header setView={this.setView}/>
          <ProductDetails params={this.state.view.params} setView={this.setView} />
        </div>
      );
    }

    if (this.state.view.name === 'reports') {
      return (
        <div>
          <Header setView={this.setView}/>
          <Reports setView={this.setView}/>
        </div>
      );
    }

    if (this.state.view.name === 'lowInvReport') {
      return (
        <div>
          <Header/>
          <LowInvReport setView={this.setView} product={this.state.product}/>
        </div>
      );
    }

  }
}
