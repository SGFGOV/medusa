"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_extender_1 = require("medusa-extender");
let AddGstinToAddress = class AddGstinToAddress {
    constructor() {
        this.name = `addGstinToAddress_${Date.now()}`;
    }
    async up(queryRunner) {
        const query = `ALTER TABLE public."address" ADD COLUMN IF NOT EXISTS "gstin" text;`;
        await queryRunner.query(query);
    }
    async down(queryRunner) {
        const query = `ALTER TABLE public."address" DROP COLUMN "gstin";`;
        await queryRunner.query(query);
    }
};
AddGstinToAddress = __decorate([
    (0, medusa_extender_1.Migration)()
], AddGstinToAddress);
exports.default = AddGstinToAddress;
//# sourceMappingURL=address.migration.js.map