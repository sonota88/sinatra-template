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
