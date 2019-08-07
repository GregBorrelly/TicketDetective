import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import Navigation from "./components/Navigation/navigation";
import HomePage from "./pages/Homepage/homepage";
import Dashboard from "./pages/Dashboard/dashboard";
import Search from "./pages/Search/search";
import { firestore, auth, createUser } from "./shared/helpers/firebase";

import { connect } from "react-redux";
import { setUser } from "./redux/modules/user";

import "./App.scss";

class App extends Component {
  state = {
    user: null
  };
  unsuscribeFromAuth = null;
  componentDidMount() {
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async auth => {
      const user = await createUser(auth);
      debugger;
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/dashboard");
      } else {
        this.props.history.push("/");
      }
    });
  }

  render() {
    const { user } = this.props;

    return (
      <Container className="App">
        {user && <Navigation />}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </Container>
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
  )(App)
);
