FROM nginx:latest

COPY ./nginx.conf /etc/nginx/

COPY ./prod.conf /etc/nginx/conf.d/prod.conf

COPY ./cert.pem /etc/nginx/ssl/

COPY ./key.pem /etc/nginx/ssl/