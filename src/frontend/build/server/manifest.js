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
		client: {start:"_app/immutable/entry/start.DRKCkyx5.js",app:"_app/immutable/entry/app.fqL_jo6L.js",imports:["_app/immutable/entry/start.DRKCkyx5.js","_app/immutable/chunks/Cv4eHxYS.js","_app/immutable/chunks/5T3b_xH8.js","_app/immutable/chunks/Be9tLMDm.js","_app/immutable/entry/app.fqL_jo6L.js","_app/immutable/chunks/5T3b_xH8.js","_app/immutable/chunks/Y3llCd5_.js","_app/immutable/chunks/Dudt7YSU.js","_app/immutable/chunks/CVH-v-h3.js","_app/immutable/chunks/DKPZ7Wbn.js","_app/immutable/chunks/Be9tLMDm.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-C6i9Vfw-.js')),
			__memo(() => import('./chunks/1-NBlTQ4GW.js')),
			__memo(() => import('./chunks/2-Dwp3xxNt.js')),
			__memo(() => import('./chunks/3-ARoN94WR.js')),
			__memo(() => import('./chunks/4-C1yRkpdY.js'))
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
				id: "/ministry-of-justice-in-zaragoza",
				pattern: /^\/ministry-of-justice-in-zaragoza\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/ministry-of-justice-in-zaragoza/[province]/[year]/[id]",
				pattern: /^\/ministry-of-justice-in-zaragoza\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"province","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false},{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
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
