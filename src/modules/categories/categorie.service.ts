import { prisma } from "../../lib/prisma"

// types
interface Category {
    name: string,
    description: string
}

const createCategoryPost = async (payload: Category) => {
    const result = await prisma.categories.create({
        data: {
            ...payload
        }
    })

    return result
}

export const categoriService = {
    createCategoryPost
}