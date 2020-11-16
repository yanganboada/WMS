import React from 'react';
import Table from './table';

export default class ImportProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      fileUrl: '',
      csvFile: null
    };
    this.hangdleFileChange = this.hangdleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
  }

  hangdleFileChange(e) {
    this.setState({
      fileUrl: URL.createObjectURL(e.target.files[0]),
      csvFile: e.target.files[0]
    });
  }

  handlePreview(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('csvUpload', this.state.csvFile);

    fetch('/api/uploads', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          product: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSubmit(e) {
    const products = [...this.state.product];
    products.forEach(product => {
      fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
        .then(res => res.json())
        .then(result => {
          this.props.setView('productList', {});
        })
        .catch(err => console.error(err));
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row card">
          <div className="back-arrow w-100 p-2 cursor d-flex justify-content-end" onClick={() => this.props.setView('productList', {})} >
            <p className="text-muted font-italic">Back to Product List -&gt;</p>
          </div>
          <form encType="multipart/form-data" className="row justify-content-between m-2" onSubmit={this.handlePreview}>
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
              ? <button className="btn-grey mx-auto my-2" disabled>Preview</button>
              : this.state.product.length
                ? <div></div>
                : <button type='submit' className="btn-green mx-auto my-2">Preview</button>
            }
          </form>

        </div>
        {this.state.product.length
          ? <div className='row justify-content-center'>
            <button type='submit' className="btn-blue text-center mb-4" onClick={this.handleSubmit}>Submit</button>
            <Table product={this.state.product} />
          </div>
          : <div></div>
        }
      </div>
    );
  }
}
