import React , {Component} from "react"
import{connect}from "react-redux"
import {withRouter} from "react-router"
import { Button, Input,Form, TextArea } from 'semantic-ui-react'


class CreateNewList extends Component{

    state={
        titleInput:"",
        descriptionInput:"",
        dueDateInput:""
      }

      titleInputHandler=(e)=>{
        this.setState({titleInput: e.target.value})
      }
      descriptionInputHandler=(e)=>{
        this.setState({descriptionInput: e.target.value})
      }
      dueDateInputHandler=(e)=>{
    this.setState({dueDateInput: e.target.value})
      }
      submitHandler=()=>{
          fetch("/createList", {method:"PUT", body: JSON.stringify({
              title: this.state.titleInput,
              description: this.state.descriptionInput,
              dueDate: this.state.dueDateInput
          })}).then(res=>{return res.text()})
          .then(response=>{
              console.log(response)
          })
          this.setState({titleInput:"",
          descriptionInput:"",
          dueDateInput:""})
      }
    render(){
        return(<Form>
            <Form.Group widths='equal'>
              <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='Title'
                placeholder='Title'
                onChange ={this.titleInputHandler}
                value={this.state.titleInput}
              />
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                type="date"
                label='Due Date'
                placeholder='Due Date'
                onChange={this.dueDateInputHandler}
                value={this.state.dueDateInput}
              />
              
            </Form.Group>
            <Form.Field
              id='form-textarea-control-opinion'
              control={TextArea}
              label='Description'
              placeholder='Description'
              onChange={this.descriptionInputHandler}
              value={this.state.descriptionInput}
            />
            <Form.Field
              id='form-button-control-public'
              control={Button}
              content='Create List'
              color="green"
              label='Label with htmlFor'
              onClick={this.submitHandler}
            />
          </Form>)
    }
}

let connectedCreateNewList=connect()(CreateNewList)
export default withRouter(connectedCreateNewList)