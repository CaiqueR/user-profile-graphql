import bcrypt from 'bcrypt';
import { UsersListAction } from '../../entities/Users';
import getUser from '../common/user';

export default {
  async login(_, { data }) {
    const user = await UsersListAction().findOne({ email: data.email });

    if (!user) {
      throw new Error('Usuário/Senha inválido');
    }

    const areEquals = bcrypt.compareSync(data.password, user.password);

    if (!areEquals) {
      throw new Error('Usuário/Senha inválido');
    }

    return getUser.getLoggedUser(user);
  },
  async users() {
    const users = await UsersListAction().find();
    return users;
  },
  async user(_, { filter }) {
    const user = await UsersListAction().findOne({ ...filter });

    return user;
  },
};
