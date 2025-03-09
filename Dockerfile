# Use Nginx to serve the static files
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy your frontend source code
COPY . .  

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
