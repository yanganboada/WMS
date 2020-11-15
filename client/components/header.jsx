import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuShow: false
    };
    this.handelNavClick = this.handelNavClick.bind(this);
  }

  handelNavClick() {
    this.setState({
      isMenuShow: !this.state.isMenuShow
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar sticky-top">
          <div className="navbar-brand">
            {
              !this.state.isMenuShow
                ? <i className="fas fa-bars fa-lg" onClick={this.handelNavClick}></i>
                : <div className="menu col-8 d-flex justify-content-start vh-100 position-fixed m-0 p-4">
                  <ul className='nav flex-column py-2 mt-4' onClick={this.handelNavClick}>
                    <li className='nav-item'>
                      <div className='row p-3 justify-content-start align-items-baseline' onClick={() => this.props.setView('homePage', {})}>
                        <i className="fas fa-home icon-white"></i>
                        <p className='pl-3 text-white'>Home Page</p>
                      </div>
                    </li>
                    <li className='nav-item'>
                      <div className='row p-3 justify-content-start align-items-baseline' onClick={() => this.props.setView('productList', {})}>
                        <i className="fas fa-list icon-white"></i>
                        <p className='pl-3 text-white'>Product</p>
                      </div>
                    </li>
                    <li className='nav-item'>
                      <div className="row p-3 justify-content-start align-items-baseline" onClick={() => this.props.setView('importProducts', {})}>
                        <i className="fas fa-cloud-upload-alt icon-white"></i>
                        <p className='pl-3 text-white'>Import Products</p>
                      </div>
                    </li>
                    <li className='nav-item'>
                      <div className='row p-3 justify-content-start align-items-baseline' onClick={() => this.props.setView('exportProducts', {})}>
                        <i className="fas fa-cloud-download-alt icon-white"></i>
                        <p className='pl-3 text-white'>Export Products</p>
                      </div>
                    </li>
                    <li className='nav-item'>
                      <div className='row p-3 justify-content-start align-items-baseline' onClick={() => this.props.setView('generatePickList', {})}>
                        <i className="fas fa-file-alt icon-white"></i>
                        <p className='pl-3 text-white'>Generate Pick List</p>
                      </div>
                    </li>
                    <li className='nav-item'>
                      <div className='row p-3 justify-content-start align-items-baseline' onClick={() => this.props.setView('poSuggestions', {})}>
                        <i className="fas fa-shopping-cart icon-white"></i>
                        <p className='pl-3 text-white'>PO Suggestions</p>
                      </div>
                    </li>
                    <li className='nav-item'>
                      <div className='row p-3 justify-content-start align-items-baseline' onClick={() => this.props.setView('reports', {})}>
                        <i className="fas fa-chart-line icon-white"></i>
                        <p className='pl-3 text-white'>Reports</p>
                      </div>
                    </li>
                  </ul>
                </div>
            }
          </div>
          <span>
            <h5>
              {this.props.view
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())}
            </h5>
          </span>
        </nav>
      </div>
    );
  }
}
