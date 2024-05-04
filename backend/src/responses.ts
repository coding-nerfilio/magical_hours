import { Response } from "express";
export enum Status {
  OK = "OK",
  ERROR = "ERROR",
  DATA_NOT_FOUND = "DATA_NOT_FOUND",
  INPUT_VALIDATION_ERROR = "INPUT_VALIDATION_ERROR",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  SERVER_FAILED = "SERVER_FAILED",
}

type ApiResponse<t> = {
  message: string;
  status: Status;
  data: t;
};

/** Deprecated*/
const ServerError = (res: Response) => {
  const response: ApiResponse<{}> = {
    message: "Server error",
    status: Status.SERVER_FAILED,
    data: {},
  };
  res.status(200).send(response);
};

/** Deprecated*/
const UserAlreadyExists = (res: Response) => {
  const response: ApiResponse<{}> = {
    message: "User already exists",
    status: Status.USER_ALREADY_EXISTS,
    data: {},
  };
  res.status(200).send(response);
};

/** Deprecated*/
const FoundData = <t>(res: Response, data: any) => {
  const response: ApiResponse<t> = {
    message: "OK",
    status: Status.OK,
    data: data,
  };
  res.status(200).send(response);
};

/** Deprecated*/
const InputValidationError = (res: Response) => {
  const response: ApiResponse<{}> = {
    message: "Input validation error",
    status: Status.INPUT_VALIDATION_ERROR,
    data: {},
  };
  res.status(200).send(response);
};

/** Deprecated*/
const DataNotFound = (res: Response) => {
  const response: ApiResponse<{}> = {
    message: "DATA NOT FOUND",
    status: Status.DATA_NOT_FOUND,
    data: {},
  };
  res.status(200).send(response);
};

const OkResponse = (data?: any, message?: string): ApiResponse<typeof data> => {
  return { status: Status.OK, data, message: message || "" };
};

const ErrorResponse = (status?: Status, message?: string): ApiResponse<any> => {
  return { status: status || Status.ERROR, message: message || "", data: {} };
};

export const DefaultResponses = {
  ServerError,
  UserAlreadyExists,
  FoundData,
  DataNotFound,
  InputValidationError,
  OkResponse,
  ErrorResponse,
};
