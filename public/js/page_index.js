let __p = {
  init(){
    puts("init");
    __g.api("get", "/api/sample", { a: 123 }, (result)=>{
      __g.unguard();
      puts(result);
    }, (errors)=>{
      __g.unguard();
      puts(errors);
    });
  }
};

$(__p.init);
