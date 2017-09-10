require "sinatra"
require "sinatra/reloader"
set :method_override, true

require "json"

require "./lib/erb_context"

# set :bind, '0.0.0.0'
# set :port, 4567

def _render name, context
  template_path = File.join("views", name + ".html")
  ErbContext.render File.read(template_path), context
end

def _api(params)
  result = {}
  context = {
    :errors => []
  }

  begin
    api_params = JSON.parse(params[:_params])
    result = yield(api_params, context)
  rescue => e
    $stderr.puts e.class, e.message, e.backtrace
    context[:errors] << {
      :msg => "#{e.class}: #{e.message}",
      :trace => e.backtrace.join("\n")
    }
  end

  content_type :json
  JSON.generate({
    "errors" => context[:errors],
    "result" => result
  })
end

get "/" do
  redirect to("/my_app/")
end

get "/my_app/" do
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
