import React from 'react';
import Header from './header';
import HomePage from './home-page';
import ProductList from './product-list';
import AddEditProduct from './add-edit-product';
import ProductDetails from './product-details';
import Reports from './reports';
import LowInvReport from './low-inv-report';
import CategoryReport from './category-report';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'categoryReport',
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
      case 'categoryReport':
        return <CategoryReport setView={this.setView} product={this.state.product} />;
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
          <Header setView={this.setView} />
          { this.renderSwtich(this.state.view.name)}
        </div>
      );
    }
  }

  // render() {
  //   if (this.state.view.name === 'homePage') {
  //     return (
  //       <div>
  //         <HomePage setView={this.setView}/>
  //       </div>
  //     );
  //   }

  //   if (this.state.view.name === 'productList') {
  //     return (
  //       <div>
  //         <Header setView={this.setView}/>
  //         <ProductList setView={this.setView} product={this.state.product} />
  //       </div>
  //     );
  //   }

  //   if (this.state.view.name === 'addEditProduct') {
  //     return (
  //       <div>
  //         <Header setView={this.setView}/>
  //         <AddEditProduct params={this.state.view.params} setView={this.setView}/>
  //       </div>
  //     );
  //   }

  //   if (this.state.view.name === 'productDetails') {
  //     return (
  //       <div>
  //         <Header setView={this.setView}/>
  //         <ProductDetails params={this.state.view.params} setView={this.setView} />
  //       </div>
  //     );
  //   }

  //   if (this.state.view.name === 'reports') {
  //     return (
  //       <div>
  //         <Header setView={this.setView}/>
  //         <Reports setView={this.setView}/>
  //       </div>
  //     );
  //   }

  //   if (this.state.view.name === 'lowInvReport') {
  //     return (
  //       <div>
  //         <Header/>
  //         <LowInvReport setView={this.setView} product={this.state.product}/>
  //       </div>
  //     );
  //   }

  // }
}
