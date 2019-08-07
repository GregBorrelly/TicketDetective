import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import SearchBox from "../../components/SearchBox/searchBox";
import SearchCard from "../../components/SearchCard/SearchCard";
import Loader from "../../shared/images/detective-searching.png";
import "./search.scss";
import { connect } from "react-redux";
import { setUser } from "../../redux/modules/user";
import { firestore } from "../../shared/helpers/firebase";
import sanitizeObject from "../../shared/helpers/firebaseUndefinedCheck.js";
class Search extends Component {
  state = {
    isSearching: false,
    addingRecord: false,
    records: null
  };

  fetchRecords = async licensePlate => {
    this.setState({ isSearching: true, licensePlate });
    const snapshot = await firestore.collection("records").get();
    const tickets = snapshot.docs.map(doc => doc.data());

    const records = tickets.filter(ticket => {
      if (ticket.plate === licensePlate) {
        return ticket;
      }
    });
    debugger;
    this.setState({ records, isSearching: false });
  };

  get uid() {
    return this.props.user.id;
  }

  get userRef() {
    return firestore.collection("users").doc(this.uid);
  }

  addTicketToRecords = async record => {
    this.setState({ addingRecord: true });
    const { user } = this.props;
    const sanitizedRecord = sanitizeObject(record);
    await this.userRef.update({
      userRecords: [sanitizedRecord, ...user.userRecords]
    });
    const userDocument = await this.userRef.get();

    this.setState({ addingRecord: false });
    this.props.setUser({ ...userDocument.data() });
    this.props.history.push("/dashboard");
  };

  render() {
    const { fetchRecords, addTicketToRecords } = this;
    const { isSearching, records, licensePlate, addingRecord } = this.state;
    const { user } = this.props;
    return (
      <div id="search">
        <SearchBox fetchRecords={fetchRecords} />
        {!isSearching ? (
          <Container>
            {records &&
              records.map(record => (
                <SearchCard
                  {...record}
                  addTicketToRecords={addTicketToRecords}
                  loading={addingRecord}
                  userRecords={user.userRecords}
                />
              ))}
          </Container>
        ) : (
          <div className="loader">
            <img src={Loader} alt="Detective loading Icon" />
          </div>
        )}
        {records && records.length === 0 && (
          <div className="error">
            <span> No records </span>found for license plate
            <span> {licensePlate} </span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setUser: userData => dispatch(setUser(userData))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
