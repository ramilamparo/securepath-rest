import { SecurePath } from "securepath-api";

declare global {
  namespace Express {
    interface User extends SecurePath {}
    interface Request {
      user?: User;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      SECUREPATH_BASE_URL: string;
    }
  }
}
