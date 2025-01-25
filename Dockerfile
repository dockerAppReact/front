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

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
