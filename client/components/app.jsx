import React from 'react';
import Header from './header';
import HomePage from './home-page';
import ProductList from './product-list';
import AddEditProduct from './add-edit-product';
import ImportProducts from './import-products';
import ExportProducts from './export-products';
import ProductDetails from './product-details';
import Reports from './reports';
import LowInvReport from './low-inv-report';

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

  renderSwtich(state) {
    switch (state) {
      case 'productList':
        return <ProductList setView={this.setView} product={this.state.product} />;
      case 'addEditProduct':
        return <AddEditProduct params={this.state.view.params} setView={this.setView}/>;
      case 'productDetails':
        return <ProductDetails params={this.state.view.params} setView={this.setView} />;
      case 'reports':
        return <Reports setView={this.setView} />;
      case 'lowInvReport':
        return <LowInvReport setView={this.setView} product={this.state.product} />;
      case 'importProducts':
        return <ImportProducts setView={this.setView} />;
      case 'exportProducts':
        return <ExportProducts setView={this.setView} />;
    }
  }

  render() {

    if (this.state.view.name === 'homePage') {
      return (
        <div>
          <HomePage setView={this.setView} />
        </div>
      );
    } else {
      return (
        <div>
          <Header view={this.state.view.name} setView={this.setView} />
          { this.renderSwtich(this.state.view.name)}
        </div>
      );
    }
  }
}
