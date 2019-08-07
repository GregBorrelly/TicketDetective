import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import SearchBox from "../../components/SearchBox/searchBox";
import SearchCard from "../../components/SearchCard/SearchCard";
import Loader from "../../shared/images/detective-searching.png";
import "./search.scss";

export default class Search extends Component {
  state = {
    isSearching: false,
    records: null
  };
  fetchRecords = async licensePlate => {
    this.setState({ isSearching: true, licensePlate });
    const res = await fetch(
      "https://data.cityofnewyork.us/resource/uvbq-3m68.json"
    );
    const tickets = await res.json();
    const records = tickets.filter(ticket => {
      if (ticket.plate === licensePlate) {
        return ticket;
      }
    });
    this.setState({ records, isSearching: false });
  };
  render() {
    const { fetchRecords } = this;
    const { isSearching, records, licensePlate } = this.state;
    return (
      <div id="search">
        <SearchBox fetchRecords={fetchRecords} />
        {!isSearching ? (
          <Container>
            {records && records.map(record => <SearchCard {...record} />)}
          </Container>
        ) : (
          <div className="loader">
            <img src={Loader} alt="Detective loading Icon" />
          </div>
        )}
        {records && records.length === 0 && (
          <div className="error">
            No records found for license plate {licensePlate}{" "}
          </div>
        )}
      </div>
    );
  }
}
