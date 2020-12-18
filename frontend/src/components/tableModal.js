import React from "react";
import "./modal.css";
import axios from 'axios';
import { connect } from 'react-redux';
import { updateTableStatus } from './../actions/tablesAction';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';

class TableModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      reservationid: '', 
      table_status: '' , 
      table_number: '', 
      tableStatusArray: '', 
      showRadio: '', 
      tableReservation: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
      return { tableReservation: nextProps.tableReservation, table_number: nextProps.table_number, showRadio: nextProps.showTableModal}
  }

  componentDidUpdate(prevProps, prevState) {
    //Perform some operation here
    if (prevProps.tableReservation !== this.props.tableReservation){
      this.setState({ reservationid: this.props.tableReservation.length ? this.props.tableReservation[0].props.reservationid : '',
        table_status: this.props.tableReservation.length ? this.props.tableReservation[0].props.table_status : ''})
    }
  }


  async componentDidMount() {    
    const res = await axios.get('http://localhost:5000/tableStatus', {});
    if (res.status === 200) {
      await this.setState({...this.state, tableStatusArray: res.data})
    }
  }

  onChange = async (e) => { 
    let process = false;
    if (e.target.value === "left") {
      if (window.confirm('This will delete party from table. Are you sure?')){
        process = true;
      }
      else {
        process = false;
      }
    }  
    else {
      process = true;
    }

    if (process){
      await this.setState({ [e.target.name]: e.target.value });
      const tableObj = { 
        reservationid: this.state.reservationid, table_status: this.state.table_status, table_number: this.state.table_number
      };
      this.props.updateTableStatus(tableObj);
    }
  }
 
  render() {
    if (!this.state.showRadio)  {
      return null;
    }
    return (
      <div className="container-modal" id="modal">
        <section className="container-modal-main">
          <center><h2>Table Status</h2></center>
          <div className="actions">
              <form onSubmit={this.onSubmit}>
                <input type="hidden" name="reservationid" value={this.state.reservationid}/>
                <input type="hidden" name="table_number" value={this.state.table_number}/>
                <FormGroup tag="fieldset">
                {this.state.tableStatusArray.map((el,key) => (
                     <FormGroup check key={key}>
                       <Label check>
                       <input type="radio" name="table_status"  value={el.name} checked={this.state.table_status === el.name} onChange={this.onChange} />{' '}
                       {el.name}
                       </Label>
                     </FormGroup>
                ))}
                  </FormGroup>
              </form>
            <center>
              <button onClick={(e) => { this.props.onClick(e); }} >Close</button>
            </center>
          </div>
        </section>
      </div>
    );
  }
}

TableModal.propTypes = {
  updateTableStatus: PropTypes.func.isRequired
}

export default connect(null, { updateTableStatus })(TableModal);
