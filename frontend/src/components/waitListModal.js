import React from "react";
import "./modal.css";
import PropTypes from 'prop-types';

class WaitListModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        showWaitListModal: '', 
        form: {},
        lastParty: null,
        party_size_list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        quote_time_list: [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90],
        waitListMsg: ''
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.showWaitListModal !== nextProps.showWaitListModal || nextProps.party !== prevState.lastParty || nextProps.waitListMsg !== prevState.waitListMsg){
        return {
            showWaitListModal: nextProps.showWaitListModal,
            form: nextProps.party, 
            lastParty: nextProps.party,
            waitListMsg: nextProps.waitListMsg
        }
    }
    return { }
  }

  render() {
    if (!this.state.showWaitListModal)  {
      return null;
    }
    const { _id, first_name, last_name, email_address, phone_number, party_size, quote_time, party_type, party_status, table, date_created } = this.state.form;

    return (
        <div className="container-modal" id="modal">
          <section className="container-modal-main">
          <div className="page-header">
            <h1>Wait List</h1>      
          </div>
          <div>{this.state.waitListMsg ? this.state.waitListMsg : ''}</div>
          <div className="actions">
          <form onSubmit={e => this.props.onSubmit(e, this.state.form)}>
            <input type="hidden" name="_id" value={_id}/>
            <input type="hidden" name="party_type" value={party_type.name}/>
            <input type="hidden" name="party_status" value={party_status.name}/>
            <input type="hidden" name="table_number" value={table.table_number}/>
            <label>
            First Name:&nbsp;
            <input type="text" name="first_name" value={first_name} readOnly onChange={this.onChange}/>
            </label>
            <br />
            <label>
            Last Name:&nbsp;
            <input type="text" name="last_name" value={last_name} readOnly onChange={this.onChange}/>
            </label>
            <br />
            <label>
            Email:&nbsp;
            <input type="text" name="email_address" value={email_address} readOnly onChange={this.onChange}/>
            </label>
            <br />
            <label>
            Phone Number:&nbsp;
            
            <input type="text" name="phone_number" value={phone_number} readOnly onChange={this.onChange}/>
            </label>
            <br />
            <label>
            Party Size: &nbsp; 
            <select name="party_size" onChange={this.onChange} readOnly defaultValue={party_size}>
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
            Quote Time (mins): &nbsp;
            <select name="quote_time" onChange={this.onChange} readOnly defaultValue={quote_time}>
                <option value='0'></option>
                {
                    this.state.quote_time_list.map((e,key) => {
                    return <option key={key} value={e}>{e}</option>
                    })
                }
            </select>    
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
            <br />
            </form>
          </div>
        </section>
      </div>
    );
  }
}

WaitListModal.propTypes = {
  showWaitListModal: PropTypes.bool.isRequired, 
  party: PropTypes.object,
  waitListMsg: PropTypes.string.isRequired,
}

export default WaitListModal;
