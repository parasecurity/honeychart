# HoneyChart
> HoneyChart is an automation tool for generating helm chart of certain open source honeypots, through a web UI.
In details, HoneyChart uses a friendly user interface, that saves the user from all the hustle to write a custom helm chart or yaml files to deploy his honeypots in his Kubernetes cluster. User only needs to specify the honeypots and the services that the honeypots will expose and after that a helm chart, ready for deployment will get downloaded in his web browser.

Quick Jump: [Installation](#installation) | [Run](#run) | [Paper](#paper) | [Citing](#Citing)

## Who should be interested?
HoneyChart, is perfect for people that want to easily and fast deploy honeypots to their kubernetes cluster.

## Installation
To run HoneyChart you will need linux, node.js, npm and helm.
After install npm and node.js use the following commants to install and run honeychart.

```sh
sudo snap install helm --classic
git clone https://github.com/parasecurity/honeychart/
cd honeychart
npm i 
```

## Run 

To run HoneyChart just run the following command after the installation of the necessary dependencies.
 
```sh
cd honeychart
node server.js
```

## Paper 

You can view the publication related to this repo on the following link(_to be added_).

## Citing

Consider citing the following paper:
```
TO BE ADDED
```
