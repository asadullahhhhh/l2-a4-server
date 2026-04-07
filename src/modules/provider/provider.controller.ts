import { NextFunction, Request, Response } from "express";
import { providerService } from "./provider.service";

const getAllProviders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, skip } = req.query;

    const pageNumber = Number(page ?? 1);
    const limitNumber = Number(limit ?? 12);
    const skipNumber = (pageNumber - 1) * limitNumber


    const result = await providerService.getAllProviders({skipNumber, limitNumber, pageNumber});

    res.status(200).json({
      success: true,
      message: "Providers retrieved successfully!!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPublicProviderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await providerService.getPublicProviderById(id);

        res.status(200).json({
            success: true,
            message: "Provider retrieved successfully!!",
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

const createProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
  } catch (e) {
    next(e);
  }
};

const getProverderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await providerService.getProverderById(
      req.user?.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Provider profile retrieved successfully!!",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await providerService.updateProvider(
      req.body,
      req.user?.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Provider profile updated successfully!!",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const providerController = {
  createProvider,
  getProverderById,
  updateProvider,
  getAllProviders,
    getPublicProviderById,
};
