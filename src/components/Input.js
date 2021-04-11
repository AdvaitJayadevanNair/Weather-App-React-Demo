import React from 'react';

function Input(props) {
    const style = {
        width: "270px",
        height: "61px",
        border: "3px solid var(--accent-color)",
        borderRadius: "24px",
        backgroundColor: "rgba(0,0,0,0.6)",
        outline: "none",
        padding: "12px 28px 12px 28px",
        color: "var(--font-color)",
        fontSize: "30px",
        textAlign: "center",
        ...props.style
    };

    return (
        <input type="text" style={style} placeholder={props.placeholder} value={props.value} onInput={props.setValue}/>
    );
}

export default Input;