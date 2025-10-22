function puts(... args) {
  console.log.apply(console, args);
}

const __g = {
  qs: (sel, base = document) => {
    return base.querySelector(sel);
  },

  qsa: (sel, base = document) => {
    return base.querySelectorAll(sel);
  },

  /** deprecated */
  api: function(method, path, data, fnOk, fnNg) {
    var _data = {
      _method: method.toUpperCase()
      ,_params: JSON.stringify(data)
    };
    $.post(path, _data, (data)=>{
      if (data.errors.length > 0) {
        fnNg(data.errors);
        return;
      }
      fnOk(data.result);
    });
  },

  /** deprecated */
  api_v2: (method, path, data, fnOk, fnNg)=>{
    const req = new Request(path);

    const fd = new FormData();
    fd.append("_method", method.toUpperCase());
    fd.append("_params", JSON.stringify(data));

    fetch(req, {
      method: 'POST',
      body: fd,
      credentials: 'include', // cookie をリクエストに含める
    }).then((res)=>{
      if (res.ok) {
        puts("res.ok == true", res);
      } else {
        puts("res.ok != true", res);
      }
      return res.json();
    }).then((resData)=>{
      if (resData.errors.length > 0) {
        fnNg(resData.errors);
        return;
      }
      fnOk(resData.result);
    }).catch((err)=>{
      puts(err);
    });
  },

  async_api_v1: async (method, path, data)=>{
    const req = new Request(path);

    const fd = new FormData();
    fd.append("_method", method.toUpperCase());
    fd.append("_params", JSON.stringify(data));

    return fetch(
      req,
      {
        method: 'POST',
        body: fd,
        credentials: 'include', // cookie をリクエストに含める
      }
    )
      .then((resp)=>{
        if (resp.ok) {
          puts("resp.ok == true", resp);
        } else {
          puts("resp.ok != true", resp);
        }
        return resp.json();
      })
      .then((resp)=>{
        puts(81, resp);
        if (resp.errors.length === 0) {
          // ok
          return resp.result;
        } else {
          throw resp.errors;
        }
      })
    ;
  },

  guard: ()=>{
    $("#guard_layer").show();
  },

  unguard: ()=>{
    setTimeout(()=>{
      $("#guard_layer").fadeOut(100);
    }, 100);
  },

  printApiErrors: (es)=>{
    es.forEach((e, i)=>{
      puts(`-------- error ${i} --------`);
      puts(e.trace.split("\n").reverse().join("\n"));
      puts(e.msg);
    });
  },

  ready: (page)=>{
    window.__p = page;
    document.addEventListener("DOMContentLoaded", async ()=>{
      await page.init();
      document.title = page.getTitle() + " | {app_name}";
    });
  },

  pad2: (n)=>{
    return (n < 10 ? "0" : "") + n;
  },

  _debounceMap: {}, // fn => timer
  debounce: (fn, msec) => {
    if (__g._debounceMap[fn] != null) {
      clearTimeout(__g._debounceMap[fn]);
    }

    __g._debounceMap[fn] = setTimeout(
      ()=>{
        fn();
        __g._debounceMap[fn] = null;
      },
      msec
    );
  },

  refreshInputStyle: () => {
    const inputs = document.querySelectorAll("input[type=radio], input[type=checkbox]");
    inputs.forEach(input => {
      if (input.parentNode.tagName === "LABEL") {
        input.parentNode.classList.remove("container_label_selected");
        if (input.checked) {
          input.parentNode.classList.add("container_label_selected");
        }
      }
    });
  }

};
