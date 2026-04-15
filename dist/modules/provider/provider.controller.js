import { providerService } from "./provider.service";
const getAllProviders = async (req, res, next) => {
    try {
        const { page, limit, skip } = req.query;
        const pageNumber = Number(page ?? 1);
        const limitNumber = Number(limit ?? 12);
        const skipNumber = (pageNumber - 1) * limitNumber;
        const result = await providerService.getAllProviders({
            skipNumber,
            limitNumber,
            pageNumber,
        });
        res.status(200).json({
            success: true,
            message: "Providers retrieved successfully!!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getPublicProviderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await providerService.getPublicProviderById(id);
        res.status(200).json({
            success: true,
            message: "Provider retrieved successfully!!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const createProvider = async (req, res, next) => {
    try {
        const providerProfile = {
            user_id: req.user?.id,
            ...req.body,
        };
        const result = await providerService.createProvider(providerProfile);
        res.status(201).json({
            success: false,
            message: "Provider profile create successfully!!",
            data: result,
        });
    }
    catch (e) {
        next(e);
    }
};
const getProverderById = async (req, res, next) => {
    try {
        const result = await providerService.getProverderById(req.user?.id);
        res.status(200).json({
            success: true,
            message: "Provider profile retrieved successfully!!",
            data: result,
        });
    }
    catch (e) {
        next(e);
    }
};
const updateProvider = async (req, res, next) => {
    try {
        const result = await providerService.updateProvider(req.body, req.user?.id);
        res.status(200).json({
            success: true,
            message: "Provider profile updated successfully!!",
            data: result,
        });
    }
    catch (e) {
        next(e);
    }
};
const getProviderOrders = async (req, res, next) => {
    try {
        const id = req.user?.id;
        const { page, limit } = req.query;
        const pageNumber = Number(page ?? 1);
        const limitNumber = Number(limit ?? 12);
        const skipNumber = (pageNumber - 1) * limitNumber;
        const result = await providerService.getProvierOrders(id, pageNumber, limitNumber, skipNumber);
        res.status(200).json({
            success: true,
            message: "Provider orders retrieved successfully!!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const providerController = {
    createProvider,
    getProverderById,
    updateProvider,
    getAllProviders,
    getPublicProviderById,
    getProviderOrders,
};
//# sourceMappingURL=provider.controller.js.map