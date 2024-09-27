import fakeData from "../fakeData/index.js";
import { AuthorModel, FolderModel } from "../models/index.js";

export const resolvers = {
  Query: {
    folders: async(parent, args, context) => {
      const folders = await FolderModel.findOne({
        authorId: context.uid
      });
      console.log("CHECK context :=>>>>>>) ", context);

      return folders
      // return fakeData.folders;
    },
    folder: async(parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findOne({
        _id: folderId
      })
      return foundFolder
    },
    note: (parent, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find(note => note.id === noteId) || null
    }
  },
  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    notes: (parent, args) => {
      return fakeData.notes.filter(note => note.folderId === parent.id);
    }
  },

  Mutation: {
    addFolder: async(parent, args) => {
      const newFolder = new FolderModel({...args, authorId: "123"});
      console.log("CHECK newFolder :=>>>>>>) ", newFolder);
      await newFolder.save();
      return newFolder
    },
    register: async(parent, args) => {
      const foundUser = await AuthorModel.findOne({uid: args.uid});

      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }

      return foundUser;
    }
  }
};
