import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

import styles from './LoginFrom.module.css';

export const LoginForm = (props) => {
    const { formTemplate } = props;
    const { title, description, components: { form, button } } = formTemplate;
    const { items } = form;
    const [formData, setFormData] = useState({});
    const handleChangeField = (e) => {
        e.persist();
        const { target } = e;
        const { value, name } = target;
        const item = { ...formData };
        item[name] = value;
        setFormData(item);
    };

    const handleSubmit = (e) => {
        const { onSubmit } = props;
        e.preventDefault();
        return onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form}
        >
            <header className={styles.formTitle}>
                {title}
            </header>
            <div className={styles.formDescription}>
                {description}
            </div>
            {items.map((item) => {
                const { title, type, name, placeholder } = item;
                return (
                    <Input
                        key={name}
                        title={title}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        onChange={handleChangeField}
                    />
                );
            })}
            <Button
                title={button.title}
                type="submit"
                wide
            />
        </form>
    );
};

LoginForm.propTypes = {
    formTemplate: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};
