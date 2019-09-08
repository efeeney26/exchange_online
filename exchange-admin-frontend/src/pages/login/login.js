import React from 'react';
import PropTypes from 'prop-types';
import * as http from '../../api';
import { CORE } from '../../constants/routes';
import { LoginForm } from '../../components';
import { template } from '../../templates/login-form';

import styles from './login.module.css';

const Login = (props) => {
    const { history } = props;

    const handleFormSubmit = (data) => {
        http.login(data)
            .then((response) => {
                http.setJwtToken(response);
                history.push(CORE.BASE);
            });
    };

    return (
        <div className={styles.container}>
            <LoginForm
                formTemplate={template}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};

Login.propTypes = {
    history: PropTypes.object
};

export default Login;
