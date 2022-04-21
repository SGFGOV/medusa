import { Express, NextFunction, Request, Response } from 'express';
import { MedusaAuthenticatedRequest, MedusaRouteOptions } from 'medusa-extender';
export default class AttachAddressSubscribersMiddleware {
    static get routesOptions(): MedusaRouteOptions;
    consume(options: {
        app: Express;
    }): (req: MedusaAuthenticatedRequest | Request, res: Response, next: NextFunction) => void | Promise<void>;
}
