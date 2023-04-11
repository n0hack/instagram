import jwt from 'jsonwebtoken';
import client from '../client.js';

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

// 고차 함수를 이용해 resolver를 감싸는 함수
export const protectedResolver = (resolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: '로그인이 필요한 액션입니다.',
    };
  }

  return resolver(root, args, context, info);
};
