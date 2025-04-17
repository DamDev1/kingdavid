"use client";
import { setCredentials } from "@/slice/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useHydrateUserInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        dispatch(setCredentials(JSON.parse(userInfo)));
      }
    } catch (error) {
      console.error("Failed to hydrate userInfo from localStorage:", error);
    }
  }, [dispatch]);
};
