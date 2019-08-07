import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation/navigation";
import HomePage from "./pages/Homepage/homepage";
import Search from "./pages/Search/search";
import { firestore, auth } from "./shared/helpers/firebase";
import "./App.scss";


class App extends Component {
  state = {
    user: null
  };
  unsuscribeFromAuth = null;
  componentDidMount() {
    this.unsuscribeFromAuth = auth.onAuthStateChanged(user => {
      debugger;
    });
  }

  render() {
    const { user } = this.state;
    return (
      <Container className="App">
        <BrowserRouter>
          {user && <Navigation />}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/app" component={() => <div>App Page</div>} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
