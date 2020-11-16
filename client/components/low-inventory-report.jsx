import React from 'react';
import Table from './table';
import { CSVLink } from 'react-csv';

export default class LowInventoryReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: '',
      product: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleChange(e) {
    this.setState({ qty: e.target.value });
  }

  handleSubmit() {
    fetch(`/api/products-quantity?qty=${this.state.qty}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ product: data });
      })
      .catch(err => console.error(err));
  }

  handleDownload() {
    this.csvLink.link.click();
  }

  render() {
    return (
      <div>
        <div className="back-arrow w-100 p-2 cursor text-muted font-italic d-flex justify-content-end" onClick={() => this.props.setView('reports', {})} >
          <p>Back to Report List -&gt;</p>
        </div>
        <form onSubmit={this.handleChange}>
          <div className="d-flex justify-content-center align-items-center">
            QTY less than:
            <div>
              <input
                type="number"
                className="form-control form-control-sm ml-2"
                placeholder="Enter a number"
                size="15"
                id='qty'
                value={this.state.qty}
                onChange={this.handleChange}
                required></input>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-center align-items-center">
          <button className="add-product btn-blue m-3" onClick={this.handleSubmit}>Generate</button>
          <button className="add-product btn-blue m-3" onClick={this.handleDownload}>Download</button>
          <CSVLink
            data={this.state.product}
            filename="lowInventoryReport.csv"
            className="hidden"
            ref={r => this.csvLink = r}
            target="_blank" />
        </div>

        {this.state.product.length !== 0
          ? <Table product={this.state.product} />
          : <p className="d-none"></p>}

      </div>
    );
  }

}
