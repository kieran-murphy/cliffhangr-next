const { PrismaClient } = require("@prisma/client");
const faker = require("faker");

const prisma = new PrismaClient();

const generatedUsernames = new Set(); // Use a Set to store usernames, ensuring uniqueness

const generateUniqueUsername = () => {
  let username;
  do {
    username = faker.internet.userName(); // or any other logic you'd like
  } while (generatedUsernames.has(username));
  generatedUsernames.add(username);
  return username;
};

const main = async () => {
  const userCount = 100; // Or however many users you'd like to generate
  const users = [];

  for (let i = 0; i < userCount; i++) {
    const username = generateUniqueUsername();
    const email = `${username}@cliffhangr.com`; // derive email from username
    users.push({
      username: username,
      email: email, // add the email to the user data
      // ... other fields
    });
  }

  try {
    for (let user of users) {
      await prisma.user.create({ data: user });
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
