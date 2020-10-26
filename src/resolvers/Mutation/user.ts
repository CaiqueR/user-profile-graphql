import bcrypt from 'bcrypt';
import { Users, UsersListAction } from '../../entities/Users';

const mutations = {
  async newUser(_, { data }, ctx) {
    ctx?.validateAdmin();

    const newData: Users = { ...data };
    if (!newData?.profiles || !newData?.profiles.length) {
      newData.profiles = [{
        id: 1,
        label: 'Comum',
        name: 'comum',
        userprofile: [],
      }];
    }

    const salt = bcrypt.genSaltSync();
    newData.password = bcrypt.hashSync(newData.password, salt);

    const newUser = await UsersListAction().save({ ...newData });
    return newUser;
  },
  registerUser(_, { data }, ctx) {
    ctx?.validateAdmin();

    return mutations.newUser(_, {
      data: {
        name: data.name,
        password: data.password,
        email: data.email,
      },
    }, null);
  },
  async removeUser(_, { filter }) {
    const userToRemove = await UsersListAction().findOne({ ...filter });

    const userToRemoveCopy = { ...userToRemove };
    await UsersListAction().remove(userToRemove);

    return userToRemoveCopy;
  },
  async updateUser(_, { filter, data }, ctx) {
    ctx?.validateUserFilter(filter);
    const userToUpdate = await UsersListAction().findOne({ ...filter });

    const newUser: Users = { ...userToUpdate, ...data };

    if (data.password) {
      const salt = bcrypt.genSaltSync();

      newUser.password = bcrypt.hashSync(data.password, salt);
    }

    await UsersListAction().save(newUser);

    return newUser;
  },
};

export default mutations;
