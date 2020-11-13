import React from 'react';

export default class HomePage extends React.Component {

  render() {
    return (
      <div>
        <div className="banner d-flex justify-content-center mb-4">
          <h1 className="text-white home-page-text m-auto">WMS</h1>
        </div>

        <div className="d-flex justify-content-center flex-wrap">
          <button className="btn-product m-3" onClick={() => this.props.setView('productList', {})}>
            <i className="fas fa-list fa-4x icon-blue"></i>
            <div>
              Product
            </div>
          </button>

          <button className="btn-reports m-3" onClick={() => this.props.setView('reports', {})}>
            <i className="fas fa-chart-line fa-4x icon-blue"></i>
            <div>
              Reports
            </div>
          </button>

          <button className="btn-import-product m-3" onClick={() => this.props.setView('importProducts', {})}>
            <i className="fas fa-cloud-upload-alt fa-4x icon-blue"></i>
            <div>
              Import Products
            </div>
          </button>

          <button className="btn-export-product m-3" onClick={() => this.props.setView('exportProducts', {})}>
            <i className="fas fa-cloud-download-alt fa-4x icon-blue"></i>
            <div>
              Export Products
            </div>
          </button>

          <button className="btn-gen-pick-list m-3" onClick={() => this.props.setView('genPickList', {})}>
            <i className="far fa-file-alt fa-4x icon-blue"></i>
            <div>
              Generate Pick List
            </div>
          </button>

          <button className="btn-po-suggestion m-3" onClick={() => this.props.setView('poSuggestions', {})}>
            <i className="fas fa-shopping-cart fa-4x icon-blue"></i>
            <div>
              PO Suggestions
            </div>
          </button>
        </div>

      </div>
    );

  }

}
