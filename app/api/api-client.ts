import {
  findFixtureById,
  findHighlightById,
  findLeagueById,
  findNewsArticleById,
  getAdvertisementById,
  getAllProducts,
  getLatestAdvertisements,
  getProductById,
  listFixtures,
  listHighlights,
  listLeagues,
  listNewsArticles,
  Pageable,
} from './generated'
import { client } from './generated/client.gen'

client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
})

const DEFAULT_PAGEABLE: Pageable = { page: 0, size: 10 }

export const apiClient = {
  newsArticles: {
    async findAll(status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') {
      try {
        const { data, error } = await listNewsArticles({
          query: { status },
        })
        if (error) {
          console.error(`Error fetching news articles:`, error)
          return []
        }

        return data ?? []
      } catch (error) {
        console.error('Error fetching news articles:', error)
        return []
      }
    },

    async findOne(id: string) {
      try {
        const { data, error } = await findNewsArticleById({ path: { id } })
        if (error) {
          console.error(`Error fetching news article with id ${id}:`, error)
          return null
        }
        return data ?? null
      } catch (error) {
        console.error(`Error fetching news article with id ${id}:`, error)
        return null
      }
    },
  },

  fixtures: {
    async findAll(leagueApiId?: string, pageable: Pageable = DEFAULT_PAGEABLE) {
      try {
        const { data, error } = await listFixtures({
          query: {
            leagueApiId,
            pageable,
          },
        })
        if (error) {
          console.error(`Error fetching all fixtures:`, error)
          return []
        }
        return data?.content ?? []
      } catch (error) {
        console.error('Error fetching fixtures:', error)
        return []
      }
    },

    async findOne(id: string) {
      try {
        const { data, error } = await findFixtureById({ path: { id } })
        if (error) {
          console.error(`Error fetching highlight with id ${id}:`, error)
          return null
        }
        return data ?? null
      } catch (error) {
        console.error(`Error fetching fixture with id ${id}:`, error)
        return null
      }
    },
  },

  ecommerceArticles: {
    async findAll() {
      try {
        const { data, error } = await getAllProducts()
        if (error) {
          console.error(`Error fetching all products:`, error)
          return []
        }
        return data ?? []
      } catch (error) {
        console.error('Error fetching ecommerce articles:', error)
        return []
      }
    },

    async findOne(id: string) {
      try {
        const { data, error } = await getProductById({ path: { id } })
        if (error) {
          console.error(`Error fetching highlight with id ${id}:`, error)
          return null
        }
        return data ?? null
      } catch (error) {
        console.error(`Error fetching ecommerce article with id ${id}:`, error)
        return null
      }
    },
  },

  highlights: {
    async findAll(pageable: Pageable = DEFAULT_PAGEABLE) {
      try {
        const { data, error } = await listHighlights({ query: { pageable } })
        if (error) {
          console.error(`Error fetching highlights:`, error)
          return []
        }

        return data?.content ?? []
      } catch (error) {
        console.error('Error fetching highlights:', error)
        return []
      }
    },

    async findOne(id: string) {
      try {
        const { data, error } = await findHighlightById({ path: { id } })
        if (error) {
          console.error(`Error fetching highlight with id ${id}:`, error)
          return null
        }
        return data ?? null
      } catch (error) {
        console.error(`Error fetching highlight with id ${id}:`, error)
        return null
      }
    },
  },

  advertisements: {
    async findAll(pageable: Pageable = DEFAULT_PAGEABLE) {
      try {
        // Assuming getLatestAdvertisements is the correct method
        const { data, error } = await getLatestAdvertisements({
          query: { pageable },
        })

        if (error) {
          console.error(`Error fetching advertisements:`, error)
          return []
        }
        return data?.content ?? []
      } catch (error) {
        console.error('Error fetching advertisements:', error)
        return []
      }
    },

    async findOne(id: string) {
      try {
        const { data, error } = await getAdvertisementById({
          path: { id },
        })
        if (error) {
          console.error(`Error fetching highlight with id ${id}:`, error)
          return null
        }
        return data ?? null
      } catch (error) {
        console.error(`Error fetching advertisement with id ${id}:`, error)
        return null
      }
    },
  },

  leagues: {
    async findAll(
      country?: string,
      type?: string,
      pageable: Pageable = { page: 0, size: 10 }
    ) {
      try {
        const { data, error } = await listLeagues({
          query: {
            country,
            type,
            pageable,
          },
        })

        if (error) {
          console.error(`Error fetching leagues:`, error)
          return []
        }
        return data?.content ?? []
      } catch (error) {
        console.error('Error fetching leagues:', error)
        return []
      }
    },

    async findOne(id: string) {
      try {
        const { data, error } = await findLeagueById({ path: { id } })
        if (error) {
          console.error(`Error fetching league with id ${id}:`, error)
          return null
        }
        return data ?? null
      } catch (error) {
        console.error(`Error fetching league with id ${id}:`, error)
        return null
      }
    },
  },
}
