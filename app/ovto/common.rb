# coding: utf-8

def _puts(*args)
  `console.log.apply(console, args);`
end

class Common
  def to_json(data)
    Native(`JSON`).stringify(data)
  end

  def unguard
    %x{
      setTimeout(()=>{
        $("#guard_layer").fadeOut(100);
      }, 100);
    }
  end
end
