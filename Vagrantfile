
Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/xenial64"
    config.vm.provision :shell, path: "travel.sh"
    config.vm.network :forwarded_port, guest: 3000, host: 8080

end
