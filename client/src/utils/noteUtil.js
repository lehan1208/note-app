import { graphQLRequest } from "./request.js";

export const notesLoader = async (folderId) => {
  const query = `query Folder($folderId: String) {
    folder(folderId: $folderId) {
      id,
      name,
      notes {
        id,
        content
      }
    }
  }`

  const {data} = await graphQLRequest({query, variables: {folderId}})
  return data
}

export const noteLoader = async (noteId) => {
  const query = `query Folder($noteId: String) {
    note(noteId: $noteId) {
      id
      content
    }
  }`

  const {data} = await graphQLRequest({query, variables: {noteId}})
  return data
}


