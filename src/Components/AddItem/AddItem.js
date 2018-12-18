import React , {Component} from "react"
import{connect}from "react-redux"
import { Button, Input,Form} from 'semantic-ui-react'
import {withRouter} from "react-router"

class AddItem extends Component{
    constructor(props){
        super(props)
this.state={
    itemInput:""
}
    }
    itemInputHandler=(e)=>{
        this.setState({itemInput: e.target.value})
    }

    submitItemHandler=(id)=>{
        fetch("/addItem",{method: "PUT", body:JSON.stringify({
            id:id ,
            item: this.state.itemInput
        })}).then(res=>{return res.text()})
        .then(response=>{
            console.log(response)
        })
        this.setState({itemInput:""})
    }

    render() {

        return(<Form>
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                placeholder='Type item'
                onChange={this.itemInputHandler}
                value={this.state.itemInput}
              />
            <Form.Field
              id='form-button-control-public'
              control={Button}
              content='Add Items to the list'
              color="green"
              onClick={()=>this.submitItemHandler(this.props.id)}
            />
          </Form>)
    }
}

let connectedAddItem=connect()(AddItem)
export default withRouter(connectedAddItem)