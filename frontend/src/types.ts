export type User = {
  username: string;
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
