export type User = {
  username: string;
};

export enum HOUR_TYPE {
  MIRROR = "MIRROR",
  TRIANGLE = "TRIANGLE",
  REVERSE = "REVERSE",
}

export type HourEntry = {
  id: number;
  user: User;
  hour: string;
  type: HOUR_TYPE;
};

export type Ranking = {
  entries: Array<{ user: User; points: number }>;
};

export type Profile = {
  user: User;
  metadata: {
    totalHours: number;
    mirrorHours: number;
    triangleHours: number;
  };
};
