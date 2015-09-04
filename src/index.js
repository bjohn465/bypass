import React from "react";
import SecureProtocolCheck from "./components/SecureProtocolCheck";
import DomainList from "./components/DomainList";
import DomainAdder from "./components/DomainAdder";

const wrapperStyle = Object.freeze({
	fontFamily: "sans-serif"
});

React.render(
	<div style={wrapperStyle}>
		<SecureProtocolCheck>
			<DomainList />
			<DomainAdder />
		</SecureProtocolCheck>
	</div>,
	document.getElementById( "content" )
);
