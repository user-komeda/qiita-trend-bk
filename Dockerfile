FROM almalinux:minimal

RUN mkdir /app
WORKDIR /app

# Install packages needed to build gems 
RUN echo -e "[nodejs]\nname=nodejs\nstream=${NODEJS_VERSION}\nprofiles=\nstate=enabled\n" > /etc/dnf/modules.d/nodejs.module
RUN microdnf -y install nodejs
RUN npm install -g npm@10.8.1
COPY package.json ./
RUN npm install 
COPY ./ ./

CMD ["npm","run","start"]
