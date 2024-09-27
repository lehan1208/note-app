export default {
  authors: [
    {
      id: 1,
      name: "Han Le",
    },
    {
      id: 2,
      name: "Ethan Nguyen",
    },
  ],

  folders: [
    {
      id: "1",
      name: "Home",
      createdAt: "2021-11-18T03:42:13Z",
      authorId: 1,
    },
    {
      id: "2",
      name: "Work",
      createdAt: "2021-11-18T03:42:13Z",
      authorId: 3,
    },
    {
      id: "3",
      name: "School",
      createdAt: "2021-11-18T03:42:13Z",
      authorId: 2,
    },
  ],

  notes: [
    {
      id: "123",
      folderId: "1",
      content: "<p>Go to supermarket</p>"
    },
    {
      id: "12",
      folderId: "1",
      content: "<p>Buying food</p>"
    },
    {
      id: "13",
      folderId: "1",
      content: "<p>Go home</p>"
    },
    {
      id: "14",
      folderId: "2",
      content: "<p>Go to work</p>"
    },
    {
      id: "15",
      folderId: "3",
      content: "<p>Learning ReactJS</p>"
    },
  ]
};
