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

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
        xz-utils \
    && NODE_VERSION=20.19.4 \
    && curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-arm64.tar.xz" \
        -o /tmp/node.tar.xz \
    && tar -xJf /tmp/node.tar.xz -C /usr/local --strip-components=1 \
    && rm -f /tmp/node.tar.xz \
    && rm -rf /var/lib/apt/lists/*

COPY --from=api-build /app/target/*.jar ./app.jar

COPY --from=frontend-build /app/.next/standalone ./
COPY --from=frontend-build /app/.next/static ./.next/static
COPY --from=frontend-build /app/public ./public

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

EXPOSE 8888
EXPOSE 3000

COPY <<'EOF' /start.sh
#!/bin/sh

set -e

java -jar /app/app.jar &
API_PID=$!

PORT=3000 node /app/server.js &
FRONTEND_PID=$!

cleanup() {
    kill "$API_PID" "$FRONTEND_PID" 2>/dev/null || true
    wait "$API_PID" "$FRONTEND_PID" 2>/dev/null || true
}

trap cleanup INT TERM

while true; do
    if ! kill -0 "$API_PID" 2>/dev/null; then
        cleanup
        exit 1
    fi

    if ! kill -0 "$FRONTEND_PID" 2>/dev/null; then
        cleanup
        exit 1
    fi

    sleep 2
done
EOF

RUN chmod +x /start.sh

CMD ["/start.sh"]