import { prisma } from "../../lib/prisma";
const getProfileDetails = async (userId) => {
    const result = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            status: true,
        }
    });
    return result;
};
const updateProfileDetails = async (userId, data) => {
    const result = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            ...data
        }
    });
    return result;
};
export const profileService = {
    getProfileDetails,
    updateProfileDetails
};
//# sourceMappingURL=profile.service.js.map