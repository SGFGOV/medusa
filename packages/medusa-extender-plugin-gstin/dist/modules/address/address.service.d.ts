import { EntityManager } from 'typeorm';
import { OrderService as MedusaOrderService } from '@medusajs/medusa/dist/services';
import EventBusService from '@medusajs/medusa/dist/services/event-bus';
import AddressRepository from './address.repository';
import { Address } from './address.entity';
declare type ConstructorParams = {
    loggedInAddress: Address;
    manager: EntityManager;
    addressRepository: typeof AddressRepository;
    eventBusService: EventBusService;
    orderRepository: any;
    customerService: any;
    paymentProviderService: any;
    shippingOptionService: any;
    shippingProfileService: any;
    discountService: any;
    fulfillmentProviderService: any;
    fulfillmentService: any;
    lineItemService: any;
    totalsService: any;
    regionService: any;
    cartService: any;
    giftCardService: any;
    draftOrderService: any;
    inventoryService: any;
};
export default class AddressService extends MedusaOrderService {
    private readonly container;
    private readonly manager;
    private readonly addressRepository;
    private readonly eventBus;
    constructor(container: ConstructorParams);
}
export {};
