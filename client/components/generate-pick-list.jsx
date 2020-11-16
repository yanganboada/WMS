import React from 'react';
import LocationTable from './location-table';
import { CSVLink } from 'react-csv';

export default class GeneratePickList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      csvFile: null
    };
    this.hangdleFileChange = this.hangdleFileChange.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  hangdleFileChange(e) {
    this.setState({
      csvFile: e.target.files[0],
      product: []
    });
  }

  handleGenerate(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('csvUpload', this.state.csvFile);

    fetch('/api/uploads', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        fetch('/api/products-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(product => {
            data.sort((a, b) => a[location] - b[location]);
            this.setState({ product });
          })
          .catch(err => console.error(err));
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleDownload() {
    this.csvLink.link.click();
  }

  render() {
    return (
      <div className='container'>
        <div className="row card">
          <form encType="multipart/form-data" className="row justify-content-between m-2" onSubmit={this.handleGenerate}>
            <div className="custom-file m-2">
              <input
                type="file"
                accept=".csv"
                className="custom-file-input"
                id="csvUpload"
                name="csvUpload"
                onChange={this.hangdleFileChange} />
              <label
                className="custom-file-label text-muted"
                htmlFor="customFile">
                {this.state.csvFile
                  ? this.state.csvFile.name
                  : 'upload product csv file'}
              </label>
            </div>
            {!this.state.csvFile
              ? <button className="btn-grey mx-auto my-2" disabled>Generate</button>
              : this.state.product.length
                ? <div></div>
                : <button type='submit' className="btn-green mx-auto my-2">Generate</button>
            }
          </form>
          {this.state.product.length
            ? <div>
              <div className='row justify-content-center'>
                <button className="btn-blue text-center mb-4" onClick={this.handleDownload}>
                  Download
                </button>
                <CSVLink
                  data={this.state.product}
                  filename="pickList.csv"
                  className="hidden"
                  ref={r => this.csvLink = r}
                  target="_blank" />
              </div>
              <LocationTable product={this.state.product} />
            </div>
            : <div></div>
          }
        </div>
      </div>
    );
  }

}
