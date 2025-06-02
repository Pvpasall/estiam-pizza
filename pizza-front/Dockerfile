# Dockerfile pour le frontend React
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances avec le fix React Native
RUN npm install --legacy-peer-deps

# Copier tout le code source
COPY . .

EXPOSE 5173

# Démarrer Vite en mode développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]