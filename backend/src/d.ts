import { UserJWT } from "@src/types";

declare namespace NodeJS {
  interface ProcessEnv {
    MAGICAL_HOURS_TYPEORM_DATABASE: any;
    MAGICAL_HOURS_TYPEORM_PORT: any;
    MAGICAL_HOURS_TYPEORM_TYPE: any;
    MAGICAL_HOURS_TYPEORM_HOST: any;
    MAGICAL_HOURS_TYPEORM_USERNAME: any;
    MAGICAL_HOURS_TYPEORM_PASSWORD: any;
    MAGICAL_HOURS_API: any;
    MAGICAL_HOURS_PORT: any;
  }
}

declare namespace Express {
  interface Request {
    user?: UserJWT;
  }
}
