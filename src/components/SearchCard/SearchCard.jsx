import React from "react";
import { Card, Icon, Container, Button } from "semantic-ui-react";
import "./searchCard.scss";
const SearchCard = ({
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
  amount_due,
  inDashboard,
  removeTicketFromRecords,
  addTicketToRecords,
  loading,
  userRecords = []
}) => {
  return (
    <div id="searchCard" >
      <Card fluid >
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
          {inDashboard ? (
            <Button
              onClick={() => {
                removeTicketFromRecords(summons_number);
              }}
            >
              Remove Ticket from History
            </Button>
          ) : (
            <Button
              onClick={() =>
                addTicketToRecords({
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
                })
              }
              loading={loading}
              disabled={
                userRecords.filter(
                  record => record.summons_number === summons_number
                ).length
              }
            >
              Save Ticket to History
            </Button>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default SearchCard;
