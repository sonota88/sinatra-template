class Page {
  init(){
    puts("init");
    __g.api_v2("get", "/api/sample", { a: 123 }, (result)=>{
      __g.unguard();
      puts(result);
    }, (errors)=>{
      __g.unguard();
      __g.printApiErrors(errors);
      alert("Check console.");
    });
  }
}

__g.ready(new Page());
