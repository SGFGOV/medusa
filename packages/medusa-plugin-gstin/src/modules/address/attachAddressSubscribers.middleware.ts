import { Express, NextFunction, Request, Response } from 'express';
import {
	MEDUSA_RESOLVER_KEYS,
	MedusaAuthenticatedRequest,
	MedusaRouteOptions,
	Middleware,
	Utils as MedusaUtils,
} from 'medusa-extender';
import { Connection } from 'typeorm';
import AddressSubscriber from './address.subscriber';

@Middleware({ requireAuth: true, routes: [{ method: 'post', path: '/admin/orders/' }] })
export default class AttachAddressSubscribersMiddleware {
	public static get routesOptions(): MedusaRouteOptions {
		return {
			path: '/admin/orders/',
			method: 'post',
		};
	}

	public consume(options: {
		app: Express;
	}): (req: MedusaAuthenticatedRequest | Request, res: Response, next: NextFunction) => void | Promise<void> {
		const routeOptions = AttachAddressSubscribersMiddleware.routesOptions;
		options.app.use((req: MedusaAuthenticatedRequest, res: Response, next: NextFunction): void => {
			if (
				req.method.toLowerCase() === routeOptions.method &&
				req.originalUrl.toLowerCase() === routeOptions.path.toLowerCase()
			) {
				const { connection } = req.scope.resolve(MEDUSA_RESOLVER_KEYS.manager) as { connection: Connection };
				MedusaUtils.attachOrReplaceEntitySubscriber(connection, AddressSubscriber);
			}
			return next();
		});

		return (req: MedusaAuthenticatedRequest | Request, res: Response, next: NextFunction) => next();
	}
}
