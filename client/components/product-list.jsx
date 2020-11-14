import React from 'react';
import Table from './table';

export default class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getProductList();
  }

  getProductList() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        this.setState({ product: data });
      })
      .catch(err => console.error(err));
  }

  handleChange() {

  }

  render() {

    return (

      <div>
        <div className="d-flex justify-content-center">
          <button className="add-product btn-blue m-3"
            onClick={() => this.props.setView('addEditProduct', {})}>
            Add Product
          </button>
        </div>

        <div className="row justify-content-center m-auto col-md-3">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <div className="input-group-addon">
                  <i className="fa fa-sliders-h"></i>
                </div>
              </span>
            </div>

            <select className="form-control form-drop-down mr-3">
              <option>Filter By...</option>
              <option>SKU</option>
              <option>Name</option>
              <option>Category</option>
              <option>QTY</option>
            </select>

            <form onSubmit={this.handleChange}>
              <input type="text" className="form-control" placeholder="Example input"></input>
            </form>
          </div>
        </div>

        <Table product={this.state.product} setView={this.props.setView} />

      </div>

    );
  }

}
