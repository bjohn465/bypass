import { OrderedSet } from "immutable";
import domainNormalizer from "./domainNormalizer";

const storageKey = "domains";
const separator = ",";

const LocalStorageManager = Object.freeze({
	getDomains() {
		const rawItems = localStorage.getItem( storageKey );

		if ( rawItems === null || rawItems.length === 0 ) {
			return OrderedSet();
		}

		return OrderedSet(
			rawItems.split( separator ).map( domainNormalizer )
		);
	},

	setDomains( domains ) {
		try {
			localStorage.setItem( storageKey, domains.join( separator ) );
		}
		catch ( ex ) {
			if ( console && console.warn ) {
				console.warn( "Unable to save domains to local storage" );
			}
		}
	}
});

export default LocalStorageManager;
