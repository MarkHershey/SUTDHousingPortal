# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

# RUN npm run test -- --browsers ChromeHeadlessNoSandbox --watch=false

# ARG configuration=production

RUN npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

# copy built files to nginx dir
COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build-stage /app/nginx/api_route.conf /etc/nginx/extra-conf.d/api_route.conf