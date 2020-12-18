import React, { Component } from "react";
import "./bootstrap.min.css";
import "./App.css";
import Tables from "./components/tables";
import WaitLists from "./components/waitlists";
import Reservations from "./components/reservations";
import Tabs from "./components/tabs"; 
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { fetchParties, updateParties, createWalkin } from './actions/partiesAction'
import { fetchTables } from './actions/tablesAction'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showTableModal: false,
      showWaitListModal: false,
      showReservtionModal: false,
      destinationTable: "",
      parties: null,
      walkin: {}, 
      walkinListArray: [{id:"walkin1", name:"1 Person Walk-In"},{id:"walkin2", name:"2 People Walk-In"},,{id:"walkin3", name:"3 People Walk-In"},
                  {id:"walkin4", name:"4 People Walk-In"},{id:"walkin5", name:"5 People Walk-In"},{id:"walkin6", name:"6 People Walk-In"},
                  {id:"walkin7", name:"7 People Walk-In"},{id:"walkin8", name:"8 People Walk-In"},{id:"walkin9", name:"9 People Walk-In"},
                  {id:"walkin10", name:"10 People Walk-In"},{id:"walkin11", name:"11 People Walk-In"},{id:"walkin12", name:"12 People Walk-In"}]
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.parties !== nextProps.parties || prevState.walkin !== nextProps.walkin){
      return {
        parties: nextProps.parties, 
        walkin: nextProps.walkin
      }
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchTables();
    this.props.fetchParties();
  }
  
  onReRenderApp = () => {
    this.props.fetchParties();
  }

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
    if (id.includes("walkin")){
      ev.dataTransfer.effectAllowed = "copy";
    }
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = async (ev, tableTarget) => {
    let id = ev.dataTransfer.getData("id");

    if (id.includes("walkin")){

      const walkinObj = {
        table_number: tableTarget, 
        party_type: "walkin",
        party_status: "seated",
        party_size: parseInt(id.replace( /^\D+/g, ''))
      }

      await this.props.createWalkin(walkinObj); 
      await this.onReRenderApp();
    }
    else {
        //check if destination-table is filled
        const tableIsFilled = this.props.parties.find((party) => {
          if (party.table.table_number === tableTarget) {
            return true;
          }
          else {
            return false;
          }
        });

        if (!tableIsFilled || tableTarget === "waitlist" || tableTarget === "reservation") {
          let updatedParties = this.props.parties.filter((party) => {
            if (party._id === id) {
              party.table.table_number = tableTarget;
            }
            return party;
          });

          const partyAsignToTable = {
            _id: id,
            table_number: tableTarget, 
            party_type: tableTarget
          }

          this.props.updateParties(partyAsignToTable, updatedParties);
          this.setState({
            destinationTable: tableTarget,
          });
        } 
        else {
          console.log("table already filled");
        }
    }

    
  };

  render() {
    var dinersArray = {};
    for (var element in this.props.TableData) {
      Object.defineProperty(dinersArray, this.props.TableData[element].table_number, {
        value: [],
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }

    if (Object.keys(dinersArray).length === 0){
        console.log("loading")
    }
    else {
      this.state.parties.forEach((t) => {
        dinersArray[t.table.table_number].push(
          <div
            key={t._id}
            party={t}
            reservationid={t._id}
            onDragStart={(e) => this.onDragStart(e, t._id)}
            draggable
            className="draggable"
            customername={t.first_name + " " + t.last_name} 
            table_status={t.table.table_status ? t.table.table_status.name : "" }
            table_number={t.table.table_number}
          >
            <img src={window.location.origin + '/user.jpg'} alt="user" height="40" width="40"/> 
          </div>
        );
      });
    }

    const walkinView = this.state.walkinListArray.map((t) => (
        <div
          key={t.id}
          onDragStart={(e) => this.onDragStart(e, t.id)}
          draggable
          className="draggable"
          id={t.id}
        >
          <img src={window.location.origin + '/user.jpg'} alt="user" height="40" width="40"/> 
          {t.name}
        </div> 
    ));

    return (
        <div className="mainContainer">
          <div className="tabContainer">
            <Tabs>
              <div label="Walk Ins"> 
                {walkinView}
              </div>  
              <div label="Waitlist"> 
                <WaitLists
                dinersArray={dinersArray}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                showWaitListModal={this.state.showWaitListModal}
                onReRenderApp={this.onReRenderApp}
                />
              </div> 
              <div label="Reservations"> 
                <Reservations
                  dinersArray={dinersArray}
                  onDragOver={this.onDragOver}
                  onDrop={this.onDrop}
                  showReservationModal={this.state.showReservationModal}
                  onReRenderApp={this.onReRenderApp}
                />
              </div> 
          </Tabs> 
          </div>
          <div className="tablesContainer">
            <Tables
              dinersArray={dinersArray}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              showTableModal={this.state.showTableModal}
              onClick={this.toggleModal}
              onReRenderApp={this.onReRenderApp}
            />
          </div>
        </div>
    );
  }
}

App.propTypes = {
  fetchParties: PropTypes.func.isRequired,
  fetchTables: PropTypes.func.isRequired,
  updateParties: PropTypes.func.isRequired,
  createWalkin: PropTypes.func.isRequired,
  parties: PropTypes.array.isRequired,
  TableData: PropTypes.array.isRequired,
};

const mapStateToProps = state => ( { 
  parties: state.parties.items, 
  TableData: state.tables.items,
  walkin: state.parties.party
})

export default connect(mapStateToProps, { fetchParties, fetchTables, updateParties, createWalkin }) ( App )
