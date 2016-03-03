import React, { PropTypes } from "react";
import kebabCase from "lodash/string/kebabCase";
import getDomainUrl from "../lib/getDomainUrl";

const freeze = Object.freeze;

const hiddenStyle = freeze({
	display: "none"
});

const delays = freeze({
	submitForm: 500,
	triggerBypassed: 1000
});

function getFrameUrl( domainUrl ) {
	return `${domainUrl}robots.txt`;
}

function getPostUrl( domainUrl ) {
	return domainUrl +
		"171E92C18EEE40A29D1749C505091DFC_SOPHOS_WARN_PROCEEDED_FLAG";
}

function getEncodedDomainUrl( domainUrl ) {
	return window.btoa( domainUrl );
}

function clearTimeoutIfDefined( timeout ) {
	if ( timeout !== undefined ) {
		clearTimeout( timeout );
	}
}

const DomainBypasser = React.createClass({
	propTypes: {
		domain: PropTypes.string.isRequired,
		onBypassed: PropTypes.func.isRequired
	},

	getInitialState() {
		return {
			frameName: `bypass-${kebabCase( this.props.domain )}-${Date.now()}`
		};
	},

	componentDidMount() {
		this._submitFormTimeout = setTimeout(
			this.submitForm,
			delays.submitForm
		);
	},

	componentWillUnmount() {
		[
			this._submitFormTimeout,
			this._bypassedTimeout
		]
			.forEach( clearTimeoutIfDefined );
	},

	submitForm() {
		this._submitFormTimeout = undefined;
		React.findDOMNode( this.refs.form ).submit();
		this._bypassedTimeout = setTimeout(
			this.triggerBypassed,
			delays.triggerBypassed
		);
	},

	triggerBypassed() {
		this._bypassedTimeout = undefined;
		this.props.onBypassed();
	},

	render() {
		const domainUrl = getDomainUrl( this.props.domain );
		const frameUrl = getFrameUrl( domainUrl );

		return (
			<div style={hiddenStyle}>
				<form ref="form"
						target={this.state.frameName}
						action={getPostUrl( domainUrl )}
						method="POST">
					<input type="hidden"
						name="FEEDBACK_KEY_REQUESTED_URL"
						value={getEncodedDomainUrl( frameUrl )} />
				</form>
				<iframe name={this.state.frameName} src={frameUrl} />
			</div>
		);
	}
});

export default DomainBypasser;
