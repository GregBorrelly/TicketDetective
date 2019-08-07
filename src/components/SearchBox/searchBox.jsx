import React, { Component } from "react";
import { Button, Container, Icon } from "semantic-ui-react";
import "./searchBox.scss";

export default class SearchBox extends Component {
  state = {
    value: ""
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({ value: value.toUpperCase() });
  };

  handleQuery = () => {
    const { fetchRecords } = this.props;
    const { value } = this.state;
    fetchRecords(value);
  };

  render() {
    const { handleInputChange, handleQuery } = this;
    const { value } = this.state;

    return (
      <div id="searchBox">
        <Container>
          <input
            type="text"
            value={value}
            placeholder="License Plate Number i.e HT876G"
            onChange={handleInputChange}
          />
          <Button onClick={handleQuery} fluid primary>
            <Icon name="search" />
            Search Records
          </Button>
        </Container>
      </div>
    );
  }
}
