import React, { Component } from "react";
import { Card, Image, Icon, Container, Button } from "semantic-ui-react";
import SearchBox from "../../components/SearchBox/searchBox";
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
            {records && records.map(
              ({
                summons_number,
                violation,
                issue_date,
                fine_amount,
                violation_time,
                summons_image,
                issuing_agency,
                state,
                violation_status,
                penalty_amount,
                interest_amount,
                reduction_amount,
                payment_amount,
                amount_due
              }) => {
                return (
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>{violation}</Card.Header>
                      <Card.Meta>
                        Issued {issue_date} {state}
                      </Card.Meta>
                      <Card.Meta>Violation time {violation_time} </Card.Meta>
                      <Card.Description>
                        <p>
                          Issuing Agency: <span>{issuing_agency}</span>
                        </p>
                        <p>
                          Summons Number: <span>{summons_number}</span>
                        </p>
                        <p>
                          Violation Status: <span>{violation_status}</span>
                        </p>
                        <Container>
                          <p>
                            - Fine Amount:
                            <span> ${fine_amount}</span>
                          </p>
                          <p>
                            - Penalty Amount:
                            <span> ${penalty_amount}</span>
                          </p>
                          <p>
                            - Interest Amount:
                            <span> ${interest_amount}</span>
                          </p>
                          <p>
                            - Reduction Amount:
                            <span> ${reduction_amount}</span>
                          </p>
                          <p>
                            - Payment Amount:
                            <span> ${payment_amount}</span>
                          </p>
                        </Container>
                        <p>
                          Total Amount Due:
                          <span>
                            <Icon name="dollar" color="red" />
                            {amount_due}
                          </span>
                        </p>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a href={summons_image.url} target="blank">
                        <Icon name="picture" color="red" />
                        View ticket
                      </a>
                      <Button>Save Ticket to History</Button>
                    </Card.Content>
                  </Card>
                );
              }
            )}
          </Container>
        ) : (
          <div className="loader">
            <img src={Loader} alt="Detective loading Icon" />
          </div>
        )}
        {records && records.length === 0 && (
          <div className="error"> No records found for license plate {licensePlate} </div>
        )}
      </div>
    );
  }
}
