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
		client: {start:"_app/immutable/entry/start.B9fcuIEh.js",app:"_app/immutable/entry/app.Dlhb9KxX.js",imports:["_app/immutable/entry/start.B9fcuIEh.js","_app/immutable/chunks/CLCxV5tj.js","_app/immutable/chunks/CHhmks2n.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BwYDwrZ3.js","_app/immutable/chunks/BuVK3Hzi.js","_app/immutable/entry/app.Dlhb9KxX.js","_app/immutable/chunks/CHhmks2n.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Cuedrw2D.js","_app/immutable/chunks/umIrC32l.js","_app/immutable/chunks/Bj6axSiC.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/LsQLFvbT.js","_app/immutable/chunks/BwYDwrZ3.js","_app/immutable/chunks/BuVK3Hzi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DQMyM8AD.js')),
			__memo(() => import('./chunks/1-C14SFKgg.js')),
			__memo(() => import('./chunks/2-DoaiGVj2.js')),
			__memo(() => import('./chunks/3-Cknjg3xj.js')),
			__memo(() => import('./chunks/4-BmeHsBTx.js')),
			__memo(() => import('./chunks/5-DOHTtcHY.js')),
			__memo(() => import('./chunks/6-Ch1pQN-8.js')),
			__memo(() => import('./chunks/7-k_PoAlsr.js')),
			__memo(() => import('./chunks/8-Dr9B23I5.js')),
			__memo(() => import('./chunks/9-CR1U2Rho.js')),
			__memo(() => import('./chunks/10-QrOu6Inz.js'))
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
				id: "/integrations/graphs-JMRL/ext1",
				pattern: /^\/integrations\/graphs-JMRL\/ext1\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/ext2",
				pattern: /^\/integrations\/graphs-JMRL\/ext2\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/ext3",
				pattern: /^\/integrations\/graphs-JMRL\/ext3\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/g16-unemployment-stats",
				pattern: /^\/integrations\/graphs-JMRL\/g16-unemployment-stats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/g19-accident-rate-stats",
				pattern: /^\/integrations\/graphs-JMRL\/g19-accident-rate-stats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/ministry-of-justice-in-zaragoza",
				pattern: /^\/ministry-of-justice-in-zaragoza\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/ministry-of-justice-in-zaragoza/[province]/[year]/[id]",
				pattern: /^\/ministry-of-justice-in-zaragoza\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"province","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false},{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
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
