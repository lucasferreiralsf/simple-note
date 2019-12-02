export const UsersWithTagsAndNotes = `
fragment UsersWithTagsAndNotes on Users  {
  id
  firstName
  lastName
  email
  emailIsVerified
  emailToken
  emailTokenExpirationDate
  googleId
  createdAt
  updatedAt
  tags {
    id
    name
    notes {
      id
      title
      content
    }
    createdAt
    updatedAt
  }
  notes {
    id
    title
    content
    tags {
      id
      name
    }
    createdAt
    updatedAt
  }
}
`;

export const UsersWithTagsNotesPassword = `
fragment UsersWithTagsNotesPassword on Users  {
  id
  firstName
  lastName
  email
  emailIsVerified
  emailToken
  emailTokenExpirationDate
  password
  googleId
  createdAt
  updatedAt
  tags {
    id
    name
    notes {
      id
      title
      content
    }
    createdAt
    updatedAt
  }
  notes {
    id
    title
    content
    tags {
      id
      name
    }
    createdAt
    updatedAt
  }
}
`;
