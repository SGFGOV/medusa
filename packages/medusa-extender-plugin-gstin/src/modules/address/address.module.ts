import { Module } from 'medusa-extender';
import { Address } from './address.entity';
import AddressService from './address.service';
import AttachAddressSubscribersMiddleware from './attachAddressSubscribers.middleware';
import AddGstinToAddress from './address.migration';
import AddressRepository from './address.repository';
import AddressValidator from './address.validator'
import isValidGSTNumber from 'sgf-gstin-validator'

@Module({
	imports: [Address, AddressRepository, AddressService, AttachAddressSubscribersMiddleware, AddGstinToAddress,AddressValidator],
})
export class AddressModule {}
