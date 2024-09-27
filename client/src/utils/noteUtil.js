import { graphQLRequest } from "./request.js";

export const notesLoader = async ({params: {folderId}}) => {
  const query = `query Note($folderId: String!) {
    folder(folderId: $folderId) {
      id,
      name,
      notes {
        id,
        content,
        updatedAt
      }
    }
  }`

  const data = await graphQLRequest({
    query,
    variables: {folderId}
  })
  return data
}

export const noteLoader = async ({params: {noteId}}) => {
  const query = `query Note($noteId: String) {
    note(noteId: $noteId) {
      id
      content
    }
  }`

  const data = await graphQLRequest({query, variables: {noteId}})
  return data
}

export const addNewNote = async ({params, request}) => {
  const newNote = await request.formData();
  const formDataObj = {};
  for (let key of newNote.keys()) {
    formDataObj[key] = newNote.get(key);
  }
  // newNote.forEach((key, value) => (formDataObj[key] = value))

  const query = `mutation Mutation($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      content,
      id
    }
  }`;

  const {addNote} = await graphQLRequest({
    query,
    variables: formDataObj
  })
  return addNote;
}

export const updateNote = async ({params, request}) => {
  const updatedNote = await request.formData();
  const formDataObj = {};

  for (let key of updatedNote.keys()) {
    formDataObj[key] = updatedNote.get(key);
  }

  const query = `mutation Mutation($id: String!, $content: String!) {
    updateNote( id: $id, content: $content) {
      content,
      id
    }
  }`;

  const {updateNote} = await graphQLRequest({
    query,
    variables: formDataObj,
  });
  return updateNote
}


