import { shopifyProducts,shopifyMetaFields } from "./test-products"

export const ShopifyClientServiceMock = {
  get: jest.fn().mockImplementation((params) => {
    if (params.path === "products/ipod") {
      return Promise.resolve(shopifyProducts.ipod)
    }
    if (params.path === "products/new_ipod") {
      return Promise.resolve(shopifyProducts.new_ipod)
    }
    if (params.path === "products/shopify_ipod") {
      return Promise.resolve({
        body: {
          product: shopifyProducts.ipod_update,
        },
      })
    }
    if (params.path === "products/shopify_deleted") {
      return Promise.resolve({
        body: {
          product: {
            ...shopifyProducts.ipod,
            variants: shopifyProducts.ipod.variants.slice(1, -1),
          },
        },
      })
    }
    if (params.path === "products/632910392/metafields.json") {
      return Promise.resolve({
        
          shopifyMetaFields
        
      })
    }
    if (params.path === "products/shopify_ipod/metafields.json") {
      return Promise.resolve({
       
          shopifyMetaFields
        
      })
    }
  }),
  list: jest.fn().mockImplementation((path, _headers, _query) => {
    if (path === "products") {
      return Promise.resolve([shopifyProducts.ipod])
    }
  }),
}
