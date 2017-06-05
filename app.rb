require "sinatra"
require "sinatra/reloader"
set :method_override, true

require "json"

require "./lib/erb_context"

def _render name, context
  template_path = File.join("views", name + ".html")
  ErbContext.render File.read(template_path), context
end

get "/" do
  _render "index", {}
end

get "/api/sample" do
  content_type :json
  JSON.generate(
    {
      :errors => [],
      :result => {
        :aa => 321
      }
    }
  )
end
