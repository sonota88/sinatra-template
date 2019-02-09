class TreeBuilder {
  static _appendChild(parent, child){
    parent.appendChild(child);
  }

  static _build(tag, attrs, ...children){
    const el = document.createElement(tag);
    const append = TreeBuilder._appendChild;

    for (let k in attrs) {
      const v = attrs[k];
      if (/^on(click)$/.test(k)) {
        const eventName = k.substring(2);
        el.addEventListener(eventName, v, false);
      } else if (k === "style") {
        for (let sk in v) {
          const sv = v[sk];
          el.style[sk] = sv;
        }
      } else {
        el.setAttribute(k, v);
      }
    }

    if (children == null) {
      return el;
    }

    children
    .filter(child => child != null)
    .forEach((child)=>{
      if (["string", "number", "boolean"].includes(typeof child)) {
        append(el, document.createTextNode(child));
      } else if (Array.isArray(child)) {
        child.forEach(_child => append(el, _child));
      } else if (child.constructor.name === "NodeList") {
        Array.from(child).forEach(_child => append(el, _child));
      } else {
        append(el, child);
      }
    });

    return el;
  }

  static build(fn){
    return fn(TreeBuilder._build);
  }

  /**
   * @return NodeList
   */
  static buildRawHtml(html){
    const el = document.createElement("div");
    el.innerHTML = html;
    return el.childNodes;
  }
}
