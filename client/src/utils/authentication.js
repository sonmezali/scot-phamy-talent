import { getLoggedInUserData } from "../utils/storage";
import React from "react";
import { Redirect } from "react-router-dom";
export const protect = (Component, role) => {
  return () => {
    if (getLoggedInUserData() && getLoggedInUserData().user.role === role) {
      return <Component />;
    }

    if (getLoggedInUserData() && getLoggedInUserData().user) {
      return <Component />;
    }
    return <Redirect to="/" />;
  };
};
