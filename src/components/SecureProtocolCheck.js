import React from "react";
import { Set } from "immutable";

const secureProtocols = Set([
	"https"
]);

const SecureProtocolCheck = React.createClass({
	isSecureProtocol() {
		const protocol = window.location.protocol;
		return secureProtocols.includes(
			protocol.slice( 0, protocol.length - 1 ).toLowerCase()
		);
	},

	getNonSecureUrl() {
		const a = document.createElement( "a" );
		a.href = window.location.href;
		a.protocol = "http:";
		return a.href;
	},

	renderWarning() {
		return (
			<div>
				<h1>Your heart is in the right place, but...</h1>
				<p>
					It looks like you're using a secure protocol
					(<i>e.g.</i>, https)
					to access this little tool.
					Normally, that's good,
					but in this case, it means you can't use this tool.
					<span> You'll have to </span>
					<a href={this.getNonSecureUrl()}>
						access this tool via http
					</a>
					<span> in order for it to work.</span>
				</p>
			</div>
		);
	},

	render() {
		return this.isSecureProtocol() ?
			this.renderWarning() :
			<div>{this.props.children}</div>;
	}
});

export default SecureProtocolCheck;
