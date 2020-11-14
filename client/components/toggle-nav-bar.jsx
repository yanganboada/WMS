import React from 'react';

export default class ToggleNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuShow: false
    };
    this.handelClick = this.handelClick.bind(this);
  }

  handelClick() {
    this.setState({
      isMenuShow: !this.state.isMenuShow
    });
  }

  render() {
    if (!this.state.isMenuShow) {
      return <i className="fa fa-bars fa-3x" onClick={this.handelClick}></i>;
    } else {
      return (
        <nav className="menu">
          <h1>Menu</h1>
          <ul onClick={this.handelClick}>
            <li><a href="#">About</a></li>
            <li><a href="#">Get Started</a></li>
            <li><a href="#">Sign in</a></li>
          </ul>
        </nav>
      );
    }
  }
}
