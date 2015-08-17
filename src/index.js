import React from "react";
import DomainList from "./components/DomainList";
import DomainAdder from "./components/DomainAdder";

const wrapperStyle = Object.freeze({
	fontFamily: "sans-serif"
});

React.render(
	<div style={wrapperStyle}>
		<DomainList />
		<DomainAdder />
	</div>,
	document.getElementById( "content" )
);
