import { UsersListAction } from '../../entities/Users';

export default {
  async newUser(_, { data }) {
    const newUser = await UsersListAction().save({ ...data });

    return newUser;
  },
  async removeUser(_, { filter }) {
    const userToRemove = await UsersListAction().findOne({ ...filter });

    const userToRemoveCopy = { ...userToRemove };
    await UsersListAction().remove(userToRemove);

    return userToRemoveCopy;
  },
  async updateUser(_, { filter, data }) {
    const userToUpdate = await UsersListAction().findOne({ ...filter });

    const newUser = { ...userToUpdate, ...data };

    await UsersListAction().save(newUser);

    return newUser;
  },
};
