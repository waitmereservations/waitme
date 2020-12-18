import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ReservationModal from "./reservationModal";
import { updateReservationMsg, createReservation, updateReservation  } from './../actions/partiesAction';

class Reservation extends Component {

  constructor(props){
    super(props);
    this.state = {showReservationModal: false, party: {}, reservationMsg: '' }
  }

  toggleModal = async (e, party) => {
    await this.setState({
      showReservationModal: !this.state.showReservationModal, 
      party: party
    });
    this.props.updateReservationMsg();
    this.props.onReRenderApp();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if  (nextProps.reservationMsg !== prevState.reservationMsg){
      return {
        reservationMsg: nextProps.reservationMsg
      }
    }
    return {}
  }

  onSubmit = async (event, form) => {
    event.preventDefault();
    const obj = { table: {table_number: 'reservation'}, party_type: {name:'reservation'}, party_status: {name: 'upcoming'} }
    form = { ...form, ...obj }

    await this.setState((prevState) => ({
      ...prevState,
      party: {...prevState.party,...form
      }
    }));

    if (form._id === undefined){
      await this.props.createReservation(this.state.party);  
    }
    else{
      await this.props.updateReservation(this.state.party);
    }
  }

  render() {
    const reservations = this.props.dinersArray.map((partyDiv) => (
      <div
        key={partyDiv.key}
        className="containertab"
      >
        <div onClick={(e) => this.toggleModal(e, partyDiv.props.party)}>{partyDiv}</div> 
        <div className="customername">{partyDiv.props.customername}</div>
      </div>
    ));

    const nullParty = { 
      first_name: '', 
      last_name: '',
      email_address: '',
      phone_number: '',
      party_type: { name: ''},
      party_status: { name: ''},
      party_size: '',
      table: { table_number: ''},
      reservation_time: '',
      reservation_confirmed: false
    }

    const newReservation = (<div className="waitListText"> <button onClick={(e) => this.toggleModal(e, nullParty)}><i>+ Reservation</i></button></div>)
    return (
      <div>
        <div
          onDragOver={(e) => this.props.onDragOver(e)}
          onDrop={(e) => this.props.onDrop(e, this.props.table)}
        >
          {newReservation}
          {reservations}
        </div>
        <div className="Modal">
          <ReservationModal
            showReservationModal={this.state.showReservationModal}
            toggleModal={this.toggleModal}
            reservationMsg={this.state.reservationMsg}
            party={this.state.party}
            onSubmit={this.onSubmit}
          >
          </ReservationModal>
        </div>
      </div>  
    );
  }
}

Reservation.propTypes = {
  table: PropTypes.string.isRequired,
  dinersArray: PropTypes.array.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  createReservation: PropTypes.func.isRequired, 
  updateReservation: PropTypes.func.isRequired,
  updateReservationMsg: PropTypes.func.isRequired, 
};

const mapStateToProps = state => ( { 
  party: state.parties.reservation,
  reservationMsg: state.parties.reservationMsg
})

export default connect(mapStateToProps, { updateReservationMsg, createReservation, updateReservation })(Reservation);
