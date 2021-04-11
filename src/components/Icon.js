import React from 'react';

function Icon(props) {
    return (
        <span className="material-icons" style={{
            fontSize: props.size ?? '',
            color: !props.disabled ? props.color ?? '' : 'rgba(255, 255, 255, 0.3)'
        }}>{props.icon}</span>
    );
}

export default Icon;