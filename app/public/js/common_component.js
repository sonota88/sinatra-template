// --------------------------------

class MySelect {
  static render(items, opts){
    const attrs = {};
    if ("onchange" in opts) {
      attrs.onchange = opts.onchange;
    }

    return TreeBuilder.build(h =>
      h("select", attrs
      , items.map(item => {
            const optAttrs = { value: item.value };
            if (item.value === opts.selected) {
              optAttrs.selected = "selected";
            }
            return h("option", optAttrs, item.label);
          }
        )
      )
    );
  }

  static getValue(ev){
    const $tgt = $(ev.target);
    return $tgt.find("option:selected").val();
  }

  static getValueAsInt(ev){
    const val = MySelect.getValue(ev);
    return parseInt(val, 10);
  }
}

// --------------------------------

class MyRadiobuttons {
  static render(name, items, opts){
    return TreeBuilder.build(h =>
      h("span", {
          "class": "myradiobuttons_container"
        , onchange: (ev)=>{ opts.onchange(ev); }
        }
      , items.map(item => {
          const checked = (item.value === opts.checked);

          const labelClasses = ["label_hl"];
          if (checked) { labelClasses.push("label_selected"); }

          const attrs = {
            type: "radio",
            name: name,
            value: item.value
          };
          if (checked) {
            attrs.checked = "checked";
          }

          return h("label", { "class": labelClasses.join(" ") }
          , h("input", attrs)
          , item.label
          );
        })
      )
    );
  }

  static getValue(ev){
    const $tgt = $(ev.target);
    const $cont = $tgt.closest(".myradiobuttons_container");

    return Array.from($cont.find("input:checked"))
      .map(input => input.value);
  }

  static getValueAsInt(ev){
    const val = MyRadiobuttons.getValue(ev);
    return parseInt(val, 10);
  }
}

// --------------------------------

class MyCheckboxes {
  static render(name, items, opts){
    return TreeBuilder.build(h =>
      h("span", {
          "class": "mycheckboxes_container"
        , onchange: (ev)=>{ opts.onchange(ev); }
        }
      , items.map(item => {
          const checked = (opts.checked.includes(item.value));

          const labelClasses = ["label_hl"];
          if (checked) { labelClasses.push("label_selected"); }

          const attrs = {
            type: "checkbox",
            name: name,
            value: item.value
          };
          if (checked) {
            attrs.checked = "checked";
          }

          return h("label", { "class": labelClasses.join(" ") }
          , h("input", attrs)
          , item.label
          );
        })
      )
    );
  }

  static getValues(ev){
    const $tgt = $(ev.target);
    const $cont = $tgt.closest(".mycheckboxes_container");

    return Array.from($cont.find("input:checked"))
      .map(input => input.value);
  }

  static getValuesAsInt(ev){
    const vs = MyCheckboxes.getValues(ev);
    return vs.map(v => parseInt(v, 10));
  }
}
