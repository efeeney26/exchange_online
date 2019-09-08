import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Input.module.css';

export const Input = (props) => {
    const { title, placeholder, description, custStyle, ...passProps } = props;

    return (
        <div>
            {title && title.length
                && (
                    <div className={styles.title}>
                        {title}
                    </div>
                )}
            <input
                {...passProps}
                placeholder={placeholder || null}
                className={classnames(custStyle, styles.input)}
            />
            {description && description.length
            && (
                <div className={styles.description}>
                    {description}
                </div>
            )}
        </div>
    );
};

Input.propTypes = {
    title: PropTypes.string,
    placeholder: PropTypes.string,
    description: PropTypes.string,
    custStyle: PropTypes.string,
    passProps: PropTypes.array
};
