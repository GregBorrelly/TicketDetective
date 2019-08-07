import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import "./navigation.scss";
export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
            color="orange"
          />
          <Menu.Item
            name="search"
            active={activeItem === "search"}
            onClick={this.handleItemClick}
            color="orange"
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
              color="orange"
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
