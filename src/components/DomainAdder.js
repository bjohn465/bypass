import React from "react";
import Actions from "../lib/actions";

const freeze = Object.freeze;

const wrapperStyle = freeze({
	borderTop: "1px solid #ccc",
	marginTop: "1em",
	paddingTop: "1em"
});
const inputStyle = freeze({
	fontFamily: "monospace",
	margin: "0 0.5em",
	width: "18em"
});
const addButtonStyle = freeze({
	backgroundColor: "#00b300",
	border: "1px solid #178017",
	color: "#fff",
	cursor: "pointer",
	fontFamily: "sans-serif",
	margin: 0,
	padding: "0.25em 0.75em"
});

const DomainAdder = React.createClass({
	addDomain() {
		const node = React.findDOMNode( this.refs.newDomain );
		Actions.addDomain( node.value );
		node.value = "";
	},

	handleInput( event ) {
		if ( event.key !== "Enter" ) {
			return;
		}
		this.addDomain();
	},

	render() {
		return (
			<div style={wrapperStyle}>
				<label htmlFor="new-domain">
					New Domain
				</label>
				<input type="text"
					id="new-domain"
					ref="newDomain"
					placeholder="Example: www.example.com"
					onKeyDown={this.handleInput}
					style={inputStyle} />
				<button type="button"
						style={addButtonStyle}
						onClick={this.addDomain}>
					Add
				</button>
			</div>
		);
	}
});

export default DomainAdder;
