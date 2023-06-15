import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'You are logged in and can see this secret message!';
  }),
  getRole:  protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      if (input) {
        return ctx.prisma.user.findUnique({
          where: {
            id: input,
          },
          select: {
            role: true,
          },
        });
      }
    } ),
});
