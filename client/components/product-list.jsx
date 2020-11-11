import React from 'react';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    };
    this.getProductList = this.getProductList.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
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

  renderTableData() {
    return this.state.product.map((product, productId) => {
      const { sku, name, category, qty } = product;
      return (
        <tr key={productId}>
          <td>{sku}</td>
          <td>{name}</td>
          <td>{category}</td>
          <td>{qty}</td>
        </tr>
      );
    });
  }

  render() {

    return (

      <div>

        <div className="d-flex justify-content-center">
          <button className="add-product btn-blue mb-3">Add Product</button>
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
              <option>FILTER</option>
            </select>
            <input type="text" className="form-control" placeholder="Example input"></input>
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-center">
            <table className="table table-striped">
              <thead className="table-header">
                <tr>
                  <th scope="col">SKU</th>
                  <th scope="col">NAME</th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">QTY</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    );
  }

}
