let __p = {
  init(){
    puts("init");
    __g.api("get", "/api/sample", { a: 123 }, (result)=>{
      puts(result);
    }, (errors)=>{
      puts(errors);
    });
  }
};

$(__p.init);
