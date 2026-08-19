FROM eclipse-temurin:17-jdk AS api-build
WORKDIR /app
COPY api/v2/ .
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

FROM node:20-alpine AS frontend-build
WORKDIR /app
RUN apk add --no-cache git
COPY public/package.json public/package-lock.json ./
RUN npm ci
COPY public/ .
COPY .git/ .git/
RUN npm run build

FROM eclipse-temurin:17-jre
WORKDIR /app

RUN apk add --no-cache nodejs npm

COPY --from=api-build /app/target/*.jar app.jar
COPY --from=frontend-build /app/.next/standalone ./.next/standalone
COPY --from=frontend-build /app/.next/static ./.next/static
COPY --from=frontend-build /app/public ./public

ENV NODE_ENV=production

EXPOSE 8888
EXPOSE 3000

COPY <<EOF /start.sh
#!/bin/sh
echo "Starting API..."
java -jar /app/app.jar &

echo "Starting Frontend..."
PORT=3000 node ./.next/standalone/server.js &

wait
EOF

RUN chmod +x /start.sh
CMD ["/start.sh"]
