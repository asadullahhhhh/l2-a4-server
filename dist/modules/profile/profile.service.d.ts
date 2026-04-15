export declare const profileService: {
    getProfileDetails: (userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null;
        role: string | null;
        status: string | null;
    } | null>;
    updateProfileDetails: (userId: string, data: {
        name?: string;
        image?: string;
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
//# sourceMappingURL=profile.service.d.ts.map