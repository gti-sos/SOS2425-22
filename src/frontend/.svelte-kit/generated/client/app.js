export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/analytics": [4],
		"/integrations": [5],
		"/integrations/graphs-JMRL/allData": [6],
		"/integrations/graphs-JMRL/ext1": [7],
		"/integrations/graphs-JMRL/ext2": [8],
		"/integrations/graphs-JMRL/ext3": [9],
		"/integrations/graphs-JMRL/ext4": [10],
		"/integrations/graphs-JMRL/g16-unemployment-stats": [11],
		"/integrations/graphs-JMRL/g19-accident-rate-stats": [12],
		"/ministry-of-justice-in-zaragoza": [13],
		"/ministry-of-justice-in-zaragoza/[province]/[year]/[id]": [14]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';