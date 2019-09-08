import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { capitalize } from 'lodash';

import style from './Button.module.css';

export const Button = (props) => {
    const { kind, size, wide, title, children, className, disabled, ...passProps } = props;
    const getClassName = (kind, size, wide) => {
        const { disabled } = props;

        return classnames([
            className,
            style.button,
            style[`kind${capitalize(kind)}`],
            style[`size${capitalize(size)}`],
            {
                [style.wide]: wide,
                [style.disabled]: disabled
            }
        ]);
    };

    return (
        <button
            {...passProps}
            className={getClassName(kind, size, wide)}
        >
            {title || children}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
    kind: 'normal',
    size: 'md'
};

Button.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit']),
    kind: PropTypes.oneOf(['normal', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    wide: PropTypes.bool,
    children: PropTypes.node,
    disabled: PropTypes.bool
};
