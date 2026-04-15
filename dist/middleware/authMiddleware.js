import { auth } from "../lib/auth";
const authMiddleware = (...roles) => {
    return async (req, res, next) => {
        const session = await auth.api.getSession({
            headers: req.headers,
        });
        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        req.user = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            emailVerified: session.user.emailVerified,
            role: session.user.role,
        };
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }
        next();
    };
};
export default authMiddleware;
//# sourceMappingURL=authMiddleware.js.map