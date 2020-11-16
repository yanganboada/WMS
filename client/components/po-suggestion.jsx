import React from 'react';
import Table from './table';
import { CSVLink } from 'react-csv';

export default class POSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: '',
      data: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSuggest = this.handleSuggest.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleChange(e) {
    this.setState({ budget: e.target.value });
  }

  handleSuggest() {

    // send fetch request with post
    // respond, set list to state

    fetch('/api/po-suggest', {
      method: POST,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log('data', data);

      })
      .catch(err => console.error(err));

    // check inv for ANTHING lower than 20 qty from the budget
    // ---with sku, name, cost, qty
    // ---anything with that value, we can count and compare current inventory by the cost

    // use where clause looking for qty <= 20

    // if budget is lower, then buy all
    // ex. 3 items - each item 10, 15, 18 units. first item, 8, second item 3, 3rd item, 2.
    // if total price > budget, count the percentage
    // divide total count by budget

    // copy component for the location-table.jsx, change table render to sku, name, total cost, qty

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
          <button className="add-product btn-blue m-3" onClick={this.handleDownload}>Download</button>
        </div>

        <div>
          {this.state.data.length !== 0
            ? <Table product={this.state.data} />
            : <p className="d-none"></p>}
        </div>

      </div>
    );
  }

}
