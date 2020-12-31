import React from 'react';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null,
      currentSort: 'default',
      currentColumn: ''
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.sortTypes = this.sortTypes.bind(this);
  }

  sortTypes(type) {

    const column = this.state.currentColumn;

    const sortTypes = {
      up: {
        class: 'sort-up',
        fn: (a, b) => {
          return a[column].toString().localeCompare(b[column], 'en', { numeric: true });
        }
      },
      down: {
        class: 'sort-down',
        fn: (a, b) => {
          return b[column].toString().localeCompare(a[column], 'en', { numeric: true });
        }
      },
      default: {
        class: 'sort',
        fn: (a, b) => {
          return a[column];
        }
      }
    };
    return sortTypes[type];

  }

  handleItemClick(index) {
    this.props.setView('productDetails', this.props.product[index]);
  }

  handleSort(e) {
    const { currentSort } = this.state;
    let nextSort;

    if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'default';
    else if (currentSort === 'default') nextSort = 'down';

    this.setState({
      currentSort: nextSort,
      currentColumn: e.currentTarget.id
    });

  }

  renderTableData() {
    return this.props.product.sort(this.sortTypes(this.state.currentSort).fn).map((product, index) => {
      const { sku, name, category, qty } = product;
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
                <th scope="col" id='sku' onClick={this.handleSort}> SKU
                  {this.state.currentColumn === 'sku' && this.state.currentSort === 'up' && <i className="fas fa-sort-up fa-1x"></i>}
                  {this.state.currentColumn === 'sku' && this.state.currentSort === 'down' && <i className="fas fa-sort-down fa-1x"></i>}
                </th>
                <th scope="col" id='name' onClick={this.handleSort}>NAME
                  {this.state.currentColumn === 'name' && this.state.currentSort === 'up' && <i className="fas fa-sort-up fa-1x"></i>}
                  {this.state.currentColumn === 'name' && this.state.currentSort === 'down' && <i className="fas fa-sort-down fa-1x"></i>}
                </th>
                <th scope="col" id='category' onClick={this.handleSort}>CATEGORY
                  {this.state.currentColumn === 'category' && this.state.currentSort === 'up' && <i className="fas fa-sort-up fa-1x"></i>}
                  {this.state.currentColumn === 'category' && this.state.currentSort === 'down' && <i className="fas fa-sort-down fa-1x"></i>}
                </th>
                <th scope="col" id='qty' onClick={this.handleSort}>QTY
                  {this.state.currentColumn === 'qty' && this.state.currentSort === 'up' && <i className="fas fa-sort-up fa-1x"></i>}
                  {this.state.currentColumn === 'qty' && this.state.currentSort === 'down' && <i className="fas fa-sort-down fa-1x"></i>}
                </th>
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
