import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Feed, Button, List, Modal ,Icon} from "semantic-ui-react";
import { withRouter } from "react-router";
import AddItem from "../AddItem/AddItem";
import EditForm from "../EditForm/EditForm";
import "./ListsGrid.css";
import moment from "moment";
import { join } from "path";

class ListsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      lists: [],
      showForm: false,
      listId: "",
      itemIndex: "",
      open: false
    };
  }

  show = size => () => {
    this.setState({ size, open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  componentDidMount = () => {
    setInterval(() => {
      fetch("/getAllLists", {
        method: "POST",
        body: JSON.stringify({
          sortingType: this.props.sortingType
        })
      })
        .then(res => {
          return res.text();
        })
        .then(response => {
          let parsed = JSON.parse(response);
          this.setState({ lists: parsed });
          this.props.dispatch({
              type:"lists",
              lists: parsed
          })
        });
    }, 500);
  };

  removeItemHandler = (id, index) => {
    fetch("/removeItem", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
        index: index
      })
    })
      .then(res => {
        return res.text();
      })
      .then(response => {
        console.log(response);
      });
  };
  showUpdateForm = (id, index) => {
    if (!this.state.showForm) {
      this.setState({ showForm: true, listId: id, itemIndex: index });
    } else {
      this.setState({ showForm: false });
    }
  };

  editItemHndler = (id, index) => {
    fetch("/editItem", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        index: index,
        newInput: this.state.newInput
      })
    })
      .then(res => {
        return res.text();
      })
      .then(response => {
        console.log(response);
      });
  };
  newInputHandler = e => {
    this.setState({ newInput: e.target.value });
  };
  removeListHandler = id => {
    fetch("/removeList", {
      method: "DELETE",
      body: JSON.stringify({
        id: id
      })
    })
      .then(res => {
        return res.text();
      })
      .then(response => {
        console.log(response);
      });
    this.setState({ open: false });
  };

  noDelete = () => {
    this.setState({ open: false });
  };
  statusHandler=(id)=>{
      fetch("/completedList", {method:"POST", body:JSON.stringify({
          id: id
      })}).then(res=>{return res.text()})
      .then(response=>{
          console.log(response)
      })
  }
 
  render() {
    const { open, size } = this.state;
    let showEditForm = null;
    if (this.state.showForm) {
      showEditForm = (
        <EditForm
          clicked={() =>
            this.editItemHndler(this.state.listId, this.state.itemIndex)
          }
          changed={this.newInputHandler}
          valueProp={this.state.newInput}
        />
      );
    }
    return (
      <div className="listsGrid">
        <div className="editItemForm"> {showEditForm}</div>
        {this.props.lists.map((list, index) => {
          return (
            <Card>
              <Card.Content>
                <Card.Header>Title: {list.title}</Card.Header>
              </Card.Content>
              <Card.Content>Description: {list.description}</Card.Content>
              <Card.Content>
                Due Date: {moment(list.dueDate).format("YYYY Do MM")}
              </Card.Content>

              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>
                        {" "}
                        Created at:{" "}
                        {moment(list.createdAt).format("YYYY Do MM-HH:mm")}
                      </Feed.Date>
                      <Feed.Date>
                        {" "}
                        Updated at:{" "}
                        {moment(list.updatedAt).format("YYYY Do MM-HH:mm")}
                      </Feed.Date>
                      {list.items.map((item, index) => {
                        return (
                          <List animated verticalAlign="middle">
                            <List.Item>
                              <List.Content>
                                <List.Header>{item}</List.Header>
                              </List.Content>
                              <Button
                                onClick={() =>
                                  this.removeItemHandler(list._id, index)
                                }
                                circular
                                icon="minus"
                                size="mini"
                                color="red"
                              />
                              <Button
                                onClick={() =>
                                  this.showUpdateForm(list._id, index)
                                }
                                circular
                                icon="settings"
                                size="mini"
                                color="blue"
                              />
                            </List.Item>
                          </List>
                        );
                      })}
                      <AddItem id={list._id} />
                      <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>Delete Your List</Modal.Header>
                        <Modal.Content>
                          <p>Are you sure you want to delete your List</p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button onClick={this.noDelete} negative>
                            No
                          </Button>
                          <Button
                            onClick={() => this.removeListHandler(list._id)}
                            positive
                            icon="checkmark"
                            labelPosition="right"
                            content="Yes"
                          />
                        </Modal.Actions>
                      </Modal>
                      <Button
                        onClick={this.show("mini")}
                        size="mini"
                        color="red"
                        content="Remove the List"
                      />
                       <Button
                        onClick={()=>this.statusHandler(list._id)}
                        size="mini"
                        circular 
                        color="gray"
                        content={list.status}
                      />
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
          );
        })}
      </div>
    );
  }
}

let connectedListsGrid = connect(store => {
  return { lists: store.lists,
sortingType: store.sortingType };
})(ListsGrid);
export default withRouter(connectedListsGrid);
