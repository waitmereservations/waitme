import React from "react";
import "./modal.css";
export default class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <section className="modal-main">
          <h2>Modal Window</h2>
          <div className="content">{this.props.reservationid}</div>
          <div className="actions">
            <button
              onClick={(e) => {
                this.props.onClick(e);
              }}
            >
              Close
            </button>
          </div>
        </section>
      </div>
    );
  }
}
