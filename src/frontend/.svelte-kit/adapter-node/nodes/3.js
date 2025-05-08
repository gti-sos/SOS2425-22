

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/integrations/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.D7WnkQMU.js","_app/immutable/chunks/Bu7QL4ii.js","_app/immutable/chunks/AWa3Cf9u.js","_app/immutable/chunks/DltxqxoW.js","_app/immutable/chunks/HoNV5Zar.js"];
export const stylesheets = ["_app/immutable/assets/3.DrGWq2lj.css"];
export const fonts = [];
