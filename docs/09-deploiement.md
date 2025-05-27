# 09 - Déploiement & environnement

- **Développement local** :
  - `pnpm dev` ou `npm run dev` pour lancer le serveur local
  - Variables d'environnement dans `.env`
- **Déploiement** :
  - Plateforme recommandée : Vercel
  - Configuration automatique via `next.config.ts`
  - Assets statiques dans `public/`
- **CI/CD** :
  - Déploiement continu possible via GitHub + Vercel
- **Production** :
  - Optimisation des images, minification, lazy loading
  - Monitoring recommandé (Vercel Analytics, Sentry, etc.)
