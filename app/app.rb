require "sinatra"
if settings.development?
  require "sinatra/reloader"
end
set :method_override, true

require "pp"
require "json"

require "./lib/erb_context"

$PROFILE =
  if settings.production?
    :prod
  elsif settings.development?
    :devel
  elsif settings.test?
    :test
  else
    raise "something wrong"
  end

# set :port, 4567

# if $PROFILE == :devel
#   set :bind, '0.0.0.0'
# end

# server_settings = {}
# if $PROFILE == :devel
#   server_settings[:DoNotReverseLookup] = true
# end
# set :server_settings, server_settings


def puts_e(*args)
  args.each{|arg| $stderr.puts arg }
end

def p_e(*args)
  args.each{|arg| $stderr.puts arg.inspect }
end

def pp_e(*args)
  args.each{|arg| $stderr.puts arg.pretty_inspect }
end

$TEMPLATE_CACHE = {}

def load_template(name)
  puts_e "load_template (#{name})"

  body = File.read(File.join("views", name + ".html"))
  header = File.read("views/_header.html")
  footer = File.read("views/_footer.html")

  $TEMPLATE_CACHE[name] = ERB.new(header + body + footer)
end

def _render(name, context)
  if $PROFILE == :prod
    if $TEMPLATE_CACHE.has_key?(name)
      ;
    else
      load_template(name)
    end
  else
    load_template(name)
  end

  erb = $TEMPLATE_CACHE[name]
  erb.result ErbContext.hash_to_binding(context)
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
  puts_e "development? (#{ settings.development? })"
  puts_e "production? (#{ settings.production? })"
  puts_e "test? (#{ settings.test? })"
  puts_e "$PROFILE (#{ $PROFILE })"

  _render "index", { x: 123 }
end

# ruby - Sinatra - terminate server from request - Stack Overflow
# https://stackoverflow.com/questions/19523889/sinatra-terminate-server-from-request
get "/shutdown" do
  if $PROFILE == :devel
    self_pid = Process.pid
    puts_e "shutdown ... (#{self_pid})"
    Thread.new do
      sleep 1
      Process.kill(:KILL, self_pid)
    end
    halt "bye\n"
  else
    "invalid operation"
  end
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
