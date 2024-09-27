import { graphQLRequest } from "./request.js";

export async function folderUtil() {
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

export async function addNewFolder(newFolder) {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name,
      author {
        name
      }
    }
  }`

  const data = await graphQLRequest({query, variables: {name: newFolder.name}})
  return data
}