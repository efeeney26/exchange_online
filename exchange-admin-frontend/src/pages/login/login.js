import React, { useState } from 'react';
import * as http from '../../api';
import { CORE } from '../../constants/routes';
import { Button } from '../../components';

const Login = (props) => {
    const { history } = props;

    const [data, setData] = useState({});
    console.log('data', data);

    const handleChange = (e) => {
        const { target } = e;
        const { value, name } = target;
        const item = { ...data };
        item[name] = value;
        setData(item);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        http.login(data)
            .then((response) => {
                http.setJwtToken(response);
                history.push(CORE.BASE);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <input type="text" value={data.username} onChange={handleChange} name="usernameOrEmail" />
            <br />
            <br />
            <input type="password" value={data.password} onChange={handleChange} name="password" />
            <br />
            <br />
            <Button
                title="Log in"
                type="submit"
            />
        </form>
    );
};

export default Login;
