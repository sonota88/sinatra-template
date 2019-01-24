class TreeBuilder {
  static _build(tag, attrs, ...children){
    const el = document.createElement(tag);

    for(let k in attrs){
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

    children.forEach((child)=>{
      if (["string", "number"].includes(typeof child)) {
        el.appendChild(document.createTextNode(child));
      }else{
        el.appendChild(child);
      }
    });

    return el;
  }

  static build(fn){
    return fn(TreeBuilder._build);
  }
}
