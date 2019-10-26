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

// --------------------------------

class MyRadio {
  static render(name, item, selectedVal){
    const selected = (item.value === selectedVal);

    const labelClasses = ["container_label"];
    if (selected) { labelClasses.push("container_label_selected"); }

    const attrs = {
      type: "radio",
      name: name,
      value: item.value
    };
    if (selected) {
      attrs.checked = "checked";
    }

    return TreeBuilder.build(h =>
      h("label", { "class": labelClasses.join(" ") }
      , h("input", attrs)
      , item.text
      )
    );
  }
}

/*
  opts:
    selected: Array
    onchange: (ev) => { ... }
*/
class MyRadioGroup {
  static render(name, items, opts){
    return TreeBuilder.build(h =>
      h("span", {
          "class": "myradiogroup_container"
        , onchange: opts.onchange
        }
      , items.map(item =>
          MyRadio.render(name, item, opts.selected)
        )
      )
    );
  }

  static getValue(ev){
    const $tgt = $(ev.target);
    const $cont = $tgt.closest(".myradiogroup_container");

    return $cont.find("input:checked").val();
  }

  static getValueAsInt(ev){
    const val = MyRadioGroup.getValue(ev);
    return parseInt(val, 10);
  }
}
