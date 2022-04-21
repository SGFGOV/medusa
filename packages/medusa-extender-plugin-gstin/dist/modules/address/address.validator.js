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
const common_1 = require("@medusajs/medusa/dist/types/common");
const class_validator_1 = require("class-validator");
let AddressValidator = class AddressValidator extends common_1.AddressPayload {
};
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressValidator.prototype, "gstin", void 0);
AddressValidator = __decorate([
    (0, medusa_extender_1.Validator)({ override: common_1.AddressPayload })
], AddressValidator);
exports.default = AddressValidator;
//# sourceMappingURL=address.validator.js.map