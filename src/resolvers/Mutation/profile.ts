import { ProfilesListAction } from '../../entities/Profiles';

export default {
  async newProfile(_, { data }, ctx) {
    ctx?.validateAdmin();

    const newProfile = await ProfilesListAction().save({ ...data });

    return newProfile;
  },
  async removeProfile(_, { filter }, ctx) {
    ctx?.validateAdmin();

    const profileToRemove = await ProfilesListAction().findOne({ ...filter });

    const ProfilesListActionCopy = { ...profileToRemove };
    await ProfilesListAction().remove(profileToRemove);

    return ProfilesListActionCopy;
  },
  async updateProfile(_, { filter, data }, ctx) {
    ctx?.validateAdmin();

    const profileToUpdate = await ProfilesListAction().findOne({ ...filter });

    const newProfile = { ...profileToUpdate, ...data };

    await ProfilesListAction().save(newProfile);

    return newProfile;
  },
};
