import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createProduct() {
  await prisma.$connect();

  await prisma.product.create({
    data: {
      name: "Air75 Wireless Mechanical Keyboard",
      Description:
        "NuPhy Air75 is an innovative 75% ultra-slim wireless mechanical keyboard. With the world’s thinnest PBT spherical keycap, low-latency 2.4G wireless connection, and hot-swappable function, Air75 aims to become the new standard for slim mechanical keyboards.",
      price: 110,
      countInStock: 10,
      urlImage:
        "https://cdn.shopify.com/s/files/1/0268/7297/1373/products/air75_001_5f608bc9-0626-404e-aba5-c8d31d2cc164_1080x.jpg?v=1654843783",
    },
  });
}

createProduct()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
