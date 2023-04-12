import bcrypt from 'bcrypt';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import jwt from 'jsonwebtoken';
import client from '../client.js';
import fs from 'fs';
import { protectedResolver } from './users.utils.js';

export default {
  Upload: GraphQLUpload,
  Query: {
    seeProfile: (_, { username }) => client.user.findUnique({ where: { username } }),
  },
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
    editProfile: protectedResolver(
      async (_, { firstName, lastName, username, email, password, bio, avatar }, { loggedInUser }) => {
        const { filename, createReadStream } = await avatar;
        // 파일 업로드를 위해서는 스트림을 파이프로 연결하면 끝
        const readStream = createReadStream();
        const writeStream = fs.createWriteStream(`${process.cwd()}/uploads/${filename}`);

        readStream.pipe(writeStream);

        let hashedPassword;
        if (password) {
          hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: { firstName, lastName, username, email, bio, ...(hashedPassword && { password: hashedPassword }) },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: '프로필 업데이트가 불가능합니다.',
          };
        }
      }
    ),
  },
};
