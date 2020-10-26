import jwt from 'jwt-simple';

export function context({ req }) {
  const auth: string = req.headers.authorization || '';
  const [, token] = auth?.split(' ');

  let user = null;
  let admin = false;

  if (token) {
    try {
      const tokenContent = jwt.decode(token, process.env.AUTH_SECRET);

      if (new Date(tokenContent.exp * 1000) > new Date()) {
        user = tokenContent;
      }
    } catch (e) {
      throw new Error('Token inválido');
    }
  }

  if (user?.profiles) {
    admin = user.profiles.includes('admin');
  }

  const err = new Error('Acesso negado!');

  return {
    user,
    admin,
    validateUser() {
      if (!user) {
        throw err;
      }
    },
    validateAdmin() {
      if (!admin) {
        throw err;
      }
    },
    validateUserFilter(filter) {
      if (admin) {
        return;
      }

      if (!user) {
        throw err;
      }

      if (!filter) {
        throw err;
      }

      const { id, email } = filter;

      if (!id && !email) {
        throw err;
      }

      if (id && id !== user.id) {
        throw err;
      }

      if (email && email !== user.email) {
        throw err;
      }
    },
  };
}
