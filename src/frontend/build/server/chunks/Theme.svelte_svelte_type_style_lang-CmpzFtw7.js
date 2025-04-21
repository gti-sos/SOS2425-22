import { M as sanitize_props, N as rest_props, x as push, O as fallback, R as bind_props, z as pop, P as spread_attributes, Q as clsx, F as escape_html, E as slot, U as attr_class, S as ensure_array_like, y as setContext } from './index-Dga0NNod.js';
import { w as writable } from './exports-BQtARc3-.js';

function isObject(value) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
}
function getColumnSizeClass(isXs, colWidth, colSize) {
  if (colSize === true || colSize === "") {
    return isXs ? "col" : `col-${colWidth}`;
  } else if (colSize === "auto") {
    return isXs ? "col-auto" : `col-${colWidth}-auto`;
  }
  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
}
function toClassName(value) {
  let result = "";
  if (typeof value === "string" || typeof value === "number") {
    result += value;
  } else if (typeof value === "object") {
    if (Array.isArray(value)) {
      result = value.map(toClassName).filter(Boolean).join(" ");
    } else {
      for (let key in value) {
        if (value[key]) {
          result && (result += " ");
          result += key;
        }
      }
    }
  }
  return result;
}
const classnames = (...args) => args.map(toClassName).filter(Boolean).join(" ");
function Button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "active",
    "block",
    "content",
    "close",
    "color",
    "disabled",
    "href",
    "inner",
    "outline",
    "size",
    "value"
  ]);
  push();
  let ariaLabel, classes, defaultAriaLabel;
  let className = fallback($$props["class"], "");
  let active = fallback($$props["active"], false);
  let block = fallback($$props["block"], false);
  let content = fallback($$props["content"], "");
  let close = fallback($$props["close"], false);
  let color = fallback($$props["color"], "secondary");
  let disabled = fallback($$props["disabled"], false);
  let href = fallback($$props["href"], "");
  let inner = fallback($$props["inner"], void 0);
  let outline = fallback($$props["outline"], false);
  let size = fallback($$props["size"], "");
  let value = fallback($$props["value"], "");
  ariaLabel = $$sanitized_props["aria-label"];
  classes = classnames(className, close ? "btn-close" : "btn", close || `btn${outline ? "-outline" : ""}-${color}`, size ? `btn-${size}` : false, block ? "d-block w-100" : false, { active });
  defaultAriaLabel = close ? "Close" : null;
  if (href) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${spread_attributes(
      {
        ...$$restProps,
        class: clsx(classes),
        href,
        "aria-label": ariaLabel || defaultAriaLabel
      },
      null,
      { disabled }
    )}>`;
    if (content) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "default", {}, null);
      $$payload.out += `<!---->`;
    }
    $$payload.out += `<!--]--></a>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes(
      {
        ...$$restProps,
        class: clsx(classes),
        disabled,
        value,
        "aria-label": ariaLabel || defaultAriaLabel
      },
      null
    )}><!---->`;
    slot($$payload, $$props, "default", {}, () => {
      if (content) {
        $$payload.out += "<!--[-->";
        $$payload.out += `${escape_html(content)}`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<!---->`;
        slot($$payload, $$props, "default", {}, null);
        $$payload.out += `<!---->`;
      }
      $$payload.out += `<!--]-->`;
    });
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: className,
    active,
    block,
    content,
    close,
    color,
    disabled,
    href,
    inner,
    outline,
    size,
    value
  });
  pop();
}
function Colgroup($$payload, $$props) {
  push();
  setContext("colgroup", true);
  $$payload.out += `<colgroup><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></colgroup>`;
  pop();
}
function ResponsiveContainer($$payload, $$props) {
  push();
  let responsiveClassName;
  let className = fallback($$props["class"], "");
  let responsive = fallback($$props["responsive"], false);
  responsiveClassName = classnames(className, {
    "table-responsive": responsive === true,
    [`table-responsive-${responsive}`]: typeof responsive === "string"
  });
  if (responsive) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(clsx(responsiveClassName))}><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className, responsive });
  pop();
}
function TableFooter($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, []);
  push();
  setContext("footer", true);
  $$payload.out += `<tfoot${spread_attributes({ ...$$restProps }, null)}><tr><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></tr></tfoot>`;
  pop();
}
function TableHeader($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, []);
  push();
  setContext("header", true);
  $$payload.out += `<thead${spread_attributes({ ...$$restProps }, null)}><tr><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></tr></thead>`;
  pop();
}
function Table($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "size",
    "bordered",
    "borderless",
    "striped",
    "hover",
    "responsive",
    "rows"
  ]);
  push();
  let classes;
  let className = fallback($$props["class"], "");
  let size = fallback($$props["size"], "");
  let bordered = fallback($$props["bordered"], false);
  let borderless = fallback($$props["borderless"], false);
  let striped = fallback($$props["striped"], false);
  let hover = fallback($$props["hover"], false);
  let responsive = fallback($$props["responsive"], false);
  let rows = fallback($$props["rows"], void 0);
  classes = classnames(className, "table", size ? "table-" + size : false, bordered ? "table-bordered" : false, borderless ? "table-borderless" : false, striped ? "table-striped" : false, hover ? "table-hover" : false);
  ResponsiveContainer($$payload, {
    responsive,
    children: ($$payload2) => {
      $$payload2.out += `<table${spread_attributes({ ...$$restProps, class: clsx(classes) }, null)}>`;
      if (rows) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(rows);
        Colgroup($$payload2, {
          children: ($$payload3) => {
            $$payload3.out += `<!---->`;
            slot($$payload3, $$props, "default", {}, null);
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> `;
        TableHeader($$payload2, {
          children: ($$payload3) => {
            $$payload3.out += `<!---->`;
            slot($$payload3, $$props, "default", {}, null);
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <tbody><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let row = each_array[$$index];
          $$payload2.out += `<tr><!---->`;
          slot($$payload2, $$props, "default", { row }, null);
          $$payload2.out += `<!----></tr>`;
        }
        $$payload2.out += `<!--]--></tbody> `;
        TableFooter($$payload2, {
          children: ($$payload3) => {
            $$payload3.out += `<!---->`;
            slot($$payload3, $$props, "default", {}, null);
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      }
      $$payload2.out += `<!--]--></table>`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, {
    class: className,
    size,
    bordered,
    borderless,
    striped,
    hover,
    responsive,
    rows
  });
  pop();
}
const colorMode = writable(getInitialColorMode());
colorMode.subscribe((mode) => useColorMode(mode));
function getInitialColorMode() {
  const currentTheme = globalThis.document?.documentElement.getAttribute("data-bs-theme") || "light";
  const prefersDarkMode = typeof globalThis.window?.matchMedia === "function" ? globalThis.window?.matchMedia("(prefers-color-scheme: dark)").matches : false;
  return currentTheme === "dark" || currentTheme === "auto" && prefersDarkMode ? "dark" : "light";
}
function useColorMode(element, mode) {
  let target = element;
  if (arguments.length === 1) {
    target = globalThis.document?.documentElement;
    if (!target) {
      return;
    }
    mode = element;
    colorMode.update(() => mode);
  }
  target.setAttribute("data-bs-theme", mode);
}

export { Button as B, Table as T, classnames as c, getColumnSizeClass as g, isObject as i };
//# sourceMappingURL=Theme.svelte_svelte_type_style_lang-CmpzFtw7.js.map
