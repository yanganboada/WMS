import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div>
        <nav className="navbar sticky-top">
          <div className="navbar-brand">
            <i className="fas fa-bars"></i>
          </div>
          <span>
            <h4>Name</h4>
          </span>
        </nav>
      </div>
    );
  }
}
