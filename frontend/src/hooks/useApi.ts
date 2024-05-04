import { useState } from "preact/hooks";
import { Ranking, User } from "../types";
import Auth from "../services/Auth";

export enum Status {
  OK = "OK",
  ERROR = "ERROR",
  DATA_NOT_FOUND = "DATA_NOT_FOUND",
  INPUT_VALIDATION_ERROR = "INPUT_VALIDATION_ERROR",
}

type ApiResponse<t> = {
  message: string;
  status: Status;
  data: t;
};

const useRawApi = <res, body = void, query = void>(
  url: string,
  method: "GET" | "POST",
  auth: boolean
) => {
  const [response, setResponse] = useState<ApiResponse<res> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const execute = async (body: body, query: query) => {
    setIsLoading(true);

    let finalUrl = import.meta.env.VITE_API_URL + url;

    //Add query params to url
    if (query !== undefined) {
      let keys = Object.keys(query as any);

      for (const key of keys) {
        finalUrl = finalUrl.replace(":" + key, (query as any)[key]);
      }
    }

    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      if (auth) headers.append("Authorization", Auth.getAuthToken());
      let res = await fetch(finalUrl, {
        method: method,
        body: JSON.stringify(body as any),
        headers: headers,
      });
      setIsLoading(false);
      let json = await res.json();
      setResponse(json);
      return json;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setErrorMessage("error");
      return null;
    }
  };

  return { response, isLoading, execute, errorMessage, setResponse };
};

export const useApi = {
  Auth: {
    register: () =>
      useRawApi<
        { user: User; token: string },
        { username: string; password: string; rePassword: string }
      >("v1/auth/register", "POST", false),
    login: () =>
      useRawApi<
        { user: User; token: string },
        { username: string; password: string }
      >("v1/auth/login", "POST", false),
  },
  Social: {
    getFriends: () =>
      useRawApi<{ friends: User[] }>("v1/social/getFriends", "GET", true),
    addFriend: () =>
      useRawApi<{ friends: User[] }, { username: string }>(
        "v1/social/addFriend",
        "POST",
        true
      ),
  },
  Ranking: {
    getRanking: () =>
      useRawApi<{ ranking: Ranking }>("v1/ranking/get", "GET", true),
  },
  Game: {
    submitHour: () =>
      useRawApi<{}, { timezone: number }>("v1/game/submitHour", "POST", true),
  },
};
