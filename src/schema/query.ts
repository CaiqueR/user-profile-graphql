export const queryTypeDefs = `
type Query {
  users: [User]
  user(filter: UserFilter!): User
  profiles: [Profile]
  profile(filter: ProfileFilter!): Profile
}
`;