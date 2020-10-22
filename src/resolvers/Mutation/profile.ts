import { ProfilesListAction } from '../../entities/Profiles';

export default {
  async newProfile(_, { data }) {
    const newProfile = await ProfilesListAction().save({ ...data });

    return newProfile;
  },
  async removeProfile(_, { filter }) {
    const profileToRemove = await ProfilesListAction().findOne({ ...filter });

    const ProfilesListActionCopy = { ...profileToRemove };
    await ProfilesListAction().remove(profileToRemove);

    return ProfilesListActionCopy;
  },
  async updateProfile(_, { filter, data }) {
    const profileToUpdate = await ProfilesListAction().findOne({ ...filter });

    const newProfile = { ...profileToUpdate, ...data };

    await ProfilesListAction().save(newProfile);

    return newProfile;
  },
};
