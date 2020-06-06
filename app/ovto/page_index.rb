# coding: utf-8
require "ovto"
require "common"

$g = Common.new

class Index < Ovto::App
  class State < Ovto::State
    item :x, default: 0
  end

  class Actions < Ovto::Actions
    def set_x(state:, value:)
      { x: value }
    end
  end

  class MainComponent < Ovto::Component
    def render(state:)
      o "div" do
        o "h1", state.x
      end
    end
  end

  def setup
    _params = {
      fooBar: 123, b: { c: 456 }
    }

    Ovto.fetch("/api/sample", "POST", {
                     _method: "GET",
                     _params: _params.to_json
                   })
    .then{ |data|
      $g.unguard()

      result = data[:result]

      _puts result.to_json

      actions.set_x(value: result[:x])
    }
    .fail{ |e|
      _puts e
    }
  end
end

# --------------------------------

Index.run(id: "ovto")
