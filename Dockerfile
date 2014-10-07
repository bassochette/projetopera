# DOCKER-VERSION 1.1.1
FROM ubuntu:14.04
MAINTAINER julien Prugne <julien.prugne@gmail.com>

ADD . /src
WORKDIR /src

#install merdier
RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install npm -y

#
RUN npm install grunt-cli -g
RUN npm install bower -g
RUN npm install microscope -g

RUN npm install
RUN bower install
RUN grunt build

#port
EXPOSE 3000
CMD["node", "/src/apps.js"]
