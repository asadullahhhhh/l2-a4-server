import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 5000

const main = async () => {
    try {
        await prisma.$connect()

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
            console.error("An error occurred", error);
            await prisma.$disconnect()
            process.exit(1)
    }
}

main()