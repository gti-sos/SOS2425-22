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
		client: {start:"_app/immutable/entry/start.4n8pAuP8.js",app:"_app/immutable/entry/app.CiLB84Cs.js",imports:["_app/immutable/entry/start.4n8pAuP8.js","_app/immutable/chunks/B8LPZlQ8.js","_app/immutable/chunks/CoAlQAYP.js","_app/immutable/chunks/B7FjlX0a.js","_app/immutable/chunks/W7UFGFJv.js","_app/immutable/entry/app.CiLB84Cs.js","_app/immutable/chunks/CoAlQAYP.js","_app/immutable/chunks/BopABDpv.js","_app/immutable/chunks/alXbzRox.js","_app/immutable/chunks/CaUk46kY.js","_app/immutable/chunks/Ct1gaisl.js","_app/immutable/chunks/C1atOmVg.js","_app/immutable/chunks/BTVQgUFr.js","_app/immutable/chunks/B7FjlX0a.js","_app/immutable/chunks/W7UFGFJv.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-qxy3BGf-.js')),
			__memo(() => import('./chunks/1-Dn0oZs2g.js')),
			__memo(() => import('./chunks/2-DIDetB7i.js')),
			__memo(() => import('./chunks/3-CQDS945o.js')),
			__memo(() => import('./chunks/4-DqpAJ3jP.js')),
			__memo(() => import('./chunks/5-D0Hhh49u.js')),
			__memo(() => import('./chunks/6-CGs7peIy.js')),
			__memo(() => import('./chunks/7-BkmurO02.js')),
			__memo(() => import('./chunks/8-tDpI4Eb5.js')),
			__memo(() => import('./chunks/9-CMBcz3tB.js')),
			__memo(() => import('./chunks/10-BZIEfEQ2.js')),
			__memo(() => import('./chunks/11-BCWtAxR-.js')),
			__memo(() => import('./chunks/12-CaxB4-IX.js')),
			__memo(() => import('./chunks/13-w4-ja1me.js')),
			__memo(() => import('./chunks/14-dVJByGu7.js'))
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
