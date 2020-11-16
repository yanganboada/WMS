import React from 'react';

export default class PoTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTableData() {
    return (
      this.props.product.map((product, index) => {
        const { sku, name, qty, cost } = product;
        return (
          <tr key={index}>
            <td>{sku}</td>
            <td>{name}</td>
            <td>{qty}</td>
            <td>{Number.parseFloat(cost * qty).toFixed(2)}</td>
          </tr>
        );
      })
    );
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
                <th scope="col">QTY</th>
                <th scope="col">TOTAL</th>
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
