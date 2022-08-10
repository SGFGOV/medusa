import { Service } from "medusa-extender"
import { EntityManager } from "typeorm"
import { OrderService as MedusaOrderService } from "@medusajs/medusa/dist/services"
import EventBusService from "@medusajs/medusa/dist/services/event-bus"
import AddressRepository from "./address.repository"
import { Address } from "./address.entity"

type ConstructorParams = {
  loggedInAddress: Address
  manager: EntityManager
  addressRepository: typeof AddressRepository
  eventBusService: EventBusService
  orderRepository: any
  customerService: any
  paymentProviderService: any
  shippingOptionService: any
  shippingProfileService: any
  discountService: any
  fulfillmentProviderService: any
  fulfillmentService: any
  lineItemService: any
  totalsService: any
  regionService: any
  cartService: any
  giftCardService: any
  draftOrderService: any
  inventoryService: any
}

@Service({ override: MedusaOrderService, scope: "SCOPED" })
export default class AddressService extends MedusaOrderService {
  private readonly manager: EntityManager
  private readonly addressRepository: typeof AddressRepository
  private readonly eventBus: EventBusService

  constructor(readonly container: ConstructorParams) {
    super(container)
    this.manager = container.manager
    this.addressRepository = container.addressRepository
    this.eventBus = container.eventBusService
  }
}
