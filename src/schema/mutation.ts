export const mutationTypeDefs = `
type Mutation {
  # Virgula opcional
  # Mutations de User
  newUser(
      data: UserInput!
  ): User!

  removeUser(
      filter: UserFilter!
  ): User

  updateUser(
      filter: UserFilter!
      data: UserInput!
  ): User

  # Mutations de Profile
  newProfile(
      data: ProfileInput!
  ): Profile!

  removeProfile(
      filter: ProfileFilter!
  ): Profile

  updateProfile(
      filter: ProfileFilter!
      data: ProfileInput!
  ): Profile
}
`;
