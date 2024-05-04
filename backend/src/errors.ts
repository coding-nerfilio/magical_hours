import { Status } from "@src/responses";

export type Error = {
  status: Status;
  message: string;
};
export const ErrorFactory = (status: Status, message: string): Error => {
  return { status, message };
};
