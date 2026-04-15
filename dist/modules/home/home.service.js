import { prisma } from "../../lib/prisma";
const featuredMeals = async () => {
    const featuredMeals = await prisma.orderItems.groupBy({
        by: ["meal_id"],
        _sum: {
            quantity: true
        },
        orderBy: {
            _sum: {
                quantity: "desc"
            }
        },
        take: 6
    });
    const meals = await prisma.meals.findMany({
        where: {
            id: {
                in: featuredMeals.map(meal => meal.meal_id)
            }
        }
    });
    return meals;
};
const featuredProviders = async () => {
    const result = await prisma.providerProfile.findMany({
        take: 6,
        orderBy: {
            orders: {
                _count: "desc"
            }
        }
    });
    return result;
};
export const HomeService = {
    featuredMeals,
    featuredProviders
};
//# sourceMappingURL=home.service.js.map