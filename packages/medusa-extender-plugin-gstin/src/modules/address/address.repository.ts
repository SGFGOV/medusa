import { AddressRepository as MedusaAddressRepository } from '@medusajs/medusa/dist/repositories/address';
import { Repository as MedusaRepository, Utils } from 'medusa-extender';
import { EntityRepository } from 'typeorm';
import { Address } from './address.entity';

@MedusaRepository({ override: MedusaAddressRepository })
@EntityRepository(Address)
export default class AddressRepository extends Utils.repositoryMixin<Address, MedusaAddressRepository>(MedusaAddressRepository) {}
