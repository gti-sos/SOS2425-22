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
		client: {start:"_app/immutable/entry/start.fMY1n3UV.js",app:"_app/immutable/entry/app.4A_jVm6F.js",imports:["_app/immutable/entry/start.fMY1n3UV.js","_app/immutable/chunks/Cwk7wz8z.js","_app/immutable/chunks/CHhmks2n.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BwYDwrZ3.js","_app/immutable/chunks/BuVK3Hzi.js","_app/immutable/entry/app.4A_jVm6F.js","_app/immutable/chunks/CHhmks2n.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Cuedrw2D.js","_app/immutable/chunks/umIrC32l.js","_app/immutable/chunks/Bj6axSiC.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/LsQLFvbT.js","_app/immutable/chunks/BwYDwrZ3.js","_app/immutable/chunks/BuVK3Hzi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DQMyM8AD.js')),
			__memo(() => import('./chunks/1-WYdbOfOG.js')),
			__memo(() => import('./chunks/2-DoaiGVj2.js')),
			__memo(() => import('./chunks/3-Cknjg3xj.js')),
			__memo(() => import('./chunks/4-BmeHsBTx.js')),
			__memo(() => import('./chunks/5-DOHTtcHY.js')),
			__memo(() => import('./chunks/6-Ch1pQN-8.js')),
			__memo(() => import('./chunks/7-BDBhSPql.js')),
			__memo(() => import('./chunks/8-DxTi1P4E.js')),
			__memo(() => import('./chunks/9-CsQcMiYq.js')),
			__memo(() => import('./chunks/10-DKKjmg5U.js'))
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
