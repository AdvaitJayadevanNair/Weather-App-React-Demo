import React from 'react';
import Icon from './Icon';

function IconButton(props) {
    return (
        <button style={{
            background:"transparent",
            border: "none",
            outline: "none",
            cursor: "pointer"
        }} onClick={props.onClick}>
            <Icon {...props} />
        </button>
    );
}

export default IconButton;