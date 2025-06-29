import React from 'react'
import { Download, Share2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const PrivacyPolicyPage = () => {
  return (
    <section className='py-32'>
      <div className='container grid gap-12 md:grid-cols-12 md:gap-8'>
        <div className='order-last md:order-none md:col-span-4 lg:col-span-3'>
          <aside className='top-32 md:sticky'>
            <div className='mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm'>
              <div className='border-b border-border bg-muted/50 px-5 py-4'>
                <h3 className='flex items-center text-sm font-semibold'>
                  <Share2 className='mr-2.5 size-3.5 text-muted-foreground' />
                  Partager cette page
                </h3>
              </div>
              <div className='p-5'>
                <div className='mb-4 flex flex-wrap gap-2'>
                  <Badge variant='outline' className='rounded-md'>
                    Confidentialité
                  </Badge>
                  <Badge variant='outline' className='rounded-md'>
                    Données
                  </Badge>
                  <Badge variant='outline' className='rounded-md'>
                    Sécurité
                  </Badge>
                </div>
                <ul className='flex items-center gap-2'>
                  <li>
                    <a
                      href='#'
                      className='flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors hover:bg-muted'
                      aria-label='Share on Instagram'
                    >
                      <Image
                        width={0}
                        height={0}
                        src='https://shadcnblocks.com/images/block/logos/instagram-icon.svg'
                        alt='Instagram'
                        className='size-5'
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors hover:bg-muted'
                      aria-label='Share on LinkedIn'
                    >
                      <Image
                        width={0}
                        height={0}
                        src='https://shadcnblocks.com/images/block/logos/linkedin-icon.svg'
                        alt='LinkedIn'
                        className='size-5'
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors hover:bg-muted'
                      aria-label='Share on Product Hunt'
                    >
                      <Image
                        width={0}
                        height={0}
                        src='https://shadcnblocks.com/images/block/logos/producthunt-icon.svg'
                        alt='Product Hunt'
                        className='size-5'
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors hover:bg-muted'
                      aria-label='Share on Twitter'
                    >
                      <Image
                        width={0}
                        height={0}
                        src='https://shadcnblocks.com/images/block/logos/twitter-icon.svg'
                        alt='Twitter'
                        className='size-5'
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className='overflow-hidden rounded-lg border border-border bg-card shadow-sm'>
              <div className='border-b border-border bg-muted/50 px-5 py-4'>
                <h3 className='flex items-center text-sm font-semibold'>
                  <Download className='mr-2.5 size-3.5 text-muted-foreground' />
                  Options de Téléchargement
                </h3>
              </div>
              <div className='p-5'>
                <div className='space-y-4'>
                  <p className='text-sm text-muted-foreground'>
                    Vous souhaitez conserver une copie ? Téléchargez notre
                    politique de confidentialité.
                  </p>
                  <div className='flex flex-col space-y-2'>
                    <Button
                      className='w-full justify-between'
                      variant='default'
                    >
                      Format PDF
                      <Download className='ml-2 size-4' />
                    </Button>
                    <Button
                      className='w-full justify-between'
                      variant='outline'
                    >
                      Version Imprimable
                      <Download className='ml-2 size-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className='md:col-span-7 md:col-start-5 lg:col-start-6'>
          <article className='prose prose-sm'>
            <h1>Politique de Confidentialité de LNfoot</h1>
            <p>
              Notre web média de sport s’engage à protéger la confidentialité et
              la sécurité des données personnelles de nos utilisateurs. Cette
              politique de confidentialité décrit comment nous collectons,
              utilisons et protégeons vos données personnelles.
            </p>
            <h2>Données Collectées</h2>
            <p>Nous collectons les données suivantes :</p>
            <ul>
              <li>
                Informations d’inscription (nom, prénom, adresse e-mail, mot de
                passe)
              </li>
              <li>
                Informations de navigation (adresse IP, type de navigateur,
                pages visitées)
              </li>
              <li>
                Informations de connexion (cookies, identifiants de session)
              </li>
            </ul>
            <h2>Utilisation des Données</h2>
            <p>Nous utilisons vos données pour :</p>
            <ul>
              <li>Fournir des contenus et des services personnalisés</li>
              <li>Améliorer notre site web et nos services</li>
              <li>
                Vous envoyer des newsletters et des informations sur nos
                contenus et services
              </li>
              <li>Répondre à vos questions et demandes</li>
            </ul>
            <h2>Partage de Données</h2>
            <p>Nous partageons vos données avec :</p>
            <ul>
              <li>Nos partenaires et annonceurs pour des publicités ciblées</li>
              <li>
                Nos prestataires de services pour le traitement des données
              </li>
              <li>Les autorités compétentes en cas de demande légale</li>
            </ul>
            <h2>Sécurité des Données</h2>
            <p>
              Nous prenons des mesures pour protéger vos données, notamment :
            </p>
            <ul>
              <li>Chiffrement des données</li>
              <li>
                Utilisation de protocoles de sécurité pour les transactions en
                ligne
              </li>
              <li>Mise à jour régulière de nos systèmes et logiciels</li>
            </ul>
            <h2>Vos Droits</h2>
            <p>Vous avez le droit de :</p>
            <ul>
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données personnelles</li>
              <li>Supprimer vos données personnelles</li>
              <li>Limiter le traitement de vos données personnelles</li>
            </ul>
            <h2>Contact</h2>
            <p>
              Si vous avez des questions ou des préoccupations concernant notre
              politique de confidentialité, veuillez nous contacter à{' '}
              <a href='mailto:luvnationagency2@gmail.com'>
                luvnationagency2@gmail.com
              </a>
              .
            </p>
            <h2>Modification de la Politique</h2>
            <p>
              Nous pouvons modifier cette politique de confidentialité à tout
              moment. Nous vous informerons de tout changement important.
            </p>
            <h2>Consentement</h2>
            <p>
              En utilisant notre site web, vous consentez à notre politique de
              confidentialité.
            </p>
            <h2>Extension de la Politique</h2>
            <p>
              Cette politique de confidentialité s’applique également à notre
              boutique en ligne, y compris toutes les interactions d’achat, de
              livraison et de paiement effectuées sur notre plateforme.
            </p>
            <h3>Données liées aux transactions</h3>
            <ul>
              <li>
                Informations de paiement (mode de paiement, détails partiels de
                la carte)
              </li>
              <li>Adresse de livraison et de facturation</li>
              <li>Historique des commandes</li>
            </ul>
            <h3>Utilisation des données (e-commerce)</h3>
            <ul>
              <li>Traiter vos commandes et paiements</li>
              <li>Assurer la livraison et le suivi des commandes</li>
              <li>Gérer le service client après-vente</li>
            </ul>
            <h3>Cookies marketing</h3>
            <p>
              Nous utilisons des cookies pour suivre le comportement d’achat et
              vous proposer des offres personnalisées.
            </p>
            <h3>Sécurité des paiements</h3>
            <p>
              Les transactions de paiement sont sécurisées via des prestataires
              certifiés (ex : SSL, prestataires de paiement reconnus).
            </p>
            <h3>Lien vers les CGV/CGU</h3>
            <p>
              Cette politique est complémentaire à nos Conditions Générales de
              Vente ou d’Utilisation disponibles sur notre site.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicyPage
