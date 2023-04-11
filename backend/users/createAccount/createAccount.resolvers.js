import bcrypt from 'bcrypt';
import client from '../../client';

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password }) => {
      try {
        // DB에 유저가 있는지 확인 (OR 필터링)
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });

        if (existingUser) {
          // GraphQL 결과 객체의 errors.message에서 확인 가능
          // Catch문에서 처리한다고 하면, 해당 에러를 받아서 반환해야 한다.
          throw new Error('이 username과 password는 이미 존재합니다.');
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 유저 저장 및 반환
        // await 하지 않아도, 브라우저의 waiting property 덕분에 기다려준다.
        return client.user.create({ data: { firstName, lastName, username, email, password: hashedPassword } });
      } catch (e) {
        return e;
      }
    },
  },
};
