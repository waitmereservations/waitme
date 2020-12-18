import React from "react";
import "./modal.css";
import PropTypes from 'prop-types';

class ReservationModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        showReservationModal: '', 
        form: {},
        party_size_list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        reservation_time_list: ["10:00am","10:30am","11:00am","11:30am","12:00pm","12:30pm","1:00pm","1:30pm","2:00pm","2:30pm","3:00pm","3:30pm","4:00pm","4:30pm","5:00pm","5:30pm","6:00pm","7:30pm","8:00pm","8:30pm","9:00pm","9:30pm","10:00pm","10:30pm","11:00pm","11:30pm"],
        reservationMsg: '',
        party: {}
    }
  }

  onChange = (e) => { 
    const obj = {};
    obj[e.target.getAttribute("name")] = e.target.value;
    this.setState((prevState) => ({
        ...prevState,
        form: {...prevState.form,...obj
        }
      }));
  }  

  onClick = (e) => {
    const obj = {};
    obj[e.target.getAttribute("name")] = e.target.checked;
    this.setState((prevState) => ({
        ...prevState,
        form: {...prevState.form,...obj
        }
      }));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.showReservationModal !== nextProps.showReservationModal || nextProps.party !== prevState.party || nextProps.reservationMsg !== prevState.reservationMsg){ 
      return {
            showReservationModal: nextProps.showReservationModal,
            form: nextProps.party, 
            party: nextProps.party,
            reservationMsg: nextProps.reservationMsg
        }
    }
    return { }
  }

  render() {
    if (!this.state.showReservationModal)  {
      return null;
    }
    const { _id, first_name, last_name, email_address, phone_number, party_size, reservation_time, reservation_confirmed, party_type, party_status, table, date_created } = this.state.form;

    return (
        <div className="container-modal" id="modal">
          <section className="container-modal-main">
          <div className="page-header">
            <h1>Reservation List</h1>      
          </div>
          <div>{this.state.reservationMsg ? this.state.reservationMsg : ''}</div>
          <div className="actions">
            <form onSubmit={e => this.props.onSubmit(e, this.state.form)}>
                <input type="hidden" name="_id" value={_id}/>
                <input type="hidden" name="party_type" value={party_type.name}/>
                <input type="hidden" name="party_status" value={party_status.name}/>
                <input type="hidden" name="table_number" value={table.table_number}/>
                <label>
                First Name:&nbsp;
                <input type="text" name="first_name" value={first_name} onChange={this.onChange}/>
                </label>
                <br />
                <label>
                Last Name:&nbsp;
                <input type="text" name="last_name" value={last_name} onChange={this.onChange}/>
                </label>
                <br />
                <label>
                Email:&nbsp;
                <input type="text" name="email_address" value={email_address} onChange={this.onChange}/>
                </label>
                <br />
                <label>
                Phone Number:&nbsp;
                <input type="text" name="phone_number" value={phone_number} onChange={this.onChange}/>
                </label>
                <br />
                <label>
                Party Size: &nbsp; 
                <select name="party_size" onChange={this.onChange} defaultValue={party_size}>
                    <option value='0'></option>
                    {
                        this.state.party_size_list.map((e,key) => {
                        return <option key={key} value={e}>{e}</option>
                        })
                    }
                </select>    
                </label>
                <br />
                <label>
                Reservation Time: &nbsp;
                <select name="reservation_time" onChange={this.onChange} defaultValue={reservation_time}>
                    <option value='0'></option>
                    {
                        this.state.reservation_time_list.map((e,key) => {
                        return <option key={key} value={e}>{e}</option>
                        })
                    }
                </select>    
                </label>
                <br />
                <label>
                Reservation Confirmed:&nbsp;
                <input type="checkbox" name="reservation_confirmed" defaultChecked={reservation_confirmed} value={reservation_confirmed} onClick={this.onClick}/>
                </label>
                <br />
                <label>
                Time Created: &nbsp; {date_created}
                </label>
                <br />
                <br />
            <center>
               <button type="submit" >Submit</button> <button onClick={(e) => { this.props.toggleModal(e); }} >Close</button>
            </center>
            </form>
            <br />
          </div>
        </section>
      </div>
    );
  }
}

ReservationModal.propTypes = {
  showReservationModal: PropTypes.bool.isRequired, 
  party: PropTypes.object,
  reservationMsg: PropTypes.string.isRequired
}

export default ReservationModal;


