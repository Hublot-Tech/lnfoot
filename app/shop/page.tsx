import React, { Suspense } from 'react'
import { apiClient } from '@/app/api/api-client'
import Hero from '@/components/shop/hero'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { EcommerceArticle } from '../api/types'
import { ShopGridSkeleton } from '@/components/ui/skeletons'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos articles',
}

export default function ShopPage() {
  const cats = [
    { label: 'Maillots', imageSrc: '/maillots.jpg' },
    { label: 'Équipement', imageSrc: '/alteres.jpg' },
    { label: 'Godasses', imageSrc: '/godasses.png' },
  ]
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <Hero />
      {/* Featured Categories */}
      <section className='py-16 bg-gray-50' id='categories'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Catégories Populaires
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {cats.map((category) => (
              <div
                key={category.label}
                className='relative h-80 group cursor-pointer overflow-hidden rounded-2xl'
              >
                <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10' />
                <Image
                  fill
                  src={category.imageSrc}
                  alt={category.label}
                  className='transform group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute inset-0 flex items-center justify-center z-20'>
                  <h3 className='text-2xl font-bold text-white'>
                    {category.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className='py-16' id='featured'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center mb-12'>
            <h2 className='text-3xl font-bold'>Produits Populaires</h2>
            <Button variant='outline' asChild>
              <Link href='/shop/all'>Voir tout</Link>
            </Button>
          </div>
          <Suspense fallback={<ShopGridSkeleton count={8} />}>
            <FeaturedProducts />
          </Suspense>{' '}
        </div>
      </section>
      {/* Benefits Section */}
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Livraison Gratuite',
                description: 'Pour toute commande supérieure à 50€',
                icon: '🚚',
              },
              {
                title: 'Paiement Sécurisé',
                description: 'Transactions 100% sécurisées',
                icon: '🔒',
              },
              {
                title: 'Support Client 24/7',
                description: 'Nous sommes là pour vous aider',
                icon: '💬',
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className='flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm'
              >
                <span className='text-4xl mb-4'>{benefit.icon}</span>
                <h3 className='text-xl font-semibold mb-2'>{benefit.title}</h3>
                <p className='text-gray-600'>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className='py-16 bg-black text-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-2xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-4'>Restez informé</h2>
            <p className='mb-8 text-gray-300'>
              Inscrivez-vous à notre newsletter pour recevoir nos dernières
              offres et nouveautés
            </p>
            <form className='flex gap-4 max-w-md mx-auto'>
              <input
                type='email'
                placeholder='Votre email'
                className='flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
              />
              <Button className='bg-orange-500 hover:bg-orange-600'>
                S&apos;inscrire
              </Button>
            </form>
          </div>
        </div>
      </section>{' '}
    </div>
  )
}

async function FeaturedProducts() {
  const products = await apiClient.ecommerceArticles.findAll()

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {products.slice(0, 8).map((product: EcommerceArticle) => (
        <Card key={product.id} className='group'>
          <Link href={`/shop/${product.id}`}>
            <div className='relative aspect-square overflow-hidden'>
              <Image
                fill
                src={product.imageUrl || '/placeholder.svg'}
                alt={product.name ?? ''}
                className='transform group-hover:scale-105 transition-transform duration-300'
              />
              {product.price && (
                <Badge className='absolute top-4 right-4 bg-black text-white'>
                  {product.price}XAF
                </Badge>
              )}
            </div>
            <div className='p-4'>
              <h3 className='font-semibold mb-2 group-hover:text-orange-500 transition-colors'>
                {product.name}
              </h3>
              <p className='text-sm text-gray-600 line-clamp-2'>
                {product.description || 'Aucune description disponible'}
              </p>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}
