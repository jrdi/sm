# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrant::Config.run do |config|
#   # Setup the box
#   config.vm.box_url = 'http://files.vagrantup.com/precise64.box'
#   config.vm.box     = "crisalix-dev-box"

#   config.vm.network :hostonly, "33.33.33.10"

#   config.vm.provision :shell, :inline => "sudo mkdir -p /var/www"
#   config.vm.share_folder("apps", "/var/www", "..")
  
#   # config.vm.provision :puppet do |puppet|
#   #   puppet.manifests_path = "puppet/manifests"
#   #   puppet.module_path    = "puppet/modules"
#   #   puppet.manifest_file  = "base.pp"
#   #   # puppet.options        = %w[ --debug --verbose --summarize ]
#   # end

#   # config.vm.customize ["modifyvm", :id, "--memory", "512"]
# end

Vagrant::Config.run do |config|
  config.vm.box     = "dev-box"
  config.vm.box_url = "http://dl.dropbox.com/u/1906634/heroku.box"

  config.vm.network :hostonly, "33.33.33.10"

  config.vm.provision :shell, :inline => "sudo mkdir -p /var/www"
  config.vm.share_folder("apps", "/var/www", "..")
end