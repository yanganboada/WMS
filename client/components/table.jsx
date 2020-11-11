import React from 'react';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.renderTableData = this.renderTableData.bind(this);
  }

  renderTableData() {
    return this.props.product.map((product, index) => {
      const { sku, name, category, qty } = product;
      return (
        <tr key={index}>
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
