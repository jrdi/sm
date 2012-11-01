# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|
  config.vm.box     = "dev-box"
  config.vm.box_url = "http://dl.dropbox.com/u/1906634/heroku.box"

  config.vm.network :hostonly, "33.33.33.10"

  config.vm.customize ["modifyvm", :id, "--memory", "512"]
end