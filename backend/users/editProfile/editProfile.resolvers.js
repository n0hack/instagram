import bcrypt from 'bcrypt';
import client from '../../client';

export default {
  Mutation: {
    editProfile: async (_, { firstName, lastName, username, email, password }, { loggedInUser }) => {
      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
        data: { firstName, lastName, username, email, ...(hashedPassword && { password: hashedPassword }) },
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
    },
  },
};
