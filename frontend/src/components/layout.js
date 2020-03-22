import React,{Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../css/style.css'
import ReminderForm from './form'

class Layout extends Component{
	render(){
		return (
			<Container className="container">
				<ReminderForm/>
			</Container>
		)
	}
}


export default Layout;