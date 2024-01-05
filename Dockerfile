# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:12.18.2-alpine3.9 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
CMD npm start
#################
#FROM nginx:alpine
#COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
#RUN rm -rf /usr/share/nginx/html/*
#COPY --from=build-stage /app/build/ /usr/share/nginx/html
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
