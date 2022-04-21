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
exports.Address = void 0;
const medusa_1 = require("@medusajs/medusa");
const typeorm_1 = require("typeorm");
const medusa_extender_1 = require("medusa-extender");
let Address = class Address extends medusa_1.Address {
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "gstin", void 0);
Address = __decorate([
    (0, medusa_extender_1.Entity)({ override: medusa_1.Address }),
    (0, typeorm_1.Entity)()
], Address);
exports.Address = Address;
//# sourceMappingURL=address.entity.js.map