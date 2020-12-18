import React, { Component } from "react";
import PropTypes from "prop-types";
import TableModal from "./tableModal";

class Table extends Component {

  constructor(props){
    super(props);
    this.state = {showTableModal: false, diners: [], reservationid: '', table_number: ''}
  }

  toggleModal = (ev, id) => {
    this.setState({
      showTableModal: !this.state.showTableModal
    });
    this.props.onReRenderApp();
  };

  render() {
    const diners = this.props.tableReservationObj.map(
      (reservation) => (
        <div
          onClick={(e) => this.toggleModal(e, reservation.key)}
          key={reservation.key}
        >
          {reservation}
        </div>
      )
    );
    
    return (
      <div className="tableClass">
        <div
          style={{ display: this.props.displayDiv ? "block" : "none", height: '85%', alignItems: 'center', }}
          onDragOver={(e) => this.props.onDragOver(e)}
          onDrop={(e) => this.props.onDrop(e, this.props.table)}
        >
          {this.props.table}
          {diners}
        </div>
        <div className="Modal">
          <TableModal
            showTableModal={this.state.showTableModal}
            onClick={this.toggleModal}
            table_number={this.props.table}
            destinationTable={this.state.destinationTable}
            tableReservation={this.props.tableReservationObj}
          >
          </TableModal>
        </div>
      </div>  
    );
  }
}

Table.propTypes = {
  onReRenderApp: PropTypes.func.isRequired,
  table: PropTypes.string.isRequired,
  tableReservationObj: PropTypes.array.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default Table;
