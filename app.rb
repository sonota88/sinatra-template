require "sinatra"
require "sinatra/contrib"

require "./lib/erb_context"

def _render name, context
  template_path = File.join("views", name + ".html")
  ErbContext.render File.read(template_path), context
end

get "/" do
  _render "index", {}
end
