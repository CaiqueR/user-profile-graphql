export const usersTypeDefs = `
type User {
  id: Int
  name: String!
  email: String!
  active: Boolean!
  profiles: [Profile]
}

input UserInput {
  name: String
  email: String
  password: String
  profiles: [ProfileFilter]
}

input UserFilter {
  id: Int
  email: String
}
`;
