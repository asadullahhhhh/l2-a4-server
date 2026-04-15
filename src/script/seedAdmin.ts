import { UserRoles } from "../constants/enums";
import { prisma } from "../lib/prisma";

const adminSeeding = async () => {
    try {
        const origin = process.env.FONTEND_URL;
        const adminData = {
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'adminpassword',
            role: UserRoles.ADMIN
        }

        const result = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        })
        console.log(result);

        if(result) {
            throw new Error("User already exists!!!");
        }

        const admin = await fetch(`${process.env.BACKEND_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Origin" : origin as string
            },
            body: JSON.stringify(adminData)
        })

        if(admin.ok) {
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            })
        }

    } catch (error) {
        console.error(error);
    }
}

adminSeeding();