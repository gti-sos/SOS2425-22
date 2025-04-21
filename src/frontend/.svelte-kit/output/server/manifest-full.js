export const manifest = (() => {
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
		client: {start:"_app/immutable/entry/start.ChXRA40l.js",app:"_app/immutable/entry/app.CYhyDVaw.js",imports:["_app/immutable/entry/start.ChXRA40l.js","_app/immutable/chunks/Bx35KJuO.js","_app/immutable/chunks/C2-O5vh-.js","_app/immutable/chunks/Bu0CDhuH.js","_app/immutable/chunks/r0tDxa20.js","_app/immutable/entry/app.CYhyDVaw.js","_app/immutable/chunks/C2-O5vh-.js","_app/immutable/chunks/CWJRdXbv.js","_app/immutable/chunks/GYMr6PHu.js","_app/immutable/chunks/CVT5J-Uc.js","_app/immutable/chunks/Djf4b7Uj.js","_app/immutable/chunks/BJtD3HD2.js","_app/immutable/chunks/BoWO7yxZ.js","_app/immutable/chunks/Bu0CDhuH.js","_app/immutable/chunks/r0tDxa20.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
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
			},
			{
				id: "/missing-people-stats",
				pattern: /^\/missing-people-stats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/missing-people-stats/[province]/[year]",
				pattern: /^\/missing-people-stats\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"province","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
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
