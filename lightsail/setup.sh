cd ~
git init --bare repo.git
git clone repo.git ./checkout
mkdir -p checkout/docroot
sudo rm -rf /opt/bitnami/apache2/htdocs
sudo ln -s ~/checkout/docroot /opt/bitnami/apache2/htdocs
