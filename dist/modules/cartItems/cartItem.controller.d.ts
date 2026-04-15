import { NextFunction, Request, Response } from "express";
export declare const cartItemController: {
    createCartItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateCartItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteCartItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    isAddCart: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUserCartItems: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    clearAllCartItems: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=cartItem.controller.d.ts.map