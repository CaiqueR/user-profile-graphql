export const usersTypeDefs = `
type User {
  id: Int
  name: String!
  email: String!
  active: Boolean!
  profiles: [Profile]
  token: String
}

input UserInput {
  name: String
  email: String
  password: String
  profiles: [ProfileFilter]
}

input UserRegisterInput {
  name: String!
  email: String!
  password: String!
}

input UserLoginInput{
  email: String!
  password: String!
}

input UserFilter {
  id: Int
  email: String
}
`;
