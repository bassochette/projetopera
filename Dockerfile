FROM node
MAINTAINER julien Prugne <julien.prugne@gmail.com>

ADD . /demopera
WORKDIR /demopera


#install dep
RUN npm install
RUN npm install grunt-cli -g 
RUN npm install bower -g
RUN bower install --allow-root
RUN grunt build

#port
EXPOSE 3000

CMD grunt debug
