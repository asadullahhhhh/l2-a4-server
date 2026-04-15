import { prisma } from "../../lib/prisma";
const getMeals = async (queries) => {
    const { min_price, max_price, price_order: order, search, pageNumber, limitNumber, skip, ...queryData } = queries;
    const andConditions = Object.entries(queryData)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => ({ [key]: value }));
    if (min_price !== undefined && max_price !== undefined) {
        const priceFilter = {
            gte: min_price,
            lte: max_price,
        };
        andConditions.push({ price: priceFilter });
    }
    if (search !== undefined) {
        andConditions.push({ name: { contains: search, mode: "insensitive" } });
    }
    const result = await prisma.meals.findMany({
        where: andConditions.length > 0 ? { AND: andConditions } : {},
        orderBy: order ? { price: order } : { created_at: "desc" },
        ...(pageNumber && { skip: skip }),
        ...(limitNumber && { take: limitNumber }),
    });
    const count = await prisma.meals.count({
        where: andConditions.length > 0 ? { AND: andConditions } : {},
    });
    const totalPage = Math.ceil(count / limitNumber);
    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            totalItems: count,
            totalPage,
        },
        data: result,
    };
};
const getProviderMeals = async (provider_id, pageNumber, limitNumber, skip) => {
    const result = await prisma.$transaction(async (tx) => {
        const providerID = await tx.providerProfile.findUniqueOrThrow({
            where: {
                user_id: provider_id,
            },
            select: {
                id: true,
            },
        });
        const resultTx = await tx.meals.findMany({
            where: {
                provider_id: providerID.id,
            },
            skip: skip,
            take: limitNumber,
        });
        const count = await tx.meals.count({
            where: {
                provider_id: providerID.id,
            },
        });
        const totalPage = Math.ceil(count / limitNumber);
        return {
            meta: {
                page: pageNumber,
                limit: limitNumber,
                totalItems: count,
                totalPage,
            },
            data: resultTx,
        };
    });
    return result;
};
const getMealById = async (id) => {
    const result = await prisma.meals.findFirstOrThrow({
        where: { id },
        include: {
            reviews: true,
            cart_item: true,
            orderItems: true,
            provider: true,
        },
    });
    return result;
};
const postMeal = async (payload) => {
    const { user_id, ...mealData } = payload;
    let provider = await prisma.providerProfile.findUniqueOrThrow({
        where: { user_id },
        select: { id: true },
    });
    const meal = await prisma.meals.create({
        data: {
            provider_id: provider.id,
            ...mealData,
        },
    });
    return meal;
};
const updateMeal = async (payload, id) => {
    const data = Object.fromEntries(Object.entries(payload).filter((_, value) => value !== undefined));
    const result = await prisma.meals.update({
        where: { id },
        data,
    });
    return result;
};
const deleteMeal = async (id) => {
    const result = await prisma.meals.delete({
        where: {
            id,
        },
    });
    return result;
};
export const mealService = {
    getMeals,
    getMealById,
    postMeal,
    updateMeal,
    deleteMeal,
    getProviderMeals,
};
//# sourceMappingURL=meal.service.js.map