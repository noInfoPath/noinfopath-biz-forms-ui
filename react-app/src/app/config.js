export const AUTH_CONFIG = {
	domain: "hsl-sop.auth0.com",
	clientId: "hG96l6Htxg760ptrJik3SjSbhL0EnkKO",
	callbackUrl: "http://localhost:3000",
	audience: "https://restapi.sop.heavensentlegal.com",
	responseType: "token id_token",
	scope: "openid profile",
	errorPath: "/error"
}

export const HDOCS_CONFIG = {
	hdocsRestApi: "https://restapi.sop.hsl.test:8443/hdoc"
}
