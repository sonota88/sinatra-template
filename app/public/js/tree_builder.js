class TreeBuilder {
  static _build(tag, attrs, ...children){
    const el = document.createElement(tag);

    for(let k in attrs){
      const v = attrs[k];
      el.setAttribute(k, v);
    }

    children.forEach((child)=>{
      if(typeof child === "string"){
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
