import { clearCredentials } from "@/slice/authSlice";
import { Dispatch } from "@reduxjs/toolkit";

interface ErrorResponse {
  data?: {
    message?: string;
  };
  error?: string;
}

const handlerError = (
    error: unknown,
  navigate: { push: (path: string) => void },
  dispatch: Dispatch
): string | void => {
    const err = error as ErrorResponse;
  if (
    (err?.data?.message || err.error) === "Token expired, Please sign in again."
  ) {
    dispatch(clearCredentials());
    navigate.push("/login");
    return;
  } else {
    return err?.data?.message || err.error || "An error occurred.";
  }
};

export default handlerError;
