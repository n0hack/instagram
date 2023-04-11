import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../../client';

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      // DB에 username과 일치하는 유저가 있는지 확인
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return { ok: false, error: '유저가 존재하지 않습니다.' };
      }

      // 비밀번호 확인
      const checkedPassword = await bcrypt.compare(password, user.password);
      if (!checkedPassword) {
        return { ok: false, error: '비밀번호가 일치하지 않습니다.' };
      }

      // 두 조건을 만족하면, 토큰 생성 후 반환 (JWT)
      // 토큰에는 비밀번호와 같은 개인정보를 담아서는 안 됨
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
