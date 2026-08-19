FROM eclipse-temurin:17-jdk AS api-build
WORKDIR /app
COPY api/v2/ .
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre AS api
WORKDIR /app
COPY --from=api-build /app/target/*.jar app.jar
EXPOSE 8888
ENTRYPOINT ["java", "-jar", "app.jar"]

FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY public/package.json public/package-lock.json ./
RUN npm ci
COPY public/ .
RUN npm run build

FROM node:20-alpine AS frontend
WORKDIR /app
COPY --from=frontend-build /app/.next/standalone ./
COPY --from=frontend-build /app/.next/static ./.next/static
COPY --from=frontend-build /app/public ./public
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
