export declare const UserService: {
    getAllUsers: ({ pageNumber, limitNumber, skipNumber, status1, roles, }: {
        pageNumber: number;
        limitNumber: number;
        skipNumber: number;
        status1: string | undefined;
        roles: string | undefined;
    }) => Promise<{
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPage: number;
        };
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image: string | null;
            role: string | null;
            status: string | null;
        }[];
    }>;
    updateUser: (payload: {
        status: "ACTIVE" | "SUSPENDED";
        userId: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null;
        role: string | null;
        status: string | null;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map