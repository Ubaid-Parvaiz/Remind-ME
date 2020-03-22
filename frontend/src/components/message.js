import React from 'react';
import { Alert } from 'reactstrap';


export const Message = (props) => {
	const OnDismiss = () => {
		return props.onDismiss()
	}
	return (
	 <Alert color={props.type} isOpen={props.showMessage} toggle={props.onDismiss}>
        {props.message}
      </Alert>
	)
}

