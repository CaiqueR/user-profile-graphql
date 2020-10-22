import { ProfilesListAction } from '../../entities/Profiles';

export default {
  async users(profile) {
    const { userprofile } = await ProfilesListAction().findOne(profile.id, { relations: ['userprofile'] });
    return userprofile;
  },
};
