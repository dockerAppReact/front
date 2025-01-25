# Étape de construction (builder)
FROM node:20.10.0-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer toutes les dépendances (y compris celles de dev pour construire le projet)
RUN npm install

# Copier tout le reste des fichiers source
COPY . .

# Compiler l'application avec Vite
RUN npm run build

# Étape d'exécution (runner)
FROM node:20.10.0-alpine AS runner

# Définir le répertoire de travail pour l'exécution
WORKDIR /app

# Copier le dossier `dist` (résultat du build) depuis l'étape builder
COPY --from=builder /app/dist ./dist

# Copier uniquement les dépendances nécessaires pour exécuter le serveur
COPY --from=builder /app/package-lock.json package-lock.json
COPY --from=builder /app/package.json package.json

# Installer les dépendances de production uniquement
RUN npm ci --production

# Nettoyer le cache npm
RUN npm cache clean --force

# Configurer l'environnement en production
ENV NODE_ENV=production

# Exposer le port utilisé par Vite
EXPOSE 5173

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
