import { User } from "../types";

const saveUserData = (userData: User) => {
  localStorage.setItem("userData", btoa(JSON.stringify(userData)));
};

const loadUserData = (): User => {
  return JSON.parse(atob(localStorage.getItem("userData")!));
};

const setAuthToken = (authToken: string) => {
  localStorage.setItem("authToken", btoa(authToken));
};

const getAuthToken = () => {
  return atob(localStorage.getItem("authToken")!);
};

const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  localStorage.removeItem("api-cd");
};

const isLogged = () => {
  return localStorage.getItem("authToken") !== null;
};

const Auth = {
  saveUserData,
  loadUserData,
  setAuthToken,
  getAuthToken,
  logout,
  isLogged,
};

export default Auth;
