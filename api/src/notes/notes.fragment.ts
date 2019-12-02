export const NoteWithTagsAndUsers = `
fragment NoteWithTagsAndUsers on Note  {
  id
  title
  content
  createdAt
  updatedAt
  tags {
    id
    name
    createdAt
    updatedAt
  }
  user {
    id
    firstName
    lastName
    email
  }
}
`;
