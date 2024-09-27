export const typeDefs = `
  scalar Date

  type Folder {
    id: String!,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note]
  }
  
  type Author {
    name: String,
    uid: String!,
  }
  
  type Note {
    id: String,
    content: String,
    updatedAt: Date
  }

  type Query {
    folders: [Folder],
    folder(folderId: String!): Folder,
    note(noteId: String): Note,
  }
  
  type Mutation {
    addFolder(name: String!): Folder,
    addNote(content: String!, folderId: ID!): Note,
    updateNote(content: String!, id: String!): Note,
    register(uid: String!, name: String!): Author,
    pushNotification(content: String): Message
  }
  
  type Message {
    message: String
  }
  
  type Subscription {
    folderCreated: Message,
    notification: Message,
  }
`;