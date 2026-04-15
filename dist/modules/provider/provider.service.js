import { prisma } from "../../lib/prisma";
const getAllProviders = async ({ skipNumber, limitNumber, pageNumber, }) => {
    const result = await prisma.providerProfile.findMany({
        skip: skipNumber,
        take: limitNumber,
    });
    const count = await prisma.providerProfile.count();
    const totalPage = Math.ceil(count / limitNumber);
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
const getPublicProviderById = async (id) => {
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
const getProverderById = async (id) => {
    const result = await prisma.providerProfile.findUnique({
        where: {
            user_id: id,
        },
    });
    return result;
};
const createProvider = async (payload) => {
    const result = await prisma.providerProfile.create({
        data: {
            ...payload,
        },
    });
    return result;
};
const getProvierOrders = async (id, pageNumber, limitNumber, skip) => {
    const result = await prisma.$transaction(async (tx) => {
        const provider = await tx.providerProfile.findUnique({
            where: {
                user_id: id
            },
            select: {
                id: true,
            }
        });
        const orders = await tx.orders.findMany({
            where: {
                provider_id: provider.id
            },
            include: {
                orderItems: true
            },
            skip,
            take: limitNumber,
        });
        const count = await tx.orders.count({
            where: {
                provider_id: provider.id
            }
        });
        const totalPage = Math.ceil(count / limitNumber);
        return {
            meta: {
                page: pageNumber,
                limit: limitNumber,
                totalItems: count,
                totalPage,
            },
            data: orders,
        };
    });
    return result;
};
const updateProvider = async (payload, id) => {
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
    getProvierOrders,
};
//# sourceMappingURL=provider.service.js.map