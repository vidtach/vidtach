# Install on AWS Lightsail
server=lightsail.server # or any other SSH alias you use
ssh $server 'bash -s' < lightsail/setup.sh
git remote add lightsail $server
git push -u lightsail master
ssh $server 'bash -s' < lightsail/deploy.sh

# Deploy on AWS Lightsail
ssh $server 'bash -s' < lightsail/deploy.sh
