import React, { Component } from "react";
import { signInWithGoogle } from "../../shared/helpers/firebase.js";
import { Container } from "semantic-ui-react";
import Logo from "../../shared/images/detective-searching.png";
import Car from "../../shared/images/car-in-parkinlot.jpg";
import "./homepage.scss";
export default class Homepage extends Component {
  render() {
    return (
      <Container id="homepage">
        <main>
          <section>
            <p>Ticket Detective</p>
            <img src={Logo} alt="Dectective looking for clues" />
          </section>

          <h1>Find parking violations using your license plate</h1>
          <img src={Car} />
          <p>
            Ticket detective is a tool that allows you to search state records
            for parking and camera violations. The tool allows you to keep track
            of your ticket history.
          </p>
          <button onClick={signInWithGoogle}>Sign-in with Google</button>
        </main>

        <footer>
          <p>Powered by NYC Open Data</p>
        </footer>
      </Container>
    );
  }
}
