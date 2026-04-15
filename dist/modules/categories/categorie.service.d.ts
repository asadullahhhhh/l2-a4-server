interface Category {
    name: string;
    description: string;
}
export declare const categoriService: {
    createCategoryPost: (payload: Category) => Promise<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
    }>;
    getCategoryPost: () => Promise<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    updateCategoryPost: (payload: Partial<Category>, id: string) => Promise<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
    }>;
};
export {};
//# sourceMappingURL=categorie.service.d.ts.map