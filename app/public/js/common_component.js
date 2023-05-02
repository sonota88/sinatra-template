class MyOption {
  static render(item, selectedVal){
    const attrs = { value: item.value };
    if (item.value === selectedVal) {
      attrs.selected = "selected";
    }

    const text = item.text || item.value; // text is optional
    return (
      h("option", attrs, text)
    );
  }
}

class MySelect {
  static render(items, opts){
    return (
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
    return ev.target.value;
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

    return (
      h("label", { "class": labelClasses.join(" ") }
      , h("input", attrs)
      , item.text
      )
    );
  }
}

/*
  opts:
    selected: single value
    onchange: (ev) => { ... }
*/
class MyRadioGroup {
  static render(name, items, opts){
    return (
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

// --------------------------------

class MyCheckbox {
  static render(name, item, selectedVals){
    const selected = (selectedVals.includes(item.value));

    const labelClasses = ["container_label"];
    if (selected) { labelClasses.push("container_label_selected"); }

    const attrs = {
      type: "checkbox",
      name: name,
      value: item.value
    };
    if (selected) {
      attrs.checked = "checked";
    }

    return (
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
class MyCheckboxGroup {
  static render(name, items, opts){
    const contAttrs = {
      "class": "mycheckboxgroup_container"
    };
    if ("onchange" in opts) {
      contAttrs.onchange = opts.onchange;
    }

    return (
      h("span", contAttrs
      , items.map(item =>
          MyCheckbox.render(name, item, opts.selected)
        )
      )
    );
  }

  static getValues(ev){
    const $tgt = $(ev.target);
    const $cont = $tgt.closest(".mycheckboxgroup_container");

    return Array.from($cont.find("input:checked"))
      .map(input => input.value);
  }

  static getValuesAsInt(ev){
    const vs = MyCheckboxGroup.getValues(ev);
    return vs.map(v => parseInt(v, 10));
  }
}

// --------------------------------

class MyToggleCheckbox {
  static render(checked, text, onchange){
    const labelClasses = ["container_label"];
    if (checked) { labelClasses.push("container_label_selected"); }

    const attrs = {
      type: "checkbox",
      onchange
    };
    if (checked) { attrs.checked = "checked"; }

    return (
      h("label", { "class": labelClasses.join(" ") }
      , h("input", attrs)
      , text
      )
    );
  }

  static isChecked(ev){
    return $(ev.target).prop("checked");
  }
}
