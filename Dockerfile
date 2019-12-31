FROM nginx:1.17
LABEL maintainer="tommymay37@gmail.com"

RUN rm -rf /usr/share/nginx/html/*
COPY public/ /usr/share/nginx/html
COPY docker-config/default.conf /etc/nginx/conf.d/default.conf
