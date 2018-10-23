require "sinatra"
require "sinatra/reloader"
set :method_override, true

require "pp"
require "json"

require "./lib/erb_context"

# set :bind, '0.0.0.0'
# set :port, 4567

def puts_e(*args)
  args.each{|arg| $stderr.puts arg }
end

def p_e(*args)
  args.each{|arg| $stderr.puts arg.inspect }
end

def pp_e(*args)
  args.each{|arg| $stderr.puts arg.pretty_inspect }
end

def _render name, context
  body = File.read(File.join("views", name + ".html"))
  header = File.read("views/_header.html")
  footer = File.read("views/_footer.html")
  ErbContext.render header + body + footer, context
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
  _render "index", { x: 123 }
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
