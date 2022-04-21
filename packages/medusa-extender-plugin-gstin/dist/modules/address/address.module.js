"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModule = void 0;
const medusa_extender_1 = require("medusa-extender");
const address_entity_1 = require("./address.entity");
const address_service_1 = __importDefault(require("./address.service"));
const attachAddressSubscribers_middleware_1 = __importDefault(require("./attachAddressSubscribers.middleware"));
const address_migration_1 = __importDefault(require("./address.migration"));
const address_repository_1 = __importDefault(require("./address.repository"));
const address_validator_1 = __importDefault(require("./address.validator"));
let AddressModule = class AddressModule {
};
AddressModule = __decorate([
    (0, medusa_extender_1.Module)({
        imports: [address_entity_1.Address, address_repository_1.default, address_service_1.default, attachAddressSubscribers_middleware_1.default, address_migration_1.default, address_validator_1.default],
    })
], AddressModule);
exports.AddressModule = AddressModule;
//# sourceMappingURL=address.module.js.map