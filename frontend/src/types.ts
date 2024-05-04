export type User = {
  username: string;
};

export type Ranking = {
  entries: Array<{ user: User; points: number }>;
};
