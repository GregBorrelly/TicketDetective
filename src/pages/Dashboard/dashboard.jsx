import SearchCard from "../../components/SearchCard/SearchCard";
import React, { Component } from "react";
import { Image, Container, Segment } from "semantic-ui-react";
import "./dasboard.scss";
export default class Dashboard extends Component {
  state = {
    records: [
      {
        plate: "HKW6456",
        state: "NY",
        license_type: "PAS",
        summons_number: "8302030340",
        issue_date: "10/14/2016",
        violation_time: "02:36P",
        violation: "DOUBLE PARKING",
        fine_amount: "115",
        penalty_amount: "0",
        interest_amount: "0",
        reduction_amount: "0",
        payment_amount: "115",
        amount_due: "0",
        precinct: "030",
        county: "NY",
        issuing_agency: "TRAFFIC",
        summons_image: {
          url:
            "http://nycserv.nyc.gov/NYCServWeb/ShowImage?searchID=VDBSTmQwMXFRWHBOUkUwd1RVRTlQUT09&locationName=_____________________",
          description: "View Summons"
        }
      }
    ]
  };
  render() {
    const { records } = this.state;
    return (
      <div>
        <Segment>
          <Image
            src="https://lh4.googleusercontent.com/-RiwXi7e_aM4/AAAAAAAAAAI/AAAAAAAABLo/ADoTADTkg_A/photo.jpg"
            size="medium"
            circular
            centered
          />
          <h1>Greg Borrelly</h1>
        </Segment>

        <p>Records</p>
        <Container>
          {records && records.map(record => <SearchCard {...record} />)}
        </Container>
      </div>
    );
  }
}
