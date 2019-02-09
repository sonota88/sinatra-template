class View {
  static render(state){
    return TreeBuilder.build(h =>
      h("div", {}
      , h("button", {}, "OK")
      , h("input", { type: "checkbox" })
      , h("a", { href: "#" }, "link " + state.val)
      , h("button", {
            onclick: ()=>{ __p.onclick_reloadLibs(); }
          }
        , "reload libs"
        )
      , TreeBuilder.buildRawHtml('aa <em>em</em> bb <span onclick="alert(123)">click</span>')
      )
    );
  }
}

class Page {
  constructor(){
    this.state = {};
  }

  getTitle(){
    return "sinatra-skelton";
  }

  onclick_reloadLibs(){
    __g.api_v2("get", "/api/reload_libs", {}, (result)=>{
      __g.unguard();
    }, (errors)=>{
      __g.unguard();
      __g.printApiErrors(errors);
      alert("Check console.");
    });
  }

  init(){
    puts("init");
    __g.api_v2("get", "/api/sample", {
        fooBar: 123, b: { c: 456 }
      }, (result)=>{
      __g.unguard();
      puts(result);
      Object.assign(this.state, result);

      this.render();

    }, (errors)=>{
      __g.unguard();
      __g.printApiErrors(errors);
      alert("Check console.");
    });
  }

  render(){
    $("#tree_builder_container")
      .empty()
      .append(View.render({ val: 234 }));
  }
}

__g.ready(new Page());
