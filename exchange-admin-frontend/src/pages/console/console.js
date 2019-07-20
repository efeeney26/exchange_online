import React from 'react'
import {logout} from "../../api/services/auth";
import {CORE} from "../../constants/routes";

const Console = (props) => {
	const {history} = props;

	/*const checkUser = () => {
		checkCurrentUser()
			.then(res => console.log('resUser', res));
	}*/

	const handleLogout = () => {
		logout();
		history.push(CORE.BASE)
	};

	return (
		<div style={{fontWeight: '500px'}}>
			Hello
			{/*<button onClick={checkUser}>check</button>*/}
			<button onClick={handleLogout}>Выйти</button>
		</div>
	)
};

export default Console;