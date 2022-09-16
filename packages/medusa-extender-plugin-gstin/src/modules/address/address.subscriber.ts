import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { eventEmitter, Utils as MedusaUtils, OnMedusaEntityEvent } from 'medusa-extender';
import { Address } from './address.entity';

@EventSubscriber()
export default class AddressSubscriber implements EntitySubscriberInterface<Address> {
	static attachTo(connection: Connection): void {
		MedusaUtils.attachOrReplaceEntitySubscriber(connection, AddressSubscriber);
	}

	public listenTo(): typeof Address {
		return Address;
	}

	/**
	 * Relay the event to the handlers.
	 * @param event Event to pass to the event handler
	 */
	public async beforeInsert(event: InsertEvent<Address>): Promise<void> {
		return await eventEmitter.emitAsync(OnMedusaEntityEvent.Before.InsertEvent(Address), {
			event,
			transactionalEntityManager: event.manager,
		});
	}
}
