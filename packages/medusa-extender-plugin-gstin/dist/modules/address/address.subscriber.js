"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AddressSubscriber_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const medusa_extender_1 = require("medusa-extender");
const address_entity_1 = require("./address.entity");
let AddressSubscriber = AddressSubscriber_1 = class AddressSubscriber {
    static attachTo(connection) {
        medusa_extender_1.Utils.attachOrReplaceEntitySubscriber(connection, AddressSubscriber_1);
    }
    listenTo() {
        return address_entity_1.Address;
    }
    /**
     * Relay the event to the handlers.
     * @param event Event to pass to the event handler
     */
    async beforeInsert(event) {
        return await medusa_extender_1.eventEmitter.emitAsync(medusa_extender_1.OnMedusaEntityEvent.Before.InsertEvent(address_entity_1.Address), {
            event,
            transactionalEntityManager: event.manager,
        });
    }
};
AddressSubscriber = AddressSubscriber_1 = __decorate([
    (0, typeorm_1.EventSubscriber)()
], AddressSubscriber);
exports.default = AddressSubscriber;
//# sourceMappingURL=address.subscriber.js.map