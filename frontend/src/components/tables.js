import React, { Component } from "react";
import Table from "./table";
import PropTypes from "prop-types";

class Tables extends Component {
  render() {
    const tableReservation = [];
    for (const divTable in this.props.dinersArray) {
      if (divTable !== "reservation" && divTable !== "waitlist"){
        tableReservation.push(
          <Table
            table={divTable}
            tableReservationObj={this.props.dinersArray[divTable]}
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
            key={divTable}
            showTableModal={this.props.showTableModal}
            onClick={this.props.onClick}
            displayDiv={true}
            onReRenderApp={this.props.onReRenderApp}
          />
        );
      }
    }

    return <div className="dinningRoom">{tableReservation}</div>;
  }
}

Tables.propTypes = {
  onReRenderApp: PropTypes.func.isRequired,
  dinersArray: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default Tables;
