import React from 'react';
import PoTable from './po-table';
import { CSVLink } from 'react-csv';

export default class POSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: '',
      product: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSuggest = this.handleSuggest.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleChange(e) {
    this.setState({ budget: e.target.value });
  }

  handleSuggest() {
    fetch(`/api/po-suggest?budget=${this.state.budget}`)
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
        <div className="mt-4">
          <form onSubmit={this.handleChange}>
            <div className="d-flex justify-content-center align-items-center">
              Estimated Budget:
              <div>
                <input
                  type="number"
                  className="form-control form-control-sm ml-2"
                  placeholder="Enter a number"
                  size="15"
                  id='budget'
                  value={this.state.budget}
                  onChange={this.handleChange}
                  required></input>
              </div>
            </div>
          </form>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <button className="add-product btn-blue m-3" onClick={this.handleSuggest}>Suggest</button>
          {this.state.product.length !== 0
            ? <div>
              <button className="btn-blue m-3" onClick={this.handleDownload}>Download</button>
              <CSVLink
                data={this.state.product}
                filename="poSuggest.csv"
                className="hidden"
                ref={r => this.csvLink = r}
                target="_blank" />
            </div>
            : <button className="btn-grey m-3">Download</button>
          }
        </div>
        <div>
          {this.state.product.length !== 0
            ? <PoTable product={this.state.product} />
            : <p className="d-none"></p>}
        </div>

      </div>
    );
  }

}
