import { prisma } from "../../lib/prisma"

const getAllUsers = async ({pageNumber, limitNumber, skipNumber, status1, roles}: { pageNumber: number; limitNumber: number; skipNumber: number; status1?: string; roles?: string }) => {
    const result = await prisma.user.findMany({
        skip: skipNumber,
        take: limitNumber,
        where: {
            ...(status1 && { status: status1 }),
            ...(roles && { role: roles })
        }
        
    })

    const count = await prisma.user.count({
       where: {
        ...(status1 && { status: status1 }),
        ...(roles && { role: roles })
       }
    })

    const totalPage = Math.ceil(count /limitNumber)

    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            totalItems: count,
            totalPage
        },
        data: result
    }
}

const updateUser = async (payload: {status: "ACTIVE" | "SUSPENDED", userId: string}) => {
    const {status, userId} = payload

    const result = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            status
        }
    })
    return result

}

export const UserService = {
    getAllUsers,
    updateUser
}