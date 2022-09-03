import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createProduct(input: {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  urlImage: string;
}) {
  try {
    // Connect the client
    await prisma.$connect();
    // ... you will write your Prisma Client queries here
    await prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        countInStock: input.countInStock,
        urlImage: input.urlImage,
      },
    });
    const allProduct = await prisma.product.findMany();
    console.log(allProduct);

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return {
      success: false,
      message: "the Product not created successfully",
    };
  }
}

const appRouter = trpc
  .router()
  .query("getProducts", {
    async resolve() {
      const allProduct = await prisma.product.findMany();
      return allProduct;
    },
  })
  .mutation("addProduct", {
    input: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      countInStock: z.number(),
      urlImage: z.string(),
    }),
    async resolve({ input }) {
      const { success, message } = await createProduct(input);

      if (success === true) {
        return message;
      } else {
        return message;
      }
    },
  });

export type appRouter = typeof appRouter;

const app = express();

app.use(cors());

const port = 8080;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.listen(port, () => {
  console.log(`api-service listening at http://localhost:${port}`);
});
