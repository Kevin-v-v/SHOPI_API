FROM nginx:latest

COPY ./nginx.conf /etc/nginx/

COPY ./prod.conf.template /etc/nginx/conf.d/prod.conf.template

COPY ./cert.pem /etc/nginx/ssl/

COPY ./key.pem /etc/nginx/ssl/

CMD [ 'envsubst' '<' '/etc/nginx/conf.d/prod.conf.template' '>' '/etc/nginx/conf.d/default.conf' '&&' 'nginx' '-g' 'daemon' 'off;']