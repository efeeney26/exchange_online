import React from 'react'
import * as http from '../../api'
import {CORE} from "../../constants/routes";

const Console = (props) => {
	const {history} = props;

	const checkUser = () => {
		http.getCurrentUser()
			.then(res => console.log('resUser', res));
	}

	const handleLogout = () => {
		http.logout();
		history.push(CORE.BASE)
	};

	return (
		<div style={{fontWeight: '500px'}}>
			Hello
			<button onClick={checkUser}>check</button>
			<button onClick={handleLogout}>Выйти</button>
		</div>
	)
};

export default Console;
