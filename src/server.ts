import { createConnection } from 'typeorm';
import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import express, { Request, Response } from 'express';
import resolvers from './resolvers';
import {
  mutationTypeDefs, profileTypeDefs, queryTypeDefs, usersTypeDefs,
} from './schema';
import { ProfilesListAction } from './entities/Profiles';
import { UsersListAction } from './entities/Users';

const schema = makeExecutableSchema({
  typeDefs: [mutationTypeDefs, profileTypeDefs, queryTypeDefs, usersTypeDefs],
  resolvers,
});

const server = new ApolloServer({
  schema,
});

createConnection().then(async () => {
  server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`);
  });

  const app = express();
  app.use(express.json());

  app.get('/seed', async (req: Request, res: Response) => {
    const profiles = await ProfilesListAction().save([{ label: 'Comum', name: 'Comum' }, { label: 'Admin', name: 'admin' }, { label: 'Master', name: 'master' }]);
    const users = await UsersListAction().save([{ name: 'Joaozim Snow', password: '12345', email: 'jshsnow@email.com' }, { name: 'Jaiminho', password: '12345', email: 'jaiminho@gmail.com' }, { name: 'Larissa', password: '12345', email: 'lara@larissa.com' }]);

    profiles[0].userprofile = [users[0], users[1]];
    await ProfilesListAction().save(profiles[0]);
    profiles[1].userprofile = [users[1], users[2]];
    await ProfilesListAction().save(profiles[1]);
    profiles[2].userprofile = [users[0], users[1], users[2]];
    await ProfilesListAction().save(profiles[2]);

    return res.json({ profiles, users });
  });

  app.listen(3333, () => {
    console.log('Express 3333');
  });
});
