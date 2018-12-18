import React, { Component } from "react";
import { Button, Divider, Input, Segment ,Menu, Dropdown} from "semantic-ui-react";
import "./App.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ListsGrid from "./Components/ListsGrid/ListsGrid";
import CreateNewList from "./Components/CreateNewList/CreateNewList";
import AddItem from "./Components/AddItem/AddItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateForm: false
    };
  }
  creatListHandler = () => {
    if (!this.state.showCreateForm) {
      this.setState({ showCreateForm: true });
    } else {
      this.setState({ showCreateForm: false });
    }
  };
  sortByTitleHandler = () => {
    this.props.dispatch({
      type: "title",
      sortingType: "title"
    });
  };
  sortByDueDateHandler = () => {
    this.props.dispatch({
      type: "dueDate",
      sortingType: "dueDate"
    });
  };

  render() {
    const options = [
      { key: 1, text: 'Title', value: 1 , onClick:this.sortByTitleHandler},
      { key: 2, text: 'Due Date', value: 2, onClick :this.sortByDueDateHandler }
    ]
    let creatForm = null;
    if (this.state.showCreateForm) {
      creatForm = <CreateNewList />;
    }

    return (
      <div className="App">
        <Segment basic textAlign="center">
          <Input
            action={{ color: "blue", content: "Search" }}
            icon="search"
            iconPosition="left"
            placeholder="Search for lists"
          />

          <Divider horizontal>Or</Divider>

          <Button
            onClick={this.creatListHandler}
            color="teal"
            content="Create New List"
            icon="add"
            labelPosition="left"
          />
        </Segment>
        <Menu compact>
          <Dropdown text="Sort By" options={options} simple item />
        </Menu>
        <div>{creatForm}</div>
        <ListsGrid />
      </div>
    );
  }
}

let connectedApp = connect()(App);
export default withRouter(connectedApp);
