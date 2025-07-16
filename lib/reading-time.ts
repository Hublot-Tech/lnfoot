/**
 * Calcule le temps de lecture approximatif d'un contenu texte
 * 
 * @param content - Le contenu HTML ou texte à analyser
 * @param wordsPerMinute - Le nombre de mots par minute (par défaut 200)
 * @returns Le temps de lecture estimé en minutes
 */
export function calculateReadingTime(content: string | null | undefined, wordsPerMinute = 200): number {
  if (!content) return 0;

  // Nettoyer le HTML pour obtenir uniquement le texte
  const text = content.replace(/<[^>]*>/g, '');
  
  // Compter approximativement le nombre de mots
  const words = text.trim().split(/\s+/).length;
  
  // Calculer le temps en minutes
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return minutes || 1; // Retourner au moins 1 minute
}

/**
 * Formate le temps de lecture pour l'affichage
 * 
 * @param minutes - Le temps de lecture en minutes
 * @returns Une chaîne formatée (ex: "3 min de lecture")
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min${minutes > 1 ? 's' : ''} de lecture`;
}
