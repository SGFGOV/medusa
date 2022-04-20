import { BaseService } from "medusa-interfaces"
import Logger from "../loaders/logger"
import { INCLUDE_PRESENTMENT_PRICES } from "../utils/const"



class ShopifyService extends BaseService {
  constructor(
    {
      manager,
      shippingProfileService,
      storeService,
      shopifyProductService,
      shopifyCollectionService,
      shopifyClientService,
    },
    options
  ) {
    super()

    this.options = options

    /** @private @const {EntityManager} */
    this.manager_ = manager
    /** @private @const {ShippingProfileService} */
    this.shippingProfileService_ = shippingProfileService
    /** @private @const {ShopifyProductService} */
    this.productService_ = shopifyProductService
    /** @private @const {ShopifyCollectionService} */
    this.collectionService_ = shopifyCollectionService
    /** @private @const {ShopifyRestClient} */
    this.client_ = shopifyClientService
    /** @private @const {StoreService} */
    this.store_ = storeService
  }

  withTransaction(transactionManager) {
    if (!transactionManager) {
      return this
    }

    const cloned = new ShopifyService({
      manager: transactionManager,
      options: this.options,
      shippingProfileService: this.shippingProfileService_,
      shopifyClientService: this.client_,
      shopifyProductService: this.productService_,
      shopifyCollectionService: this.collectionService_,
      shopifyBuildService: this.buildService_,
      storeService: this.store_,
    })

    cloned.transactionManager_ = transactionManager

    return cloned
  }

  async importShopify() {
    return this.atomicPhase_(async (manager) => {
      const updatedSinceQuery = await this.getAndUpdateBuildTime_()

      await this.shippingProfileService_.createDefault()
      await this.shippingProfileService_.createGiftCardDefault()

      const products = await this.client_.list(
        "products",
        INCLUDE_PRESENTMENT_PRICES,
        updatedSinceQuery
      )

      const customCollections = await this.client_.list(
        "custom_collections",
        null,
        updatedSinceQuery
      )

      const smartCollections = await this.client_.list(
        "smart_collections",
        null,
        updatedSinceQuery
      )

      const collects = await this.client_.list(
        "collects",
        null,
        updatedSinceQuery
      )
      
      const resolvedProducts = await Promise.all(
        products.map(async (product) => {
          
            Logger.info(`processing ${product.title} `)
          return await this.productService_
            .withTransaction(manager)
            .create(product)
       
      
      

      })
      )
      const resolvedProducts_withMetafields = await Promise.all(
        resolvedProducts.map(async (product) => {
        
          Logger.info(`processing ${product.title} metafields`)
          let result = await this.productService_
            .withTransaction(manager)
            .createMetafields(product)
            Logger.info(`processing ${result.metadata} metafields`)
            return result
       
      })
      )


      await this.collectionService_
        .withTransaction(manager)
        .createCustomCollections(collects, customCollections, resolvedProducts_withMetafields)

      await this.collectionService_
        .withTransaction(manager)
        .createSmartCollections(smartCollections, resolvedProducts_withMetafields)
    })
  }

  async getAndUpdateBuildTime_() {
    let buildtime = null
    const store = await this.store_.retrieve()
    if (!store) {
      return {}
    }

    if (store.metadata?.source_shopify_bt) {
      buildtime = store.metadata.source_shopify_bt
    }

    const payload = {
      metadata: {
        source_shopify_bt: new Date().toISOString(),
      },
    }

    await this.store_.update(payload)

    if (!buildtime) {
      return {}
    }

    return {
      updated_at_min: buildtime,
    }
  }
}

export default ShopifyService
