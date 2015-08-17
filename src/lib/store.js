import Reflux from "reflux";
import Actions from "./actions";
import UrlManager from "./UrlManager";
import LocalStorageManager from "./LocalStorageManager";
import domainNormalizer from "./domainNormalizer";

const Store = Reflux.createStore({
	listenables: Actions,

	getInitialState() {
		const urlDomains = UrlManager.getDomains();
		const storageDomains = LocalStorageManager.getDomains();
		this.domains = storageDomains.union( urlDomains );
		this._updateStorageAreas( this.domains );
		return this.domains;
	},

	onAddDomain( newDomain ) {
		this._updateDomains(
			this.domains.add( domainNormalizer( newDomain ) )
		);
	},

	onRemoveDomain( domain ) {
		this._updateDomains( this.domains.delete( domain ) );
	},

	_updateDomains( newDomains ) {
		this.domains = newDomains;
		this._updateStorageAreas( newDomains );
		this.trigger( this.domains );
	},

	_updateStorageAreas( newDomains ) {
		UrlManager.setDomains( newDomains );
		LocalStorageManager.setDomains( newDomains );
	}
});

export default Store;
