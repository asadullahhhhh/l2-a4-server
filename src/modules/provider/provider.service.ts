import { prisma } from "../../lib/prisma";
import { Provider } from "../../types/provider.type.";

const getProverderById = async (id: string) => {
    console.log(id);
    const result = await prisma.providerProfile.findUnique({
        where: {
            user_id: id
        }
    })

    return result
}

const createProvider = async (payload: Provider) => {
    console.log(payload);
    const result = await prisma.providerProfile.create({
        data: {
            ...payload
        }
    })

    return result
};


const updateProvider = async (payload: Partial<Provider>, id: string) => {
    const result = await prisma.providerProfile.update({
        where: {
            user_id: id
        },
        data: {
            ...(payload.resturent_name && {resturent_name: payload.resturent_name}),
            ...(payload.description && {description: payload.description}),
            ...(payload.address && {address: payload.address}),
            ...(payload.phone && {phone: payload.phone}),
            ...(payload.logo_url && {logo_url: payload.logo_url})
        }
    })

    return result
}


export const providerService = {
  createProvider,
  getProverderById,
  updateProvider
};
