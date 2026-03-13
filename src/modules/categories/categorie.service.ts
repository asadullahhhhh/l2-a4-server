import { prisma } from "../../lib/prisma"

// types
interface Category {
    name: string,
    description: string
}


const getCategoryPost= async () => {
    const result = await prisma.categories.findMany()

    return result
}

const createCategoryPost = async (payload: Category) => {
    const result = await prisma.categories.create({
        data: {
            ...payload
        }
    })

    return result
}

const updateCategoryPost = async (payload:Partial<Category>, id: string) => {
    const result = await prisma.categories.update({
        where: {
            id
        },
        data: {
            ...(payload.name && {name: payload.name}),
            ...(payload.description && {description: payload.description})
        }
    })

    return result
}


export const categoriService = {
    createCategoryPost,
    getCategoryPost,
    updateCategoryPost
}