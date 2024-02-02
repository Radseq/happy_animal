import { TRPCError } from "@trpc/server";
import { CreateRateLimit } from "RateLimit";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const postRateLimit = CreateRateLimit({ requestCount: 1, requestCountPer: "1 m" })

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {

      const { success } = await postRateLimit.limit("Create Post")

			if (!success) {
				throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
			}

      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
