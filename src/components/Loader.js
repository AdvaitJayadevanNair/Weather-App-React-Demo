import React from 'react';

function Loader() {
    const style = {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };
	return (
		<div style={style}>
			<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
		</div>
	);
}

export default Loader;
