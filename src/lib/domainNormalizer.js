const rProtocol = /^https?:\/\//;
const rPath = /\/.*$/;

function domainNormalizer( domain ) {
	return domain
		.toLowerCase()
		.replace( rProtocol, "" )
		.replace( rPath, "" );
}

export default domainNormalizer;
