import React  from "react"
import{connect}from "react-redux"
import { Button, Input,Form} from 'semantic-ui-react'
import {withRouter} from "react-router"

const EditForm =(props)=>{

    return(<Form>
        <Form.Field
          id='form-input-control-last-name'
          control={Input}
          placeholder='Type item'
          onChange={props.changed}
          value={props.valueProp}
        />
      <Form.Field
        id='form-button-control-public'
        control={Button}
        content='Update item'
        color="orange"
        onClick={props.clicked}
        size="small"
      />
    </Form>)
}

let connectedEditForm =connect()(EditForm)
export default  withRouter(connectedEditForm)