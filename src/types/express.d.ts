import { UserRole } from "../constants/enums";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        image?: string;
        emailVerified: boolean;
        role: UserRole;
      };
    }
  }
}
