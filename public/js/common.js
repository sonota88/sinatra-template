function puts(... args){
  console.log.apply(console, args);
}

const __g = {
  api: function(method, path, data, fnOk, fnNg){
    var _data = {
      _method: method.toUpperCase()
      ,json: JSON.stringify(data)
    };
    $.post(path, _data, (data)=>{
      if(data.errors.length > 0){
        fnNg(data.errors);
      }
      fnOk(data.result);
    });
  }
};
