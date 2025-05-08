import { J as sanitize_props, K as rest_props, A as push, M as fallback, N as spread_attributes, O as clsx, E as slot, P as bind_props, D as pop, Q as attr_class, R as attr, G as escape_html, S as sanitize_slots, T as copy_payload, U as assign_payload, V as spread_props, W as ensure_array_like, I as head } from "../../../chunks/index.js";
import "../../../chunks/client.js";
import "clsx";
import { i as isObject, g as getColumnSizeClass, c as classnames, B as Button, T as Table } from "../../../chunks/Theme.svelte_svelte_type_style_lang.js";
function Col($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "xxl"
  ]);
  push();
  let className = fallback($$props["class"], "");
  let xs = fallback($$props["xs"], void 0);
  let sm = fallback($$props["sm"], void 0);
  let md = fallback($$props["md"], void 0);
  let lg = fallback($$props["lg"], void 0);
  let xl = fallback($$props["xl"], void 0);
  let xxl = fallback($$props["xxl"], void 0);
  const colClasses = [];
  const lookup = { xs, sm, md, lg, xl, xxl };
  Object.keys(lookup).forEach((colWidth) => {
    const columnProp = lookup[colWidth];
    if (!columnProp && columnProp !== "") {
      return;
    }
    const isXs = colWidth === "xs";
    if (isObject(columnProp)) {
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      const colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);
      if (columnProp.size || columnProp.size === "") {
        colClasses.push(colClass);
      }
      if (columnProp.push) {
        colClasses.push(`push${colSizeInterfix}${columnProp.push}`);
      }
      if (columnProp.pull) {
        colClasses.push(`pull${colSizeInterfix}${columnProp.pull}`);
      }
      if (columnProp.offset) {
        colClasses.push(`offset${colSizeInterfix}${columnProp.offset}`);
      }
      if (columnProp.order) {
        colClasses.push(`order${colSizeInterfix}${columnProp.order}`);
      }
    } else {
      colClasses.push(getColumnSizeClass(isXs, colWidth, columnProp));
    }
  });
  if (!colClasses.length) {
    colClasses.push("col");
  }
  if (className) {
    colClasses.push(className);
  }
  $$payload.out += `<div${spread_attributes(
    {
      ...$$restProps,
      class: clsx(colClasses.join(" "))
    },
    null
  )}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  bind_props($$props, {
    class: className,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl
  });
  pop();
}
function Form($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "inline", "validated"]);
  push();
  let classes;
  let className = fallback($$props["class"], "");
  let inline = fallback($$props["inline"], false);
  let validated = fallback($$props["validated"], false);
  classes = classnames(className, {
    "form-inline": inline,
    "was-validated": validated
  });
  $$payload.out += `<form${spread_attributes({ ...$$restProps, class: clsx(classes) }, null)}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></form>`;
  bind_props($$props, { class: className, inline, validated });
  pop();
}
function FormCheck($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "checked",
    "disabled",
    "group",
    "id",
    "inline",
    "inner",
    "invalid",
    "label",
    "name",
    "reverse",
    "size",
    "type",
    "valid",
    "value"
  ]);
  push();
  let classes, inputClasses, idFor;
  let className = fallback($$props["class"], "");
  let checked = fallback($$props["checked"], false);
  let disabled = fallback($$props["disabled"], false);
  let group = fallback($$props["group"], void 0);
  let id = fallback($$props["id"], void 0);
  let inline = fallback($$props["inline"], false);
  let inner = fallback($$props["inner"], void 0);
  let invalid = fallback($$props["invalid"], false);
  let label = fallback($$props["label"], "");
  let name = fallback($$props["name"], "");
  let reverse = fallback($$props["reverse"], false);
  let size = fallback($$props["size"], "");
  let type = fallback($$props["type"], "checkbox");
  let valid = fallback($$props["valid"], false);
  let value = fallback($$props["value"], void 0);
  classes = classnames(className, "form-check", {
    "form-check-reverse": reverse,
    "form-switch": type === "switch",
    "form-check-inline": inline,
    [`form-control-${size}`]: size
  });
  inputClasses = classnames("form-check-input", { "is-invalid": invalid, "is-valid": valid });
  idFor = id || label;
  $$payload.out += `<div${attr_class(clsx(classes))}>`;
  if (type === "radio") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<input${spread_attributes(
      {
        ...$$restProps,
        class: clsx(inputClasses),
        id: idFor,
        type: "radio",
        checked: group === value,
        disabled,
        name,
        value
      },
      null
    )}>`;
  } else if (type === "switch") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<input${spread_attributes(
      {
        ...$$restProps,
        class: clsx(inputClasses),
        id: idFor,
        type: "checkbox",
        checked,
        disabled,
        name,
        value
      },
      null
    )}>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<input${spread_attributes(
      {
        ...$$restProps,
        class: clsx(inputClasses),
        id: idFor,
        type: "checkbox",
        checked,
        disabled,
        name,
        value
      },
      null
    )}>`;
  }
  $$payload.out += `<!--]--> `;
  if (label) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<label class="form-check-label"${attr("for", idFor)}><!---->`;
    slot($$payload, $$props, "label", {}, () => {
      $$payload.out += `${escape_html(label)}`;
    });
    $$payload.out += `<!----></label>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, {
    class: className,
    checked,
    disabled,
    group,
    id,
    inline,
    inner,
    invalid,
    label,
    name,
    reverse,
    size,
    type,
    valid,
    value
  });
  pop();
}
function FormFeedback($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "valid", "tooltip"]);
  push();
  let className = fallback($$props["class"], "");
  let valid = fallback($$props["valid"], void 0);
  let tooltip = fallback($$props["tooltip"], false);
  let classes;
  {
    const validMode = tooltip ? "tooltip" : "feedback";
    classes = classnames(className, valid ? `valid-${validMode}` : `invalid-${validMode}`);
  }
  $$payload.out += `<div${spread_attributes({ ...$$restProps, class: clsx(classes) }, null)}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { class: className, valid, tooltip });
  pop();
}
function FormGroup($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "check",
    "disabled",
    "floating",
    "inline",
    "label",
    "row",
    "spacing",
    "tag"
  ]);
  push();
  let classes;
  let className = fallback($$props["class"], "");
  let check = fallback($$props["check"], false);
  let disabled = fallback($$props["disabled"], false);
  let floating = fallback($$props["floating"], false);
  let inline = fallback($$props["inline"], false);
  let label = fallback($$props["label"], "");
  let row = fallback($$props["row"], false);
  let spacing = fallback($$props["spacing"], "mb-3");
  let tag = fallback($$props["tag"], null);
  classes = classnames(className, spacing, {
    row,
    "form-check": check,
    "form-check-inline": check && inline,
    "form-floating": floating,
    disabled: check && disabled
  });
  if (tag === "fieldset") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<fieldset${spread_attributes({ ...$$restProps, class: clsx(classes) }, null)}><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----> `;
    if (label || $$slots.label) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<label>${escape_html(label)} <!---->`;
      slot($$payload, $$props, "label", {}, null);
      $$payload.out += `<!----></label>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></fieldset>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...$$restProps, class: clsx(classes) }, null)}><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----> `;
    if (label || $$slots.label) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<label>${escape_html(label)} <!---->`;
      slot($$payload, $$props, "label", {}, null);
      $$payload.out += `<!----></label>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: className,
    check,
    disabled,
    floating,
    inline,
    label,
    row,
    spacing,
    tag
  });
  pop();
}
function Input($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "bsSize",
    "checked",
    "color",
    "disabled",
    "feedback",
    "files",
    "group",
    "inner",
    "invalid",
    "label",
    "max",
    "min",
    "multiple",
    "name",
    "placeholder",
    "plaintext",
    "readonly",
    "reverse",
    "size",
    "theme",
    "type",
    "valid",
    "value"
  ]);
  push();
  let className = fallback($$props["class"], "");
  let bsSize = fallback($$props["bsSize"], void 0);
  let checked = fallback($$props["checked"], false);
  let color = fallback($$props["color"], void 0);
  let disabled = fallback($$props["disabled"], void 0);
  let feedback = fallback($$props["feedback"], void 0);
  let files = fallback($$props["files"], void 0);
  let group = fallback($$props["group"], void 0);
  let inner = fallback($$props["inner"], void 0);
  let invalid = fallback($$props["invalid"], false);
  let label = fallback($$props["label"], void 0);
  let max = fallback($$props["max"], void 0);
  let min = fallback($$props["min"], void 0);
  let multiple = fallback($$props["multiple"], void 0);
  let name = fallback($$props["name"], "");
  let placeholder = fallback($$props["placeholder"], "");
  let plaintext = fallback($$props["plaintext"], false);
  let readonly = fallback($$props["readonly"], void 0);
  let reverse = fallback($$props["reverse"], false);
  let size = fallback($$props["size"], void 0);
  let theme = fallback($$props["theme"], void 0);
  let type = fallback($$props["type"], "text");
  let valid = fallback($$props["valid"], false);
  let value = fallback($$props["value"], void 0);
  let classes;
  let tag;
  {
    const isNotaNumber = new RegExp("\\D", "g");
    let isBtn = false;
    let formControlClass = "form-control";
    tag = "input";
    switch (type) {
      case "color":
        formControlClass = `form-control form-control-color`;
        break;
      case "range":
        formControlClass = "form-range";
        break;
      case "select":
        formControlClass = `form-select`;
        tag = "select";
        break;
      case "textarea":
        tag = "textarea";
        break;
      case "button":
      case "reset":
      case "submit":
        formControlClass = `btn btn-${color || "secondary"}`;
        isBtn = true;
        break;
      case "hidden":
      case "image":
        formControlClass = void 0;
        break;
      default:
        formControlClass = "form-control";
        tag = "input";
    }
    if (plaintext) {
      formControlClass = `${formControlClass}-plaintext`;
      tag = "input";
    }
    if (size && isNotaNumber.test(size)) {
      console.warn(`Please use the prop "bsSize" instead of the "size" to bootstrap's input sizing.`);
      bsSize = size;
      size = void 0;
    }
    classes = classnames(className, formControlClass, {
      "is-invalid": invalid,
      "is-valid": valid,
      [`form-control-${bsSize}`]: bsSize && !isBtn && tag !== "select",
      [`form-select-${bsSize}`]: bsSize && tag === "select",
      [`btn-${bsSize}`]: bsSize && isBtn
    });
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (tag === "input") {
      $$payload2.out += "<!--[-->";
      if (type === "text" || type === "password" || type === "search" || type === "tel" || type === "url") {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<input${spread_attributes(
          {
            ...$$restProps,
            ...{ type },
            "data-bs-theme": theme,
            class: clsx(classes),
            value,
            disabled,
            name,
            placeholder,
            readonly,
            size
          },
          null
        )}>`;
      } else if (type === "color") {
        $$payload2.out += "<!--[1-->";
        $$payload2.out += `<input${spread_attributes(
          {
            ...$$restProps,
            "data-bs-theme": theme,
            class: clsx(classes),
            type: "color",
            value,
            disabled,
            name,
            placeholder,
            readonly
          },
          null
        )}>`;
      } else if (type === "email") {
        $$payload2.out += "<!--[2-->";
        $$payload2.out += `<input${spread_attributes(
          {
            ...$$restProps,
            "data-bs-theme": theme,
            class: clsx(classes),
            type: "email",
            value,
            disabled,
            multiple,
            name,
            placeholder,
            readonly,
            size
          },
          null
        )}>`;
      } else if (type === "file") {
        $$payload2.out += "<!--[3-->";
        $$payload2.out += `<input${spread_attributes(
          {
            ...$$restProps,
            "data-bs-theme": theme,
            class: clsx(classes),
            type: "file",
            disabled,
            invalid,
            multiple,
            name,
            placeholder,
            readonly,
            valid
          },
          null
        )}>`;
      } else if (type === "checkbox" || type === "radio" || type === "switch") {
        $$payload2.out += "<!--[4-->";
        FormCheck($$payload2, spread_props([
          $$restProps,
          {
            "data-bs-theme": theme,
            class: className,
            size: bsSize,
            type,
            disabled,
            invalid,
            label,
            name,
            placeholder,
            reverse,
            readonly,
            valid,
            get checked() {
              return checked;
            },
            set checked($$value) {
              checked = $$value;
              $$settled = false;
            },
            get inner() {
              return inner;
            },
            set inner($$value) {
              inner = $$value;
              $$settled = false;
            },
            get group() {
              return group;
            },
            set group($$value) {
              group = $$value;
              $$settled = false;
            },
            get value() {
              return value;
            },
            set value($$value) {
              value = $$value;
              $$settled = false;
            }
          }
        ]));
      } else if (type === "number") {
        $$payload2.out += "<!--[5-->";
        $$payload2.out += `<input${spread_attributes(
          {
            ...$$restProps,
            type: "number",
            "data-bs-theme": theme,
            class: clsx(classes),
            value,
            disabled,
            max,
            min,
            name,
            placeholder,
            readonly
          },
          null
        )}>`;
      } else if (type === "range") {
        $$payload2.out += "<!--[6-->";
        $$payload2.out += `<input${spread_attributes(
          {
            ...$$restProps,
            type: "range",
            "data-bs-theme": theme,
            class: clsx(classes),
            value,
            disabled,
            max,
            min,
            name,
            placeholder,
            readonly
          },
          null
        )}>`;
      } else if (type === "date" || type === "datetime" || type === "datetime-local" || type === "month" || type === "time" || type === "week") {
        $$payload2.out += "<!--[7-->";
        $$payload2.out += `<input${spread_attributes(
          {
            ...$$restProps,
            ...{ type },
            "data-bs-theme": theme,
            class: clsx(classes),
            value,
            disabled,
            max,
            min,
            name,
            placeholder,
            readonly
          },
          null
        )}>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<input${spread_attributes(
          {
            ...$$restProps,
            "data-bs-theme": theme,
            class: clsx(classes),
            ...{ type },
            value,
            name,
            disabled,
            placeholder,
            readonly
          },
          null
        )}>`;
      }
      $$payload2.out += `<!--]-->`;
    } else if (tag === "textarea") {
      $$payload2.out += "<!--[1-->";
      $$payload2.out += `<textarea${spread_attributes(
        {
          ...$$restProps,
          "data-bs-theme": theme,
          class: clsx(classes),
          disabled,
          name,
          placeholder,
          readonly
        },
        null
      )}>`;
      const $$body = escape_html(value);
      if ($$body) {
        $$payload2.out += `${$$body}`;
      }
      $$payload2.out += `</textarea>`;
    } else if (tag === "select" && !multiple) {
      $$payload2.out += "<!--[2-->";
      $$payload2.out += `<select${spread_attributes(
        {
          ...$$restProps,
          "data-bs-theme": theme,
          class: clsx(classes),
          name,
          disabled,
          readonly
        },
        null
      )}><!---->`;
      slot($$payload2, $$props, "default", {}, null);
      $$payload2.out += `<!----></select>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (feedback) {
      $$payload2.out += "<!--[-->";
      if (Array.isArray(feedback)) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(feedback);
        $$payload2.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let msg = each_array[$$index];
          FormFeedback($$payload2, {
            valid,
            children: ($$payload3) => {
              $$payload3.out += `<!---->${escape_html(msg)}`;
            },
            $$slots: { default: true }
          });
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
        FormFeedback($$payload2, {
          valid,
          children: ($$payload3) => {
            $$payload3.out += `<!---->${escape_html(feedback)}`;
          },
          $$slots: { default: true }
        });
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    class: className,
    bsSize,
    checked,
    color,
    disabled,
    feedback,
    files,
    group,
    inner,
    invalid,
    label,
    max,
    min,
    multiple,
    name,
    placeholder,
    plaintext,
    readonly,
    reverse,
    size,
    theme,
    type,
    valid,
    value
  });
  pop();
}
function Label($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "hidden",
    "check",
    "size",
    "for",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "xxl",
    "widths"
  ]);
  push();
  let classes;
  let className = fallback($$props["class"], "");
  let hidden = fallback($$props["hidden"], false);
  let check = fallback($$props["check"], false);
  let size = fallback($$props["size"], "");
  let fore = fallback($$props["for"], null);
  let xs = fallback($$props["xs"], "");
  let sm = fallback($$props["sm"], "");
  let md = fallback($$props["md"], "");
  let lg = fallback($$props["lg"], "");
  let xl = fallback($$props["xl"], "");
  let xxl = fallback($$props["xxl"], "");
  const colWidths = { xs, sm, md, lg, xl, xxl };
  let widths = fallback($$props["widths"], () => Object.keys(colWidths), true);
  const colClasses = [];
  widths.forEach((colWidth) => {
    let columnProp = $$sanitized_props[colWidth];
    if (!columnProp && columnProp !== "") {
      return;
    }
    const isXs = colWidth === "xs";
    let colClass;
    if (isObject(columnProp)) {
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);
      colClasses.push(classnames({
        [colClass]: columnProp.size || columnProp.size === "",
        [`order${colSizeInterfix}${columnProp.order}`]: columnProp.order || columnProp.order === 0,
        [`offset${colSizeInterfix}${columnProp.offset}`]: columnProp.offset || columnProp.offset === 0
      }));
    } else {
      colClass = getColumnSizeClass(isXs, colWidth, columnProp);
      colClasses.push(colClass);
    }
  });
  classes = classnames(className, hidden ? "visually-hidden" : false, check ? "form-check-label" : false, size ? `col-form-label-${size}` : false, colClasses, colClasses.length ? "col-form-label" : "form-label");
  $$payload.out += `<label${spread_attributes(
    {
      ...$$restProps,
      class: clsx(classes),
      for: fore
    },
    null
  )}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></label>`;
  bind_props($$props, {
    class: className,
    hidden,
    check,
    size,
    for: fore,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    widths
  });
  pop();
}
function Row($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "noGutters",
    "form",
    "cols",
    "inner"
  ]);
  push();
  let classes;
  let className = fallback($$props["class"], "");
  let noGutters = fallback($$props["noGutters"], false);
  let form = fallback($$props["form"], false);
  let cols = fallback($$props["cols"], 0);
  let inner = fallback($$props["inner"], void 0);
  function getCols(cols2) {
    const colsValue = parseInt(cols2);
    if (!isNaN(colsValue)) {
      if (colsValue > 0) {
        return [`row-cols-${colsValue}`];
      }
    } else if (typeof cols2 === "object") {
      return ["xs", "sm", "md", "lg", "xl"].map((colWidth) => {
        const isXs = colWidth === "xs";
        const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
        const value = cols2[colWidth];
        if (typeof value === "number" && value > 0) {
          return `row-cols${colSizeInterfix}${value}`;
        }
        return null;
      }).filter((value) => !!value);
    }
    return [];
  }
  classes = classnames(className, noGutters ? "gx-0" : null, form ? "form-row" : "row", ...getCols(cols));
  $$payload.out += `<div${spread_attributes({ ...$$restProps, class: clsx(classes) }, null)}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  bind_props($$props, {
    class: className,
    noGutters,
    form,
    cols,
    inner
  });
  pop();
}
function _page($$payload, $$props) {
  push();
  let filteredData = [];
  let isLoading = false;
  let newMinistryProvince;
  let newMinistryCreationYear;
  let newMinistryId;
  let newMinistryPortalId;
  let newMinistryLatitude;
  let newMinistryPostalCode;
  let newMinistryLength;
  let newMinistryTitle;
  let newMinistryEquipmentType;
  let newMinistryPublicTitularity;
  let newMinistryStreetAddress;
  let newMinistryYear;
  let newMinistryNumWorkers;
  let filterField = "creation_year";
  let filterValue = "";
  let minId = "";
  let maxId = "";
  let currentPage = 1;
  let totalPages = 1;
  let paginatedData = [];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Ministry of Justice in Zaragoza</title>`;
    });
    $$payload2.out += `<h2>Ministry of Justice in Zaragoza</h2> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Form($$payload2, {
      children: ($$payload3) => {
        Row($$payload3, {
          children: ($$payload4) => {
            Col($$payload4, {
              md: "6",
              children: ($$payload5) => {
                FormGroup($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<h4>Filtrar por campo</h4> `;
                    Input($$payload6, {
                      type: "select",
                      id: "filterField",
                      get value() {
                        return filterField;
                      },
                      set value($$value) {
                        filterField = $$value;
                        $$settled = false;
                      },
                      children: ($$payload7) => {
                        $$payload7.out += `<option value="creation_year">Año de creación</option> <option value="province">Provincia</option> <option value="id">ID</option> <option value="portalId">Portal ID</option> <option value="postal_code">Código postal</option> <option value="latitude">Latitud</option> <option value="length">Longitud</option> <option value="title">Título</option> <option value="equipment_type">Tipo de equipo</option> <option value="public_titularity">Titularidad pública</option> <option value="street_address">Dirección</option> <option value="year">Año</option> <option value="num_workers">Número de trabajadores</option>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Label($$payload6, { for: "filterValue" });
                    $$payload6.out += `<!----> `;
                    Input($$payload6, {
                      id: "filterValue",
                      placeholder: "Valor para filtrar",
                      get value() {
                        return filterValue;
                      },
                      set value($$value) {
                        filterValue = $$value;
                        $$settled = false;
                      }
                    });
                    $$payload6.out += `<!----> <div class="button-group svelte-3dyv1n">`;
                    Button($$payload6, {
                      color: "primary",
                      disabled: isLoading,
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->${escape_html("Aplicar Filtro")}`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Button($$payload6, {
                      color: "secondary",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Limpiar`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----></div>`;
                  },
                  $$slots: { default: true }
                });
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Col($$payload4, {
              md: "6",
              children: ($$payload5) => {
                FormGroup($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<h4>Buscar por rango de IDs</h4> <div class="range-inputs svelte-3dyv1n">`;
                    Input($$payload6, {
                      type: "number",
                      placeholder: "ID mínimo",
                      get value() {
                        return minId;
                      },
                      set value($$value) {
                        minId = $$value;
                        $$settled = false;
                      }
                    });
                    $$payload6.out += `<!----> <span class="svelte-3dyv1n">a</span> `;
                    Input($$payload6, {
                      type: "number",
                      placeholder: "ID máximo",
                      get value() {
                        return maxId;
                      },
                      set value($$value) {
                        maxId = $$value;
                        $$settled = false;
                      }
                    });
                    $$payload6.out += `<!----></div> <div class="button-group svelte-3dyv1n">`;
                    Button($$payload6, {
                      color: "primary",
                      disabled: isLoading,
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->${escape_html("Buscar")}`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Button($$payload6, {
                      color: "secondary",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Limpiar`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----></div>`;
                  },
                  $$slots: { default: true }
                });
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <div class="pagination-controls svelte-3dyv1n">`;
    Button($$payload2, {
      color: "secondary",
      disabled: currentPage === 1,
      children: ($$payload3) => {
        $$payload3.out += `<!---->« Primera`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Button($$payload2, {
      color: "secondary",
      disabled: currentPage === 1,
      children: ($$payload3) => {
        $$payload3.out += `<!---->Anterior`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Button($$payload2, {
      color: "secondary",
      disabled: currentPage === totalPages,
      children: ($$payload3) => {
        $$payload3.out += `<!---->Siguiente`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Button($$payload2, {
      color: "secondary",
      disabled: currentPage === totalPages,
      children: ($$payload3) => {
        $$payload3.out += `<!---->Última »`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="pagination-info svelte-3dyv1n">Página ${escape_html(currentPage)} de ${escape_html(totalPages)} | Mostrando ${escape_html(paginatedData.length)} de ${escape_html(filteredData.length)} resultados</div> `;
    Table($$payload2, {
      children: ($$payload3) => {
        const each_array = ensure_array_like(paginatedData);
        $$payload3.out += `<thead><tr><th class="svelte-3dyv1n">Province</th><th class="svelte-3dyv1n">Creation Year</th><th class="svelte-3dyv1n">Id</th><th class="svelte-3dyv1n">Portal Id</th><th class="svelte-3dyv1n">Postal Code</th><th class="svelte-3dyv1n">Latitude</th><th class="svelte-3dyv1n">Length</th><th class="svelte-3dyv1n">Title</th><th class="svelte-3dyv1n">Equipment Type</th><th class="svelte-3dyv1n">Public Titularity</th><th class="svelte-3dyv1n">Street Address</th><th class="svelte-3dyv1n">Year</th><th class="svelte-3dyv1n">Number of Workers</th><th class="svelte-3dyv1n">Actions</th></tr></thead> <tbody><tr><td>`;
        Input($$payload3, {
          placeholder: "Provincia",
          required: true,
          get value() {
            return newMinistryProvince;
          },
          set value($$value) {
            newMinistryProvince = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          type: "number",
          placeholder: "Año creación",
          get value() {
            return newMinistryCreationYear;
          },
          set value($$value) {
            newMinistryCreationYear = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          type: "number",
          placeholder: "ID",
          get value() {
            return newMinistryId;
          },
          set value($$value) {
            newMinistryId = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          type: "number",
          placeholder: "Portal ID",
          get value() {
            return newMinistryPortalId;
          },
          set value($$value) {
            newMinistryPortalId = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          type: "number",
          placeholder: "Código postal",
          get value() {
            return newMinistryPostalCode;
          },
          set value($$value) {
            newMinistryPostalCode = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          type: "number",
          step: "0.000001",
          placeholder: "Latitud",
          get value() {
            return newMinistryLatitude;
          },
          set value($$value) {
            newMinistryLatitude = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          type: "number",
          step: "0.000001",
          placeholder: "Longitud",
          get value() {
            return newMinistryLength;
          },
          set value($$value) {
            newMinistryLength = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          placeholder: "Título",
          required: true,
          get value() {
            return newMinistryTitle;
          },
          set value($$value) {
            newMinistryTitle = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          placeholder: "Tipo equipo",
          get value() {
            return newMinistryEquipmentType;
          },
          set value($$value) {
            newMinistryEquipmentType = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          placeholder: "Titularidad",
          get value() {
            return newMinistryPublicTitularity;
          },
          set value($$value) {
            newMinistryPublicTitularity = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          placeholder: "Dirección",
          get value() {
            return newMinistryStreetAddress;
          },
          set value($$value) {
            newMinistryStreetAddress = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          type: "number",
          placeholder: "Año",
          get value() {
            return newMinistryYear;
          },
          set value($$value) {
            newMinistryYear = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Input($$payload3, {
          type: "number",
          placeholder: "Trabajadores",
          get value() {
            return newMinistryNumWorkers;
          },
          set value($$value) {
            newMinistryNumWorkers = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></td><td>`;
        Button($$payload3, {
          color: "success",
          disabled: isLoading,
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html("Crear")}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----></td></tr>`;
        if (each_array.length !== 0) {
          $$payload3.out += "<!--[-->";
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let mini = each_array[$$index];
            $$payload3.out += `<tr><td>${escape_html(mini.province)}</td><td>${escape_html(mini.creation_year)}</td><td>${escape_html(mini.id)}</td><td>${escape_html(mini.portalId)}</td><td>${escape_html(mini.postal_code)}</td><td>${escape_html(mini.latitude)}</td><td>${escape_html(mini.length)}</td><td>${escape_html(mini.title)}</td><td>${escape_html(mini.equipment_type)}</td><td>${escape_html(mini.public_titularity)}</td><td>${escape_html(mini.street_address)}</td><td>${escape_html(mini.year)}</td><td>${escape_html(mini.num_workers)}</td><td>`;
            Button($$payload3, {
              color: "danger",
              size: "sm",
              disabled: isLoading,
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html("Eliminar")}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----> `;
            Button($$payload3, {
              color: "primary",
              size: "sm",
              children: ($$payload4) => {
                $$payload4.out += `<!---->Editar`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----></td></tr>`;
          }
        } else {
          $$payload3.out += "<!--[!-->";
          $$payload3.out += `<tr><td colspan="14" style="text-align: center;">${escape_html("No se encontraron resultados")}</td></tr>`;
        }
        $$payload3.out += `<!--]--></tbody>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <div class="global-actions svelte-3dyv1n">`;
    Button($$payload2, {
      color: "danger",
      disabled: isLoading,
      children: ($$payload3) => {
        $$payload3.out += `<!---->${escape_html("Eliminar TODOS los datos")}`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _page as default
};
