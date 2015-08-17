import React from "react";
import Reflux from "reflux";
import Store from "../lib/store";
import DomainListItem from "./DomainListItem";

const freeze = Object.freeze;

const listStyle = freeze({
	listStyleType: "none",
	margin: 0,
	padding: 0,
	width: "38em"
});
const lastListItemStyle = freeze({
	borderBottom: null
});

function renderDomainListItem( domain, isLastItem ) {
	return (
		<DomainListItem
			domain={domain}
			style={isLastItem ? lastListItemStyle : null}
			key={domain} />
	);
}

const DomainList = React.createClass({
	mixins: [ Reflux.connect( Store, "domains" ) ],

	render() {
		let count = 0;
		let domainCount = this.state.domains.size;

		return (
			<ol style={listStyle}>
				{this.state.domains.map(
					( domain ) => renderDomainListItem(
						domain,
						++count == domainCount
					)
				)}
			</ol>
		);
	}
});

export default DomainList;
