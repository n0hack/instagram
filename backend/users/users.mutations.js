import bcrypt from 'bcrypt';
import client from '../client';

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password }) => {
      // DB에 유저가 있는지 확인 (OR 필터링)
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 10);

      // 유저 저장 및 반환
      // await 하지 않아도, 브라우저의 waiting property 덕분에 기다려준다.
      return client.user.create({ data: { firstName, lastName, username, email, password: hashedPassword } });
    },
  },
};
