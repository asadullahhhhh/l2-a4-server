import { prisma } from "../../lib/prisma";
const getCategoryPost = async () => {
    const result = await prisma.categories.findMany();
    return result;
};
const createCategoryPost = async (payload) => {
    const result = await prisma.categories.create({
        data: {
            ...payload
        }
    });
    return result;
};
const updateCategoryPost = async (payload, id) => {
    const result = await prisma.categories.update({
        where: {
            id
        },
        data: {
            ...(payload.name && { name: payload.name }),
            ...(payload.description && { description: payload.description })
        }
    });
    return result;
};
export const categoriService = {
    createCategoryPost,
    getCategoryPost,
    updateCategoryPost
};
//# sourceMappingURL=categorie.service.js.map