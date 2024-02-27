import {
  ErrorInterface,
  ResponseInterface,
  SuccessInterface,
} from "./types.js";
import { ApiError } from "../schema/error.schema.js";

const setFormatError = (code: number, message: string): ErrorInterface => {
  return {
    error: {
      code: code,
      message: message,
    },
  } as ErrorInterface;
};

const setFormatSuccess = (code: number, message: any): SuccessInterface => {
  return {
    success: {
      code: code,
      message: message,
    },
  } as SuccessInterface;
};

const parseResponse = (data: ResponseInterface) => {
  if (data.constructor === Error) {
    const error = data as ApiError;
    return setFormatError(error.code, error.message);
  } else {
    return setFormatSuccess(200, data);
  }
};

export default parseResponse;
