const h = VDom.h;

class View {
  static render(state){
    return (
      h("div", {}
      , h("button", {}, "OK")
      , h("input", { type: "checkbox" })
      , h("a", { href: "#" }, "link " + state.val)
      , h("button", {
            onclick: ()=>{ __p.onclick_reloadLibs(); }
          }
        , "reload libs"
        )
      , new VDom.RawHtmlVNode('aa <em>em</em> bb <span onclick="alert(123)">click</span>')

      , h("hr")

      , h("h2", {}, "select + option")
      , MySelect.render(
          [
            { value: 1, text: "option 1" }
          , { value: 2, text: "option 2" }
          ]
        , {
            selected: state.optionId
          , onchange: (ev)=>{ __p.onchange_myselect(ev); }
          }
        )

      , h("h2", {}, "radio")
      , MyRadioGroup.render(
          "myradiobuttons_sample"
        , [
            { value: 1, text: "item 1" }
          , { value: 2, text: "item 2" }
          ]
        , {
            selected: state.optionId
          , onchange: (ev)=>{
              __p.onchange_myRadioGroup(ev);
            }
          }
        )

      , h("h2", {}, "checkbox")
      , MyCheckboxGroup.render(
          "mycheckboxgroup_sample"
        , [
            { value: 1, text: "item 1" }
          , { value: 2, text: "item 2" }
          , { value: 3, text: "item 3" }
          ]
        , {
            selected: state.checkedIds
          , onchange: (ev)=>{
              __p.onchange_myCheckboxGroup(ev);
            }
          }
        )

      , h("h2", {}, "toggle")
      , MyToggleCheckbox.render(
          state.toggle
        , "{text}"
        , (ev)=>{
            __p.onchange_myToggleCheckbox(ev);
          }
        )

      )
    );
  }
}

class Page extends VDom.App {
  constructor(sel){
    super(Page.render.bind(Page), sel);

    this.state = {
      optionId: 2,
      checkedIds: [1, 3],
      toggle: true
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

      this.update();

    }, (errors)=>{
      __g.unguard();
      __g.printApiErrors(errors);
      alert("Check console.");
    });
  }

  static render(){
    return View.render(__p.state);
  }

  onchange_myselect(ev){
    this.state.optionId = MySelect.getValueAsInt(ev);
    puts("optionId => " + this.state.optionId);
    this.update();
  }

  onchange_myRadioGroup(ev){
    this.state.optionId = MyRadioGroup.getValueAsInt(ev);
    puts("optionId => " + this.state.optionId);
    this.update();
  }

  onchange_myCheckboxGroup(ev){
    this.state.checkedIds = MyCheckboxGroup.getValuesAsInt(ev);
    puts("checkedIds => ", this.state.checkedIds);
    this.update();
  }

  onchange_myToggleCheckbox(ev){
    this.state.toggle = MyToggleCheckbox.isChecked(ev);
    puts("toggle => " + this.state.toggle);
    this.update();
  }
}

__g.ready(new Page("#main_container"));
