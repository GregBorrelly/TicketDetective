import SearchCard from "../../components/SearchCard/SearchCard";
import React, { Component } from "react";
import { Image, Container, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestore } from "../../shared/helpers/firebase";
import { setUser } from "../../redux/modules/user";
import "./dasboard.scss";
class Dashboard extends Component {
  get uid() {
    return this.props.user.id;
  }

  get userRef() {
    return firestore.collection("users").doc(this.uid);
  }

  removeTicketFromRecords = async summons_number => {
    const { user, setUser } = this.props;
    const updatedRecords = user.userRecords.filter(
      record => record.summons_number !== summons_number
    );
    await this.userRef.update({
      userRecords: updatedRecords
    });

    const userDocument = await this.userRef.get();
    setUser({ ...userDocument.data() });
  };

  render() {
    const { removeTicketFromRecords } = this;
    const { user } = this.props;
    return (
      <div>
        {user && (
          <div id="dashboard">
            <Segment>
              <Image src={user.photoUrl} size="medium" circular centered />
              <h1>{user.displayName}</h1>
            </Segment>
            <Container>
              <h2>Records</h2>
              {user.userRecords.length > 0 ? (
                user.userRecords.map(record => (
                  <SearchCard
                    {...record}
                    inDashboard
                    removeTicketFromRecords={removeTicketFromRecords}
                  />
                ))
              ) : (
                <p className="emptyState">
                  <span> {user.displayName}</span> you do not have any records
                  saved, use the
                  <span> search</span> feature to search state records.
                </p>
              )}
            </Container>
          </div>
        )}
      </div>
    );
  }
}

const maptStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setUser: userData => dispatch(setUser(userData))
});
export default connect(
  maptStateToProps,
  mapDispatchToProps
)(Dashboard);
