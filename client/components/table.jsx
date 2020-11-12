import React from 'react';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null
    }
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(index) {
    this.props.setView('productDetails', this.props.product[index]);
  }

  renderTableData() {
    return this.props.product.map((product, index) => {
      const { productId, sku, name, category, qty } = product;
      return (
        <tr className="cursor" key={index} onClick={() => this.handleItemClick(index)}>
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
        <div className="d-flex justify-content-center mx-3">
          <table className="table table-striped">
            <thead className="table-header">
              <tr>
                <th scope="col">SKU</th>
                <th scope="col">NAME</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">QTY</th>
              </tr>
            </thead>
            <tbody className="tbody-container">
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      </div>
    );

  }

}
