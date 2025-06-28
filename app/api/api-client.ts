import { OpenAPI } from "./generated";
import {
  NewsArticleControllerService,
  FixtureControllerService,
  ProductControllerService,
  HighlightControllerService,
  AdvertisementControllerService,
  LeagueControllerService,
  type NewsArticleDto,
  type FixtureDto,
  type ProductDto,
  type HighlightDto,
  type AdvertisementDto,
  type LeagueDto,
} from "./generated";

OpenAPI.BASE = "https://api.ln-foot.com";

export const apiClient = {
  newsArticles: {
    async findAll(status?: "DRAFT" | "PUBLISHED" | "ARCHIVED") {
      try {
        return await NewsArticleControllerService.listNewsArticles({ status });
      } catch (error) {
        console.error("Error fetching news articles:", error);
        return [];
      }
    },

    async findOne(id: string) {
      try {
        return await NewsArticleControllerService.findNewsArticleById({ id });
      } catch (error) {
        console.error(`Error fetching news article with id ${id}:`, error);
        return null;
      }
    },
  },

  fixtures: {
    async findAll(leagueApiId?: string, pageable?: any) {
      try {
        return await FixtureControllerService.listFixtures({
          leagueApiId,
          pageable,
        });
      } catch (error) {
        console.error("Error fetching fixtures:", error);
        return { content: [] }; // Return empty content in case of error
      }
    },

    async findOne(id: string) {
      try {
        return await FixtureControllerService.findFixtureById({ id });
      } catch (error) {
        console.error(`Error fetching fixture with id ${id}:`, error);
        return null;
      }
    },
  },

  ecommerceArticles: {
    async findAll() {
      try {
        return await ProductControllerService.getAllProducts();
      } catch (error) {
        console.error("Error fetching ecommerce articles:", error);
        return [];
      }
    },

    async findOne(id: string) {
      try {
        return await ProductControllerService.getProductById({ id });
      } catch (error) {
        console.error(`Error fetching ecommerce article with id ${id}:`, error);
        return null;
      }
    },
  },

  highlights: {
    async findAll(pageable?: any) {
      try {
        return await HighlightControllerService.listHighlights({ pageable });
      } catch (error) {
        console.error("Error fetching highlights:", error);
        return { content: [] }; // Return empty content in case of error
      }
    },

    async findOne(id: string) {
      try {
        return await HighlightControllerService.findHighlightById({ id });
      } catch (error) {
        console.error(`Error fetching highlight with id ${id}:`, error);
        return null;
      }
    },
  },

  advertisements: {
    async findAll(pageable?: any) {
      try {
        // Assuming getLatestAdvertisements is the correct method
        return await AdvertisementControllerService.getLatestAdvertisements({
          pageable,
        });
      } catch (error) {
        console.error("Error fetching advertisements:", error);
        return { content: [] }; // Return empty content in case of error
      }
    },

    async findOne(id: string) {
      try {
        return await AdvertisementControllerService.getAdvertisementById({
          id,
        });
      } catch (error)
{
        console.error(`Error fetching advertisement with id ${id}:`, error);
        return null;
      }
    },
  },

  leagues: {
    async findAll(country?: string, type?: string, pageable?: any) {
      try {
        return await LeagueControllerService.listLeagues({
          country,
          type,
          pageable,
        });
      } catch (error) {
        console.error("Error fetching leagues:", error);
        return { content: [] }; // Return empty content in case of error
      }
    },

    async findOne(id: string) {
      try {
        return await LeagueControllerService.findLeagueById({ id });
      } catch (error) {
        console.error(`Error fetching league with id ${id}:`, error);
        return null;
      }
    },
  },
};
