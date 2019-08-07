import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../redux/modules/user";
import "./navigation.scss";
class Navigation extends Component {
  state = { activeItem: "dashboard" };

  handleItemClick = (e, { name }) => {
    const { logoutUser } = this.props;

    this.setState({ activeItem: name });
    if (name === "logout") {
      logoutUser();
    }
    this.props.history.push(`/${name}`);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="dashboard"
            active={activeItem === "dashboard"}
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

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Navigation));
