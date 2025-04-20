import { E as slot } from "../../chunks/index.js";
import "clsx";
function Header($$payload) {
  $$payload.out += `<h1><ul><a href="/">INICIO</a></ul></h1>`;
}
function Footer($$payload) {
  $$payload.out += `<ul><p>Desarrollado por el equipo de SOS2425-22</p></ul>`;
}
function _layout($$payload, $$props) {
  Header($$payload);
  $$payload.out += `<!----> <hr> <!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----> <hr> `;
  Footer($$payload);
  $$payload.out += `<!---->`;
}
export {
  _layout as default
};
