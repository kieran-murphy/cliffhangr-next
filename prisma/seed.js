const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const showsData = require("../data/shows.json");

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
    const password = "password";

    users.push({
      username: username,
      email: email,
      password: password,
    });
  }

  // Add test user for development purposes
  users.push({
    username: "testuser",
    email: "testuser@cliffhangr.com",
    password: "password",
  });

  try {
    for (let user of users) {
      try {
        await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user }),
        });
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

const populateFollows = async () => {
  const userIds = [];

  const users = await prisma.user.findMany();

  users.map((user) => userIds.push(user.id));

  try {
    for (let userId of userIds) {
      for (let secondUserId of userIds) {
        const randomNumber = Math.floor(Math.random() * 40);
        if (randomNumber > 38) {
          await prisma.follow.create({
            data: {
              followerId: userId,
              followingId: secondUserId,
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

const populateShows = async () => {
  try {
    for (let show of showsData.shows) {
      await prisma.show.create({
        data: {
          title: show.title,
          image: "/images/" + show.img,
          year: show.year,
          seasons: show.seasons,
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

const populateWatchlists = async () => {
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
          await prisma.watchlistShow.create({
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
  const usersData = [];
  const showsData = [];

  const users = await prisma.user.findMany();
  const shows = await prisma.show.findMany();

  users.map((user) => {
    usersData.push({ id: user.id, username: user.username });
  });

  shows.map((show) => {
    showsData.push({ id: show.id, title: show.title });
  });

  try {
    for (let user of usersData) {
      for (let show of showsData) {
        const randomNumber = Math.floor(Math.random() * 5);
        if (randomNumber > 3) {
          const rating = Math.random() * 4 + 1;
          await prisma.review.create({
            data: {
              userId: user.id,
              showId: show.id,
              title: show.title,
              text: faker.word.words(10),
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
  const users = await prisma.user.findMany();
  const reviews = await prisma.review.findMany();

  const userData = users.map((user) => ({
    id: user.id,
  }));

  try {
    for (let user of userData) {
      for (let review of reviews) {
        const randomNumber = Math.floor(Math.random() * 30);
        if (randomNumber > 28) {
          await prisma.commentOnReview.create({
            data: {
              userId: user.id,
              reviewId: review.id,
              text: faker.word.words(10),
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
  const reviewIds = [];
  const reacts = ["LIKE", "LOVE", "LAUGH", "WOW", "ANGRY"];

  const users = await prisma.user.findMany();
  const reviews = await prisma.review.findMany();

  // Create an array of user objects with id and username
  const userObjects = users.map((user) => ({
    id: user.id,
  }));
  reviews.map((review) => reviewIds.push(review.id));

  try {
    for (let user of userObjects) {
      for (let reviewId of reviewIds) {
        const randomNumber = Math.floor(Math.random() * 30);
        const randomReact = reacts[Math.floor(Math.random() * reacts.length)];
        if (randomNumber > 28) {
          await prisma.reactOnReview.create({
            data: {
              userId: user.id,
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

const main = async () => {
  await populateUsers();
  await populateFollows();
  await populateShows();
  await populateFavorites();
  await populateWatchlists();
  await populateReviews();
  await populateReactOnReviews();
  await populateComments();
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
