import React, { PropTypes } from "react";
import DomainBypasser from "./DomainBypasser";
import Actions from "../lib/actions";
import merge from "lodash/object/merge";
import moment from "moment";
import getDomainUrl from "../lib/getDomainUrl";

const freeze = Object.freeze;

const listItemStyle = freeze({
	borderBottom: "1px solid #eee",
	padding: "0.3em 0.5em"
});
const ellipsisBaseStyle = freeze({
	display: "inline-block",
	overflow: "hidden",
	textOverflow: "ellipsis",
	verticalAlign: "middle",
	whiteSpace: "nowrap",
	width: "15em"
});
const domainStyle = freeze(
	merge(
		{},
		ellipsisBaseStyle,
		{
			fontFamily: "monospace",
			fontSize: "110%",
			width: "18em"
		}
	)
);
const domainLinkStyle = freeze({
	color: "#00b",
	textDecoration: "none"
});
const lastBypassedStyle = ellipsisBaseStyle;
const removeButtonStyle = freeze({
	backgroundColor: "#fff",
	border: "1px solid #d00",
	color: "#d00",
	cursor: "pointer",
	fontFamily: "sans-serif",
	margin: 0,
	padding: "0.5em",
	width: "6em"
});

// 15 minutes
const bypassInterval = 15 * 60 * 1000;

// 15 seconds
const updateInterval = 15 * 1000;

const DomainListItem = React.createClass({
	propTypes: {
		domain: PropTypes.string.isRequired,
		style: PropTypes.object
	},

	getInitialState() {
		return {
			isBypassing: true,
			lastBypassed: null,
			updateCount: 0
		};
	},

	componentWillUnmount() {
		this.clearUpdateInterval();
		if ( this._bypassTimeout !== undefined ) {
			clearTimeout( this._bypassTimeout );
		}
	},

	incrementUpdateCount() {
		this.setState({
			updateCount: this.state.updateCount + 1
		});
	},

	clearUpdateInterval() {
		if ( this._updateInterval !== undefined ) {
			clearInterval( this._updateInterval );
			this._updateInterval = undefined;
		}
	},

	setBypassing( bypass ) {
		let newState = {
			isBypassing: bypass
		};

		if ( this.state.isBypassing && !bypass ) {
			newState.lastBypassed = new Date();
		}

		this.setState( newState );
	},

	handleRemoveClick() {
		Actions.removeDomain( this.props.domain );
	},

	handleBypassTimeout() {
		this._bypassTimeout = undefined;
		this.setBypassing( true );
		this.clearUpdateInterval();
	},

	handleBypassComplete() {
		this.setBypassing( false );
		this._bypassTimeout = setTimeout(
			this.handleBypassTimeout,
			bypassInterval
		);
		this._updateInterval = setInterval(
			this.incrementUpdateCount,
			updateInterval
		);
	},

	renderBypasser() {
		if ( !this.state.isBypassing ) {
			return null;
		}

		return (
			<DomainBypasser domain={this.props.domain}
				onBypassed={this.handleBypassComplete} />
		);
	},

	getLastBypassedMessage() {
		return this.state.isBypassing ?
			"Bypassing\u2026" :
			`Bypassed ${moment( this.state.lastBypassed ).fromNow()}`;
	},

	render() {
		const mergedListItemStyle = freeze(
			merge(
				{},
				listItemStyle,
				this.props.style
			)
		);
		const domain = this.props.domain;

		return (
			<li style={mergedListItemStyle}>
				<span style={domainStyle}>
					<a href={getDomainUrl( domain )} style={domainLinkStyle}>
						{domain}
					</a>
				</span>
				<span style={lastBypassedStyle}>
					{this.getLastBypassedMessage()}
				</span>
				<button type="button"
						style={removeButtonStyle}
						onClick={this.handleRemoveClick}>
					Remove
				</button>
				{this.renderBypasser()}
			</li>
		);
	}
});

export default DomainListItem;
