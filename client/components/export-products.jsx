import React from 'react';
import Table from './table';
import { CSVLink } from 'react-csv';

export default class ExportProducts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      filterValue: '',
      filterName: '',
      isFilter: false,
      filterProduct: [],
      errorMessage: false,
      sort: {
        column: null,
        direction: 'desc'
      },
      dowload: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
    this.handleChangeFilterName = this.handleChangeFilterName.bind(this);
    this.handleChangeFilterValue = this.handleChangeFilterValue.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
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

  handleChangeFilterName(e) {
    this.setState({ errorMessage: false });
    this.setState({ filterName: e.target.value });
  }

  handleChangeFilterValue(e) {
    this.setState({ errorMessage: false });
    this.setState({ filterValue: e.target.value });
  }

  handleSubmit() {

    fetch(`/api/products-filter?${this.state.filterName}=${this.state.filterValue}`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          this.setState({ errorMessage: true });
        } else {
          this.setState({
            filterProduct: data,
            errorMessage: false,
            isFilter: true
          });
        }
      })
      .catch(err => console.error(err));
  }

  handleClearFilter() {
    this.setState({
      isFilter: false,
      filterName: '',
      filterValue: '',
      errorMessage: false,
      filterProduct: []
    });
  }

  handleDownload() {
    this.csvLink.link.click();
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <button className="add-product btn-blue m-2 mt-3" onClick={this.handleDownload}>
              Download
          </button>
          <CSVLink
            data={this.state.filterProduct.length
              ? this.state.filterProduct
              : this.state.product}
            filename="productDownload.csv"
            className="hidden"
            ref={r => this.csvLink=r }
            target="_blank" />
        </div>
        <div className="row justify-content-center m-auto col-md-3">
          <div className="d-flex justify-content-center align-items-center">

            <form onSubmit={this.handleChangeFilterName}>
              <select className="form-control mr-3 filter-drop-down" onChange={this.handleChangeFilterName}>
                <option disabled>Filter</option>
                <option value="sku">SKU</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="qty">QTY</option>
              </select>
            </form>

            <form onSubmit={this.handleChangeFilterValue}>
              <input
                type="text"
                className="form-control"
                value={this.state.filterValue}
                onChange={this.handleChangeFilterValue}
                placeholder="Filter..."></input>
            </form>
            {!this.state.filterProduct.length
              ? this.state.filterValue === '' || this.state.errorMessage
                ? <button className="btn-grey m-3 btn-filter" disabled >Filter</button>
                : <button className="btn-green m-3 btn-filter" type="submit" onClick={this.handleSubmit}>Filter</button>
              : <button className="btn-red m-3 btn-filter" type="reset" onClick={this.handleClearFilter}>Clear</button>
            }
          </div>
          {this.state.errorMessage
            ? <div className="d-flex justify-content-center m-auto text-muted"><p>No record found</p></div>
            : <p className="d-none"></p>
          }
        </div>

        {this.state.isFilter
          ? <Table product={this.state.filterProduct} />
          : <Table product={this.state.product} setView={this.props.setView} />
        }

      </div>

    );
  }

}
