"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("@medusajs/medusa/dist/repositories/address");
const medusa_extender_1 = require("medusa-extender");
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
let AddressRepository = class AddressRepository extends medusa_extender_1.Utils.repositoryMixin(address_1.AddressRepository) {
};
AddressRepository = __decorate([
    (0, medusa_extender_1.Repository)({ override: address_1.AddressRepository }),
    (0, typeorm_1.EntityRepository)(address_entity_1.Address)
], AddressRepository);
exports.default = AddressRepository;
//# sourceMappingURL=address.repository.js.map