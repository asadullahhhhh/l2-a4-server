import { NextFunction, Request, Response } from "express";
export declare const providerController: {
    createProvider: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProverderById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProvider: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllProviders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPublicProviderById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProviderOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=provider.controller.d.ts.map