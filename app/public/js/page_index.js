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
      , TreeBuilder.buildRawHtml(
          'aa <em>em</em> bb <span onclick="alert(123)">click</span>'
        )

      , h("hr")

      , h("h2", {}, "select + option")
      , MySelect.render(
          [
            { value: 1, label: "option 1" }
          , { value: 2, label: "option 2" }
          ]
        , {
            selected: state.optionId
          , onchange: (ev)=>{ __p.onchange_myselect(ev); }
          }
        )

      , h("h2", {}, "radio")
      , MyRadiobuttons.render(
          "myradiobuttons_sample"
        , [
            { value: 1, label: "item 1" }
          , { value: 2, label: "item 2" }
          ]
        , {
            checked: state.optionId
          , onchange: (ev)=>{
              __p.onchange_myRadiobuttons(ev);
            }
          }
        )

      , h("h2", {}, "checkbox")
      , MyCheckboxes.render(
          "mycheckboxes_sample"
        , [
            { value: 1, label: "item 1" }
          , { value: 2, label: "item 2" }
          , { value: 3, label: "item 3" }
          ]
        , {
            checked: state.checkedIds
          , onchange: (ev)=>{
              __p.onchange_myCheckboxes(ev);
            }
          }
        )

      )
    );
  }
}

class Page {
  constructor(){
    this.state = {
      optionId: 2,
      checkedIds: [1, 3]
    };
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
      .append(View.render(this.state));
  }

  onchange_myselect(ev){
    this.state.optionId = MySelect.getValueAsInt(ev);
    puts(this.state.optionId);
    this.render();
  }

  onchange_myRadiobuttons(ev){
    this.state.optionId = MyRadiobuttons.getValueAsInt(ev);
    puts(this.state.optionId);
    this.render();
  }

  onchange_myCheckboxes(ev){
    this.state.checkedIds = MyCheckboxes.getValuesAsInt(ev);
    puts(this.state.checkedIds);
    this.render();
  }
}

__g.ready(new Page());
