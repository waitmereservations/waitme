import React, { Component } from "react";
import Waitlist from "./waitlist";
import PropTypes from "prop-types";

class WaitLists extends Component {
  render() {
    //this.props.tableReservation ==> object of key (table name)/value (array of divs): {table_1: Array(1), reservation: Array(2), waitlist: Array(3), table_2: Array(0)}
    //only reservation and wait
    const waitListArray = [];
    for (const table in this.props.dinersArray) {
       if (table === "waitlist") {
        waitListArray.push(
          <Waitlist
            table={table}
            dinersArray={this.props.dinersArray[table]}
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
            key={table}
            showWaitListModal={this.props.showWaitListModal}
            onReRenderApp={this.props.onReRenderApp}
          />
        );
      }
    }

    return (
      <div className="container-drag">
        {waitListArray}
      </div>
    );
  }
}

WaitLists.propTypes = {
  dinersArray: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onReRenderApp: PropTypes.func.isRequired,
};

export default WaitLists;
