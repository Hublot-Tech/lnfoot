# 05 - API et intégrations

- **API interne** :
  - `/api/contact` : POST, gère l'envoi de messages via le formulaire de contact (validation, envoi d'emails via Resend)
  - `/api/*` : Endpoints pour actualités, scores, produits, highlights (utilisation de `apiClient`)
- **API externe** :
  - Produits : `https://api.ln-foot.com/api/products`
  - Scores/Highlights : Endpoints distants configurés dans `apiClient`
- **Gestion des emails** :
  - Utilisation de Resend pour l'envoi d'emails transactionnels (contact, confirmation, newsletter)
- **Utilitaires** :
  - `lib/readingTime.ts` : Calcul du temps de lecture
  - `lib/utilities.ts` : Formatage de date, gestion des URLs YouTube, etc.
