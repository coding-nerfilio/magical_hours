import { Response } from "express";
enum Status {
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

const ServerError = (res: Response) => {
  const response: ApiResponse<{}> = {
    message: "Server error",
    status: Status.SERVER_FAILED,
    data: {},
  };
  res.status(200).send(response);
};

const UserAlreadyExists = (res: Response) => {
  const response: ApiResponse<{}> = {
    message: "User already exists",
    status: Status.USER_ALREADY_EXISTS,
    data: {},
  };
  res.status(200).send(response);
};

const FoundData = <t>(res: Response, data: any) => {
  const response: ApiResponse<t> = {
    message: "OK",
    status: Status.OK,
    data: data,
  };
  res.status(200).send(response);
};

const InputValidationError = (res: Response) => {
  const response: ApiResponse<{}> = {
    message: "Input validation error",
    status: Status.INPUT_VALIDATION_ERROR,
    data: {},
  };
  res.status(200).send(response);
};

const DataNotFound = (res: Response) => {
  const response: ApiResponse<{}> = {
    message: "DATA NOT FOUND",
    status: Status.DATA_NOT_FOUND,
    data: {},
  };
  res.status(200).send(response);
};

export const DefaultResponses = {
  ServerError,
  UserAlreadyExists,
  FoundData,
  DataNotFound,
  InputValidationError,
};
