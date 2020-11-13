import React from 'react';

export default class Reports extends React.Component {

  render() {
    return (
      <div>
        <div className="d-flex justify-content-center flex-wrap">
          <button
            className="btn-low-inv m-3 d-flex justify-content-center align-items-center"
            onClick={() => this.props.setView('lowInvReport', {})}>
              Low Inventory Report
          </button>
          <button
            className="btn-category m-3 d-flex justify-content-center align-items-center"
            onClick={() => this.props.setView('categoryReport', {})}>
            Category Report
          </button>
          <button
            className="btn-coming-soon m-3 d-flex justify-content-center align-items-center"
            onClick={event.preventDefault()}>
            Coming Soon
          </button>
        </div>
      </div>
    );
  }

}
