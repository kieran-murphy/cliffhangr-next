const { PrismaClient } = require("@prisma/client");
const faker = require("faker");

const prisma = new PrismaClient();

const generatedUsernames = new Set();

const generateUniqueUsername = () => {
  let username;
  do {
    username = faker.internet.userName(); // or any other logic you'd like
  } while (generatedUsernames.has(username));
  generatedUsernames.add(username);
  return username;
};

const populateUsers = async () => {
  const userCount = 100;
  const users = [];

  for (let i = 0; i < userCount; i++) {
    const username = generateUniqueUsername();
    const email = `${username}@cliffhangr.com`;
    users.push({
      username: username,
      email: email,
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

const populateShows = async () => {
  const titles = [
    "breaking bad",
    "ozark",
    "better call saul",
    "wandavision",
    "lost",
    "gossip girl",
    "the office",
    "brooklyn nine nine",
    "my 600lb life",
    "married at first site",
  ];

  try {
    for (let title of titles) {
      await prisma.show.create({
        data: {
          title: title,
        },
      });
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

const populateFavorites = async () => {
  const userIds = [];
  const showIds = [];

  const users = await prisma.user.findMany();
  const shows = await prisma.show.findMany();

  users.map((user) => userIds.push(user.id));
  shows.map((show) => showIds.push(show.id));

  try {
    for (let userId of userIds) {
      for (let showId of showIds) {
        const randomNumber = Math.floor(Math.random() * 6);
        if (randomNumber > 4) {
          await prisma.favoriteShow.create({
            data: {
              userId: userId,
              showId: showId,
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

const populateReviews = async () => {
  const userIds = [];
  const showIds = [];

  const users = await prisma.user.findMany();
  const shows = await prisma.show.findMany();

  users.map((user) => userIds.push(user.id));
  shows.map((show) => showIds.push(show.id));

  try {
    for (let userId of userIds) {
      for (let showId of showIds) {
        const randomNumber = Math.floor(Math.random() * 5);
        if (randomNumber > 3) {
          const rating = Math.random() * 4 + 1;
          await prisma.review.create({
            data: {
              userId: userId,
              showId: showId,
              // text: faker.word.words(10),
              text: "This is a review",
              rating: parseFloat(rating.toFixed(1)),
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

const populateComments = async () => {
  const userIds = [];
  const reviewIds = [];

  const users = await prisma.user.findMany();
  const reviews = await prisma.review.findMany();

  users.map((user) => userIds.push(user.id));
  reviews.map((review) => reviewIds.push(review.id));

  try {
    for (let userId of userIds) {
      for (let reviewId of reviewIds) {
        const randomNumber = Math.floor(Math.random() * 30);
        if (randomNumber > 28) {
          await prisma.commentOnReview.create({
            data: {
              userId: userId,
              reviewId: reviewId,
              // text: faker.word.words(10),
              text: "This is a comment",
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

const populateReactOnReviews = async () => {
  const userIds = [];
  const reviewIds = [];
  const reacts = ["LIKE", "LOVE", "LAUGH", "WOW", "ANGRY"];

  const users = await prisma.user.findMany();
  const reviews = await prisma.review.findMany();

  users.map((user) => userIds.push(user.id));
  reviews.map((review) => reviewIds.push(review.id));

  try {
    for (let userId of userIds) {
      for (let reviewId of reviewIds) {
        const randomNumber = Math.floor(Math.random() * 30);
        const randomReact = reacts[Math.floor(Math.random() * reacts.length)];
        if (randomNumber > 28) {
          await prisma.reactOnReview.create({
            data: {
              userId: userId,
              reviewId: reviewId,
              react: randomReact,
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

const populateReactOnComments = async () => {
  const userIds = [];
  const commentIds = [];
  const reacts = ["LIKE", "LOVE", "LAUGH", "WOW", "ANGRY"];

  const users = await prisma.user.findMany();
  const comments = await prisma.commentOnReview.findMany();

  users.map((user) => userIds.push(user.id));
  comments.map((comment) => commentIds.push(comment.id));

  try {
    for (let userId of userIds) {
      for (let commentId of commentIds) {
        const randomNumber = Math.floor(Math.random() * 50);
        const randomReact = reacts[Math.floor(Math.random() * reacts.length)];
        if (randomNumber > 48) {
          await prisma.reactOnComment.create({
            data: {
              userId: userId,
              commentId: commentId,
              react: randomReact,
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

const main = async () => {
  await populateUsers();
  await populateShows();
  await populateFavorites();
  await populateReviews();
  await populateReactOnReviews();
  await populateComments();
  await populateReactOnComments();
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
