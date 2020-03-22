import React,{Component} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input , CustomInput} from 'reactstrap';
import '../css/style.css'
import '../css/datetime.css'
import url from '../constants/api' 
import $ from "jquery"
import dateLimit from "../datelimit";
import {Message} from "./message"

const Email = () => {
	return  <React.Fragment>
				<Label for="address">Email</Label>
	            <Input type="email" name="address" id="address" placeholder="your email" required/>
	        </React.Fragment>    
}

class ReminderForm extends Component{
	state = {
		emailsaved:true,
		showMessage:false,
		message:null,
		messageType:null,
	}
	constructor(props){
		super(props)
		this.newEmail = this.newEmail.bind(this)
		this.setReminder = this.setReminder.bind(this)
		this.onDismiss   = this.onDismiss.bind(this)
		this.showMessage   = this.showMessage.bind(this)
		this.newEmail = this.newEmail.bind(this)
		this.timeConstraints = {
			minutes:{min:13,max:60,}
		}
	}
	showMessage(type,message){
		this.setState({showMessage:true,messageType:type,message:message})
	}

	newEmail(){
		var _self = this
		$.ajax({
			url:`${url}reminder/api/removemail/`,
			method:"Get",
			success(data){
				_self.setState({emailsaved:false})
			},
			error(data){
				_self.showMessage(data.responseJSON.type,data.responseJSON.message)
			}
		})
	}

	setReminder(e){
		var data,_self,message,type;
		e.preventDefault()
		data = $(".form").serialize()
		_self = this

		$.ajax({
			url:`${url}reminder/api/create/`,
			method:"post",
			data:data,
			success(data){
				message = data.message
				type    = data.type
				_self.setState({emailsaved:data.emailsaved})
			},
			error(data){
				message = data.responseJSON.message
				type    = data.responseJSON.type
			}
		}).always(()=>{
			this.showMessage(type,message)
		})
		
	}

	onDismiss(){
		this.setState({
			showMessage:false
		})
	}

	dateValidation(current){
		return null;
	}


	render(){
		return (
			<Form onSubmit={this.setReminder} className="form">
			{this.state.showMessage ?  <Message type={this.state.messageType} message={this.state.message} showMessage={this.state.showMessage}
			onDismiss={this.onDismiss}/> : ""}
			   <Row form>
			   		<Col md={4}>
			          <FormGroup>
			            <Label for="name">Name</Label>
			            <Input type="text" name="name" id="name" placeholder="Your name" required/>
			          </FormGroup>
        			</Col>
			        <Col md={4}>
			          <FormGroup>
			            {!this.state.emailsaved ? 
			            	<React.Fragment>
				            	<Email/>		            	
					            	<div style={{marginTop:"10px"}}>
					            	<CustomInput type="checkbox" id="savemail" name="savemail" label="Save this email for future reminders?" inline 
					            		/>
				            	</div>
              				</React.Fragment>
         	 			:<div onClick={this.newEmail}>Add new email</div>}
			          </FormGroup>
			        </Col>
			          <Col md={4}>
			         
			             <Label for="time">Time</Label>
			            
			         
			          </Col>
			        <Col md={12}>
				        <FormGroup>
					        <Label for="note">Your note</Label>
					        <Input type="textarea" name="note" id="note" required/>
				        </FormGroup>
			        </Col>
			        <Col>
			          <Button outline color="primary">Set Reminder</Button>
			        </Col>
			    </Row>    
			</Form>
		)
	}
}

export default ReminderForm;

