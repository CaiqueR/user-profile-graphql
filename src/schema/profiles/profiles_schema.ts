export const profileTypeDefs = `
type Profile {
  id: Int
  name: String!
  label: String!
  users: [User]
}

input ProfileInput {
  name: String
  label: String
}

input ProfileFilter {
  id: Int
  name: String
}
`;
