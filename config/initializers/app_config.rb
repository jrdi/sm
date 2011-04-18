module AppConfig

  def self.[](*args)
    args.inject(CONFIG) { |hash, arg| hash[arg] }
  end

  def self.method_missing(method, *args)
    self[method, *args]
  end

  raw_config = File.read("#{Rails.root}/config/application.yml")
  erb_config = ERB.new(raw_config).result
  yaml = YAML.load(erb_config)[Rails.env]

  CONFIG = HashWithIndifferentAccess.new(yaml).freeze

end