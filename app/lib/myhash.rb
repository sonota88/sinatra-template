class Myhash

  def initialize(hash)
    @h = hash
  end

  def to_plain
    new_h = {}

    @h.each{|k, v|
      v2 =
        if v.is_a? Myhash
          v.to_plain
        else
          v
        end
      new_h[k] = v2
    }

    new_h
  end

  def to_sym_key()
    new_h = {}

    @h.each do |k, v|
      _v =
        if v.is_a? Hash
          to_sym_key(v)
        else
          v
        end

      _k =
        if k.is_a? String
          k.to_sym
        else
          k
        end

      new_h[_k] = _v
    end

    Myhash.new(new_h)
  end

  def self.to_sym_key(hash)
    Myhash.new(hash)
      .to_sym_key
      .to_plain
  end

  # to snake case
  def self._to_snake(arg)
    is_sym = arg.is_a?(Symbol)

    s = is_sym ? arg.to_s : arg

    new_s = s.chars
      .map do |c|
        if /^[A-Z]$/ =~ c
          "_" + c.downcase
        else
          c
        end
      end
      .join("")

    is_sym ? new_s.to_sym : new_s
  end

  def to_snake
    new_h = {}
    @h.each{|k, v|
      new_k = Myhash._to_snake(k.to_s)

      new_v =
        if v.is_a? Hash
          Myhash.new(v).to_snake
        else
          v
        end

      new_h[new_k] = new_v
    }

    Myhash.new(new_h)
  end

end
