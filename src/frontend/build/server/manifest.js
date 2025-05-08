const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.DOZqx2Uq.js",app:"_app/immutable/entry/app.JXA0pYxn.js",imports:["_app/immutable/entry/start.DOZqx2Uq.js","_app/immutable/chunks/ChcIotwt.js","_app/immutable/chunks/AWa3Cf9u.js","_app/immutable/chunks/D5jAcvew.js","_app/immutable/chunks/C5OmSORT.js","_app/immutable/entry/app.JXA0pYxn.js","_app/immutable/chunks/AWa3Cf9u.js","_app/immutable/chunks/BcWd9E2X.js","_app/immutable/chunks/HoNV5Zar.js","_app/immutable/chunks/Bu7QL4ii.js","_app/immutable/chunks/NmNIvlnM.js","_app/immutable/chunks/D5jAcvew.js","_app/immutable/chunks/C5OmSORT.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DvlSb-JB.js')),
			__memo(() => import('./chunks/1-GvlCocml.js')),
			__memo(() => import('./chunks/2-CrJ0YBji.js')),
			__memo(() => import('./chunks/3-DmrsAphv.js')),
			__memo(() => import('./chunks/4-C--9Y4dP.js')),
			__memo(() => import('./chunks/5--wbknrxo.js')),
			__memo(() => import('./chunks/6-CsXnK_sq.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/integrations",
				pattern: /^\/integrations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/g19-accident-rate-stats",
				pattern: /^\/integrations\/graphs-JMRL\/g19-accident-rate-stats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/ministry-of-justice-in-zaragoza",
				pattern: /^\/ministry-of-justice-in-zaragoza\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/ministry-of-justice-in-zaragoza/[province]/[year]/[id]",
				pattern: /^\/ministry-of-justice-in-zaragoza\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"province","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false},{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
