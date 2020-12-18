import React, { Component } from "react";
import Reservation from "./reservation";
import PropTypes from "prop-types";

class Reservations extends Component {
  render() {
    //this.props.tableReservation ==> object of key (table name)/value (array of divs): {table_1: Array(1), reservation: Array(2), waitlist: Array(3), table_2: Array(0)}
    //only reservation and wait
    const reservationList = [];
    for (const table in this.props.dinersArray) {
      if (table === "reservation") {
        reservationList.push(
          <Reservation
            table={table}
            dinersArray={this.props.dinersArray[table]}
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
            key={table}
            showReservationModal={this.props.showReservationModal}
            onReRenderApp={this.props.onReRenderApp}
          />
        );
      } 
    }

    return (
      <div className="container-drag">
        {reservationList}
      </div>
    );
  }
}

Reservations.propTypes = {
  dinersArray: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onReRenderApp: PropTypes.func.isRequired,
};

export default Reservations;
