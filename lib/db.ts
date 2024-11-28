import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function test() {
  const user = await db.user.create({
    data: {
      username: 'test',
      password: '12345',
      email: 'test@nomadcoders.co',
      bio: 'Software developer.',
    },
  });
  console.log(user);
}
test();

// async function test() {
//   const users = await db.user.findMany({
//     where: {
//       username: 'test',
//     },
//   });
//   console.log(users);
// }

// test();

export default db;
