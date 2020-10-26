import jwt from 'jwt-simple';

import getProfiles from '../Type/User';

export default {
  async getLoggedUser(user) {
    const profiles = await getProfiles.profiles(user);
    const now = Math.floor(Date.now() / 1000);

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      profiles: profiles.map((profile) => profile.name),
      iat: now,
      exp: now + (3 * 24 * 60 * 60),
    };

    const authSecret = process.env.AUTH_SECRET;

    return {
      ...userInfo,
      token: jwt.encode(userInfo, authSecret),
    };
  },
};
