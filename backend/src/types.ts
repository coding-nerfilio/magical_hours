import { User } from "@src/entities/User";

export type UserJWT = {
  user: User;
};

export type Profile = {
  user: User;
  metadata: {
    totalHours: number;
    mirrorHours: number;
    triangleHours: number;
  };
};
