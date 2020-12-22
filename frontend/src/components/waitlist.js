import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import WaitListModal from "./waitListModal";
import { updateWaitListMsg, createWaitList, updateWaitList  } from './../actions/partiesAction';

class Waitlists extends Component {

  constructor(props){
    super(props);
    this.state = {showWaitListModal: false, party: {}, waitListMsg: '' }
  }

  toggleModal = async (e, party) => {
    await this.setState({
      showWaitListModal: !this.state.showWaitListModal, 
      party: party
    });
    this.props.updateWaitListMsg();
    this.props.onReRenderApp();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if  (nextProps.waitListMsg !== prevState.waitListMsg){
      return {
        waitListMsg: nextProps.waitListMsg
      }
    }
    return {}
  }

  onSubmit = async (event, form) => {
    event.preventDefault();
    const obj = { table: {table_number: 'waitlist'}, party_type: {name:'waitlist'}, party_status: {name: 'upcoming'} }
    form = { ...form, ...obj }
    await this.setState((prevState) => ({
      ...prevState,
      party: {...prevState.party,...form
      }
    }));

    if (form._id === undefined){
      await this.props.createWaitList(this.state.party);  
    }
    else{
      await this.props.updateWaitList(this.state.party);
    }
  }

  render() {
    const waitlist = this.props.dinersArray.map((partyDiv) => (
      <div
        key={partyDiv.key}
        className="containertab"
      >
        <div onClick={(e) => this.toggleModal(e, partyDiv.props.party)}>{partyDiv}</div> 
        <div className="customername">{partyDiv.props.customername}</div>
      </div>
    ));

    const nullParty = { 
      first_name: 'readonlyf', 
      last_name: 'readonlyl',
      email_address: 'readonly@readonly.com',
      phone_number: '1231231232',
      party_type: { name: 'waitlist'},
      party_status: { name: 'upcoming'},
      party_size: '2',
      table: { table_number: 'waitlist'},
      quote_time: '5'
    }
    const newWaitList = (<div className="waitListText"> <button onClick={(e) => this.toggleModal(e, nullParty)}><i>+ Wait List</i></button></div>)
    return (
      <div>
        <div
          onDragOver={(e) => this.props.onDragOver(e)}
          onDrop={(e) => this.props.onDrop(e, this.props.table)}
        >
          {newWaitList}
          {waitlist}
        </div>
        <div className="Modal">
          <WaitListModal
            showWaitListModal={this.state.showWaitListModal}
            toggleModal={this.toggleModal}
            waitListMsg={this.state.waitListMsg}
            party={this.state.party}
            onSubmit={this.onSubmit}
          >
          </WaitListModal>
        </div>
      </div>  
    );
  }
}


Waitlists.propTypes = {
  table: PropTypes.string.isRequired,
  dinersArray: PropTypes.array.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  createWaitList: PropTypes.func.isRequired, 
  updateWaitList: PropTypes.func.isRequired,
  updateWaitListMsg: PropTypes.func.isRequired, 
}

const mapStateToProps = state => ( { 
  party: state.parties.waitlist,
  waitListMsg: state.parties.waitListMsg
})

export default connect(mapStateToProps, { updateWaitListMsg, createWaitList, updateWaitList })(Waitlists);

