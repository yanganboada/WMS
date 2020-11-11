import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'homepage',
        params: {}
      },
      product: []
    };
    this.setView = this.setView.bind(this);
    this.getProductList = this.getProductList.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  componentDidMount() {
    this.getProductList();
  }

  getProductList() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        this.setState({ product: data });
      }
      )
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.view.name === 'homepage') {
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

  }
}
