import { UsersListAction } from '../../entities/Users';

export default {
  async profiles(user) {
    const { profiles } = await UsersListAction().findOne(user.id, { relations: ['profiles'] });
    return profiles;
  },
};
