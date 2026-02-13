FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY app/ /usr/share/nginx/html/app/
COPY bower_components/ /usr/share/nginx/html/bower_components/
COPY images/ /usr/share/nginx/html/images/
COPY node_modules/ /usr/share/nginx/html/node_modules/

EXPOSE 80
