import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@gmail.com',
            password: 'admin',
            role: 'admin',
        },
    })

    const user = await prisma.user.create({
        data: {
          username: 'example_user',
          email: 'user@example.com',
          password: 'password123',
          role: 'user',
          cart: {
            create: {
              total: 0,
              closed: false,
              CartItem: {
                create: {
                  quantity: 2,
                  price: 436.00,
                  product: {
                    create: {
                      name: 'Product 1',
                      description: 'Description for Product 1',
                      price: 218.00,
                      imageUrl: './welcomePage/assets/img/camisetablockk.png',
                    }
                  }
                }
              }
            }
          }
        },
        include: {
          cart: {
            include: {
              CartItem: {
                include: {
                  product: true
                }
              }
            }
          }
        }
      });
    console.log({ admin, user})
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })