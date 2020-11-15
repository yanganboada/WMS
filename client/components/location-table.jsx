import React from 'react';

export default class LocationTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTableData() {
    return (
      this.props.product.map((product, index) => {
        const { sku, color, location, qty } = product;
        return (
          <tr key={index}>
            <td>{sku}</td>
            <td>{color}</td>
            <td>{location}</td>
            <td>{qty}</td>
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
                <th scope="col">COLOR</th>
                <th scope="col">LOCATION</th>
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
