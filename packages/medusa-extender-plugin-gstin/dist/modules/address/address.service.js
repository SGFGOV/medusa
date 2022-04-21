"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_extender_1 = require("medusa-extender");
const services_1 = require("@medusajs/medusa/dist/services");
let AddressService = class AddressService extends services_1.OrderService {
    constructor(container) {
        super(container);
        this.container = container;
        this.manager = container.manager;
        this.addressRepository = container.addressRepository;
        this.eventBus = container.eventBusService;
    }
};
AddressService = __decorate([
    (0, medusa_extender_1.Service)({ override: services_1.OrderService, scope: 'SCOPED' }),
    __metadata("design:paramtypes", [Object])
], AddressService);
exports.default = AddressService;
//# sourceMappingURL=address.service.js.map