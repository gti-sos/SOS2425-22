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
		client: {start:"_app/immutable/entry/start.CiQT12Mc.js",app:"_app/immutable/entry/app.D3RVcIPD.js",imports:["_app/immutable/entry/start.CiQT12Mc.js","_app/immutable/chunks/D083BmrP.js","_app/immutable/chunks/Cz4qX_GU.js","_app/immutable/chunks/Kn2g5zZP.js","_app/immutable/chunks/BrcXShYB.js","_app/immutable/entry/app.D3RVcIPD.js","_app/immutable/chunks/Cz4qX_GU.js","_app/immutable/chunks/7jSECN3G.js","_app/immutable/chunks/D-Rul7FO.js","_app/immutable/chunks/BgPWTCrL.js","_app/immutable/chunks/CL6pRbN5.js","_app/immutable/chunks/DYAcLc6J.js","_app/immutable/chunks/e3k7eyrm.js","_app/immutable/chunks/Kn2g5zZP.js","_app/immutable/chunks/BrcXShYB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DoMbZWWN.js')),
			__memo(() => import('./chunks/1-EQhARdT0.js')),
			__memo(() => import('./chunks/2-CeWsI5zu.js')),
			__memo(() => import('./chunks/3-I_BMHPLA.js')),
			__memo(() => import('./chunks/4-D_2VgXvy.js')),
			__memo(() => import('./chunks/5-mfAswGef.js')),
			__memo(() => import('./chunks/6-D4FCMQEB.js')),
			__memo(() => import('./chunks/7-BcPBdHtt.js')),
			__memo(() => import('./chunks/8-DgoFwD2-.js')),
			__memo(() => import('./chunks/9-DW2l5-2v.js')),
			__memo(() => import('./chunks/10-C_HcrZSy.js')),
			__memo(() => import('./chunks/11-BbXwRUJH.js')),
			__memo(() => import('./chunks/12-DvU4B2UW.js')),
			__memo(() => import('./chunks/13-DYQIttuv.js')),
			__memo(() => import('./chunks/14-BKzc8Im6.js'))
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
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/analytics",
				pattern: /^\/analytics\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/integrations",
				pattern: /^\/integrations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/allData",
				pattern: /^\/integrations\/graphs-JMRL\/allData\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/ext1",
				pattern: /^\/integrations\/graphs-JMRL\/ext1\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/ext2",
				pattern: /^\/integrations\/graphs-JMRL\/ext2\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/ext3",
				pattern: /^\/integrations\/graphs-JMRL\/ext3\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/ext4",
				pattern: /^\/integrations\/graphs-JMRL\/ext4\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/g16-unemployment-stats",
				pattern: /^\/integrations\/graphs-JMRL\/g16-unemployment-stats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/integrations/graphs-JMRL/g19-accident-rate-stats",
				pattern: /^\/integrations\/graphs-JMRL\/g19-accident-rate-stats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/ministry-of-justice-in-zaragoza",
				pattern: /^\/ministry-of-justice-in-zaragoza\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/ministry-of-justice-in-zaragoza/[province]/[year]/[id]",
				pattern: /^\/ministry-of-justice-in-zaragoza\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"province","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false},{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
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
