/*
 * @Author: tj
 * @Description: auth-provider
 * @Date: 2022-10-11 16:44:54
 */
//如果在真实环境，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
import { User } from "screens/project-list/search-panel";
const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = (): string => {
  return window?.localStorage?.getItem(localStorageKey) ?? "";
};

export const handelUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

//登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handelUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

//注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handelUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

//退出登录(在参数前加个async，返回的就一定是promise)
export const logout = async (): Promise<void> => {
  return window.localStorage.removeItem(localStorageKey);
};
