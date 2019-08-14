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
}

class MyCheckboxes {
  static render(items, opts){
    return TreeBuilder.build(h =>
      h("span", {
          "class": "mycheckboxes_container"
        , onchange: (ev)=>{ opts.onchange(ev); }
        }
      , items.map(item => {
            const attrs = {
              type: "checkbox",
              name: "sample",
              value: item.value
            };
            if (
              opts.checked.includes(item.value)
            ) {
              attrs.checked = "checked";
            }

            return h("label", {}
            , h("input", attrs)
            , item.label
            );
          }
        )
      )
    );
  }

  static getValues(ev){
    const $tgt = $(ev.target);
    const $cont = $tgt.closest(".mycheckboxes_container");

    return Array.from($cont.find("input:checked"))
      .map(input => input.value);
  }
}
