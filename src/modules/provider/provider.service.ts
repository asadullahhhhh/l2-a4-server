import { prisma } from "../../lib/prisma";
import { Provider } from "../../types/provider.type.";

const getAllProviders = async ({
  skipNumber,
  limitNumber,
  pageNumber,
}: {
  skipNumber: number;
  limitNumber: number;
  pageNumber: number;
}) => {
  const result = await prisma.providerProfile.findMany({
    skip: skipNumber,
    take: limitNumber,
  });

  const count = await prisma.providerProfile.count();

  const totalPage = Math.ceil(count / limitNumber!);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      skip: skipNumber,
      totalItems: count,
      totalPage,
    },
    data: result,
  };
};

const getPublicProviderById = async (id: string) => {
  const result = await prisma.providerProfile.findUnique({
    where: {
      id,
    },
    include: {
      meals: true,
    },
  });

  return result;
};

const getProverderById = async (id: string) => {
  const result = await prisma.providerProfile.findUnique({
    where: {
      user_id: id,
    },
  });

  return result;
};

const createProvider = async (payload: Provider) => {
  const result = await prisma.providerProfile.create({
    data: {
      ...payload,
    },
  });

  return result;
};

const updateProvider = async (payload: Partial<Provider>, id: string) => {
  const result = await prisma.providerProfile.update({
    where: {
      user_id: id,
    },
    data: {
      ...(payload.resturent_name && { resturent_name: payload.resturent_name }),
      ...(payload.description && { description: payload.description }),
      ...(payload.address && { address: payload.address }),
      ...(payload.phone && { phone: payload.phone }),
      ...(payload.logo_url && { logo_url: payload.logo_url }),
    },
  });

  return result;
};

export const providerService = {
  createProvider,
  getProverderById,
  updateProvider,
  getAllProviders,
  getPublicProviderById,
};
