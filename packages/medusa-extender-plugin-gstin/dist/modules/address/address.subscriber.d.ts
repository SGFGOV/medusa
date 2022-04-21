import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Address } from './address.entity';
export default class AddressSubscriber implements EntitySubscriberInterface<Address> {
    static attachTo(connection: Connection): void;
    listenTo(): typeof Address;
    /**
     * Relay the event to the handlers.
     * @param event Event to pass to the event handler
     */
    beforeInsert(event: InsertEvent<Address>): Promise<void>;
}
