import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-brand">
            <i className="fas fa-bars fa-2x"></i>
          </div>
          <span>
            <h3>Name</h3>
          </span>
        </nav>
      </div>
    );
  }
}
