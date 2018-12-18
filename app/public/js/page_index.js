class View {
  static render(state){
    return TreeBuilder.build(h =>
      h("div", {}
      , h("button", {}, "OK")
      , h("input", { type: "checkbox" })
      , h("a", { href: "#" }, "link " + state.val)
      )
    );
  }
}

class Page {
  constructor(){
    this.state = {};
  }

  init(){
    puts("init");
    __g.api_v2("get", "/api/sample", { a: 123 }, (result)=>{
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
