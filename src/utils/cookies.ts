import Cookies from "js-cookie";

const MPID = import.meta.env.VITE_APP_PROJECT_TITLE;
const tokenKey = "systemToken_" + MPID;
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token: string) => Cookies.set(tokenKey, token, { expires: 7 });
export const removeToken = () => {
  try {
    Cookies.remove("systemToken_base");
    Cookies.remove(tokenKey);
  } catch (error) {}
};

const appIdKey = "systemAppId";
export const getAppId = () => Cookies.get(appIdKey);
export const setAppId = (appId: string | number) => Cookies.set(appIdKey, appId, { expires: 7 });
export const removeAppId = () => Cookies.remove(appIdKey);
