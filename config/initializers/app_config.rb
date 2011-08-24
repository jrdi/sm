module AppConfig

  def self.[](*args)
    args.inject(CONFIG) { |hash, arg| hash[arg] || ENV[arg.to_s.upcase] }
  end

  def self.method_missing(method, *args)
    self[method, *args]
  end
  
  if Rails.env != 'production'
    raw_config = File.read("#{Rails.root}/config/application.yml")
    erb_config = ERB.new(raw_config).result
    yaml = YAML.load(erb_config)[Rails.env]

    CONFIG = HashWithIndifferentAccess.new(yaml).freeze
  else
    CONFIG = {}
  end

end