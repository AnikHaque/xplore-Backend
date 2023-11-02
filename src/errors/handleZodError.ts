import { ZodError, ZodIssue } from "zod";
import {
  iGenericErrorMessage,
  iGenericErrorResponse,
} from "../interfaces/common";

const handleZodError = (error: ZodError): iGenericErrorResponse => {
  const errors: iGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleZodError;
