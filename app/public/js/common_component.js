class MyOption {
  static render(item, selectedVal){
    const attrs = { value: item.value };
    if (item.value === selectedVal) {
      attrs.selected = "selected";
    }

    return TreeBuilder.build(h =>
      h("option", attrs, item.text)
    );
  }
}

class MySelect {
  static render(items, opts){
    return TreeBuilder.build(h =>
      h("select", {
          onchange: opts.onchange
        }
      , items.map(item =>
          MyOption.render(item, opts.selected)
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
