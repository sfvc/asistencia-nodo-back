# Etapa 1: Build
FROM node:22.14.0-slim AS builder

 agregar las variables de entorno necesarias para Prisma y NestJS
ARG DATABASE_URL
ARG JWT_SECRET
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

WORKDIR /app

# Instalar dependencias necesarias para build (como prisma)
RUN apt-get update -y && apt-get install -y openssl

# Copiar package.json e instalar TODAS las dependencias (incluyendo dev)
COPY package.json package-lock.json* ./
RUN npm install -g npm@11.2.0
RUN npm install

# Copiar el resto del código
COPY . .

# Generar Prisma Client y compilar NestJS
RUN npx prisma generate
RUN npm run build

# Etapa 2: Producción
FROM node:22.14.0-slim

# Copiar las variables de entorno necesarias para Prisma y NestJS
ARG DATABASE_URL
ARG JWT_SECRET
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

WORKDIR /app

# Solo instalar dependencias de producción
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copiar build y Prisma Client generado
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

CMD ["node", "dist/src/main.js"]

