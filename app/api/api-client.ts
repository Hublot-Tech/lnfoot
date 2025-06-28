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
} from './generated'
import { client } from './generated/client.gen'

client.setConfig({
  baseUrl: 'https://api.ln-foot.com',
})

export const apiClient = {
  newsArticles: {
    async findAll(status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') {
      try {
        return await listNewsArticles({ query: { status } })
      } catch (error) {
        console.error('Error fetching news articles:', error)
        return []
      }
    },

    async findOne(id: string) {
      try {
        return await findNewsArticleById({ path: { id } })
      } catch (error) {
        console.error(`Error fetching news article with id ${id}:`, error)
        return null
      }
    },
  },

  fixtures: {
    async findAll(leagueApiId?: string, pageable?: any) {
      try {
        return await listFixtures({
          query: {
            leagueApiId,
            pageable,
          },
        })
      } catch (error) {
        console.error('Error fetching fixtures:', error)
        return { content: [] } // Return empty content in case of error
      }
    },

    async findOne(id: string) {
      try {
        return await findFixtureById({ path: { id } })
      } catch (error) {
        console.error(`Error fetching fixture with id ${id}:`, error)
        return null
      }
    },
  },

  ecommerceArticles: {
    async findAll() {
      try {
        return await getAllProducts()
      } catch (error) {
        console.error('Error fetching ecommerce articles:', error)
        return []
      }
    },

    async findOne(id: string) {
      try {
        return await getProductById({ path: { id } })
      } catch (error) {
        console.error(`Error fetching ecommerce article with id ${id}:`, error)
        return null
      }
    },
  },

  highlights: {
    async findAll(pageable?: any) {
      try {
        return await listHighlights({ query: { pageable } })
      } catch (error) {
        console.error('Error fetching highlights:', error)
        return { content: [] } // Return empty content in case of error
      }
    },

    async findOne(id: string) {
      try {
        return await findHighlightById({ path: { id } })
      } catch (error) {
        console.error(`Error fetching highlight with id ${id}:`, error)
        return null
      }
    },
  },

  advertisements: {
    async findAll(pageable?: any) {
      try {
        // Assuming getLatestAdvertisements is the correct method
        return await getLatestAdvertisements({
          query: { pageable },
        })
      } catch (error) {
        console.error('Error fetching advertisements:', error)
        return { content: [] } // Return empty content in case of error
      }
    },

    async findOne(id: string) {
      try {
        return await getAdvertisementById({
          path: { id },
        })
      } catch (error) {
        console.error(`Error fetching advertisement with id ${id}:`, error)
        return null
      }
    },
  },

  leagues: {
    async findAll(country?: string, type?: string, pageable?: any) {
      try {
        return await listLeagues({
          query: {
            country,
            type,
            pageable,
          },
        })
      } catch (error) {
        console.error('Error fetching leagues:', error)
        return { content: [] } // Return empty content in case of error
      }
    },

    async findOne(id: string) {
      try {
        return await findLeagueById({ path: { id } })
      } catch (error) {
        console.error(`Error fetching league with id ${id}:`, error)
        return null
      }
    },
  },
}
