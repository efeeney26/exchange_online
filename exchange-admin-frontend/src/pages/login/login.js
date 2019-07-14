import React, { useState } from 'react'
//import {login} from "../../api/services/auth";
import {ApiConst} from "../../constants/api";
import {login} from "../../api/apiClient";
import { CORE } from "../../constants/routes";

const Login = (props) => {
	const {history} = props;

	const [data, setData] = useState({});
	console.log('data', data);

	const handleChange = (e) => {
		const {target} = e;
		const {value, name} = target;
		const item = {...data};
		item[name] = value;
		setData(item);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		login(data)
			.then(response => {
				console.log(response);
				localStorage.setItem(ApiConst.ACCESS_TOKEN, response.accessToken);
				history.push(CORE.BASE)
			})
	};

	return (
		<form onSubmit={handleSubmit}>
			<br/><br/><br/><br/><br/><br/>
			<input type='text' value={data.username} onChange={handleChange} name="usernameOrEmail"/>
			<br/><br/>
			<input type='password' value={data.password} onChange={handleChange} name="password"/>
			<br/><br/>
			<button>Log In</button>
		</form>
	)
};

export default Login
