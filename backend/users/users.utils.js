import jwt from 'jsonwebtoken';
import client from '../client';

/**
 * 토큰으로 유저를 찾는 유틸 함수
 * @param {*} token JWT 토큰
 * @returns User | null
 */
export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }

    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
