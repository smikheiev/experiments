FROM node:20.11.1-bullseye-slim AS base

WORKDIR /app
COPY package.json package-lock.json ./

# Install all dependencies
FROM base AS all-deps
RUN npm ci --frozen-lockfile

# Setup production dependencies
FROM base AS production-deps
COPY --from=all-deps /app/node_modules /app/node_modules
RUN npm prune --production

# Build the app
FROM base AS build
COPY --from=all-deps /app/node_modules /app/node_modules
COPY . .
RUN npm run build

# Start the app
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=8080
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build

RUN useradd -m appuser
USER appuser

EXPOSE $PORT
CMD ["npm", "start"]
