import { UsersListAction } from '../../entities/Users';

export default {
  async users() {
    const users = await UsersListAction().find();
    return users;
  },
  async user(_, { filter }) {
    const user = await UsersListAction().findOne({ ...filter });

    return user;
  },
};
