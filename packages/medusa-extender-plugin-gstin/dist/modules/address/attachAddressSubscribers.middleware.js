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
var AttachAddressSubscribersMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_extender_1 = require("medusa-extender");
const address_subscriber_1 = __importDefault(require("./address.subscriber"));
let AttachAddressSubscribersMiddleware = AttachAddressSubscribersMiddleware_1 = class AttachAddressSubscribersMiddleware {
    static get routesOptions() {
        return {
            path: '/admin/orders/',
            method: 'post',
        };
    }
    consume(options) {
        const routeOptions = AttachAddressSubscribersMiddleware_1.routesOptions;
        options.app.use((req, res, next) => {
            if (req.method.toLowerCase() === routeOptions.method &&
                req.originalUrl.toLowerCase() === routeOptions.path.toLowerCase()) {
                const { connection } = req.scope.resolve(medusa_extender_1.MEDUSA_RESOLVER_KEYS.manager);
                medusa_extender_1.Utils.attachOrReplaceEntitySubscriber(connection, address_subscriber_1.default);
            }
            return next();
        });
        return (req, res, next) => next();
    }
};
AttachAddressSubscribersMiddleware = AttachAddressSubscribersMiddleware_1 = __decorate([
    (0, medusa_extender_1.Middleware)({ requireAuth: true, routes: [{ method: 'post', path: '/admin/orders/' }] })
], AttachAddressSubscribersMiddleware);
exports.default = AttachAddressSubscribersMiddleware;
//# sourceMappingURL=attachAddressSubscribers.middleware.js.map