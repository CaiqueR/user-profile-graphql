import { ProfilesListAction } from '../../entities/Profiles';

export default {
  async profiles() {
    const profiles = await ProfilesListAction().find();
    return profiles;
  },
  async profile(_, { filter }) {
    const profile = await ProfilesListAction().findOne({ ...filter });

    return profile;
  },
};
