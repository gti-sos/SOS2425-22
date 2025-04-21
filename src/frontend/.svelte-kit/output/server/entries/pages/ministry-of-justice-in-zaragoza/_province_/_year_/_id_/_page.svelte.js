import { X as store_get, I as head, G as escape_html, Y as unsubscribe_stores, D as pop, A as push, R as attr } from "../../../../../../chunks/index.js";
import { p as page } from "../../../../../../chunks/stores.js";
import "../../../../../../chunks/client.js";
import { T as Table, B as Button } from "../../../../../../chunks/Theme.svelte_svelte_type_style_lang.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  `/api/v2/ministry-of-justice-in-zaragoza/${store_get($$store_subs ??= {}, "$page", page).params.province}/${store_get($$store_subs ??= {}, "$page", page).params.year}/${store_get($$store_subs ??= {}, "$page", page).params.id}`;
  let ministryData = {};
  let isLoading = false;
  let newMinistryCreationYear;
  let newMinistryPortalId;
  let newMinistryLatitude;
  let newMinistryPostalCode;
  let newMinistryLength;
  let newMinistryTitle;
  let newMinistryEquipmentType;
  let newMinistryPublicTitularity;
  let newMinistryStreetAddress;
  let newMinistryNumWorkers;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Editar</title>`;
  });
  $$payload.out += `<h2>Editando ministerio en ${escape_html(ministryData.province)} (${escape_html(ministryData.year)})</h2> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
    Table($$payload, {
      children: ($$payload2) => {
        $$payload2.out += `<thead><tr><th class="svelte-xebk95">Campo</th><th class="svelte-xebk95">Valor Actual</th></tr></thead> <tbody><tr><td class="svelte-xebk95">Province</td><td class="svelte-xebk95">${escape_html(ministryData.province)} (no editable)</td></tr><tr><td class="svelte-xebk95">Creation Year</td><td class="svelte-xebk95"><input${attr("value", newMinistryCreationYear)} type="number" class="svelte-xebk95"></td></tr><tr><td class="svelte-xebk95">ID</td><td class="svelte-xebk95">${escape_html(ministryData.id)} (no editable)</td></tr><tr><td class="svelte-xebk95">Portal ID</td><td class="svelte-xebk95"><input${attr("value", newMinistryPortalId)} type="number" class="svelte-xebk95"></td></tr><tr><td class="svelte-xebk95">Postal Code</td><td class="svelte-xebk95"><input${attr("value", newMinistryPostalCode)} type="number" class="svelte-xebk95"></td></tr><tr><td class="svelte-xebk95">Latitude</td><td class="svelte-xebk95"><input${attr("value", newMinistryLatitude)} type="number" step="0.000001" class="svelte-xebk95"></td></tr><tr><td class="svelte-xebk95">Length</td><td class="svelte-xebk95"><input${attr("value", newMinistryLength)} type="number" step="0.000001" class="svelte-xebk95"></td></tr><tr><td class="svelte-xebk95">Title</td><td class="svelte-xebk95"><input${attr("value", newMinistryTitle)} class="svelte-xebk95"></td></tr><tr><td class="svelte-xebk95">Equipment Type</td><td class="svelte-xebk95"><input${attr("value", newMinistryEquipmentType)} class="svelte-xebk95"></td></tr><tr><td class="svelte-xebk95">Public Titularity</td><td class="svelte-xebk95"><input${attr("value", newMinistryPublicTitularity)} class="svelte-xebk95"></td></tr><tr><td class="svelte-xebk95">Street Address</td><td class="svelte-xebk95"><input${attr("value", newMinistryStreetAddress)} class="svelte-xebk95"></td></tr><tr><td class="svelte-xebk95">Year</td><td class="svelte-xebk95">${escape_html(ministryData.year)} (no editable)</td></tr><tr><td class="svelte-xebk95">Number of Workers</td><td class="svelte-xebk95"><input${attr("value", newMinistryNumWorkers)} type="number" class="svelte-xebk95"></td></tr></tbody>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> <div class="actions svelte-xebk95">`;
    Button($$payload, {
      color: "primary",
      disabled: isLoading,
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html("Guardar Cambios")}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    Button($$payload, {
      color: "danger",
      disabled: isLoading,
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html("Eliminar Ministerio")}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    Button($$payload, {
      color: "secondary",
      children: ($$payload2) => {
        $$payload2.out += `<!---->Cancelar`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
