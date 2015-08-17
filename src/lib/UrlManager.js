import url from "url";
import { OrderedSet } from "immutable";
import domainNormalizer from "./domainNormalizer";

const separator = ",";

const UrlManager = Object.freeze({
	getDomains() {
		const rawHash = url.parse( window.location.toString() ).hash;

		if ( rawHash === null ) {
			return OrderedSet();
		}

		const slicedHash = rawHash.slice( 1 );

		if ( slicedHash.length === 0 ) {
			return OrderedSet();
		}

		return OrderedSet(
			slicedHash.split( separator ).map( domainNormalizer )
		);
	},

	setDomains( domains ) {
		window.location.hash = domains.join( separator );
	}
});

export default UrlManager;
