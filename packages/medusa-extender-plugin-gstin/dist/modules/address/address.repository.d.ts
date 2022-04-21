import { AddressRepository as MedusaAddressRepository } from '@medusajs/medusa/dist/repositories/address';
import { Address } from './address.entity';
declare const AddressRepository_base: import("medusa-extender").MixinReturnType<import("typeorm").Repository<Address>, MedusaAddressRepository>;
export default class AddressRepository extends AddressRepository_base {
}
export {};
