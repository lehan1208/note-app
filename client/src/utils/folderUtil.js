import { graphQLRequest } from "./request.js";

export async function folderUtil(fetchAction, optionsRequest, BASE_URL) {
  const query = `query ExampleQuery {
    folders {
      id
      name
      createdAt
    }
  }`
  const data = await graphQLRequest({query}) || [];
  return data
}