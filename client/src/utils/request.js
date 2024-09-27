import { GRAPHQL_URL } from "./contanst.js";

export const graphQLRequest = async (payload, headers = {}) => {
  if (localStorage.getItem("accessToken")) {
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        ...headers,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return null
    }

    const {data} = await res.json();
    return data;
  }

  return null;
}