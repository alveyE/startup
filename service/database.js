const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db("aisleHawk");
const userCollection = db.collection("user");
const listsCollection = db.collection("lists");

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(
    `Unable to connect to database with ${url} because ${ex.message}`
  );
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function addList(username, product) {
  const list = await listsCollection.findOne({ username: username });

  if (list) {
    await listsCollection.updateOne(
      { username: username },
      { $push: { products: product } }
    );
  } else {
    await listsCollection.insertOne({
      username: username,
      products: [product],
    });
  }
}

async function removeFromList(username, product) {
  const list = await listsCollection.findOne({ username: username });
  if (list) {
    await listsCollection.updateOne(
      {
        username: username,
      },
      {
        $pull: { products: product },
      }
    );
  }
}

async function getList(username) {
  const list = await listsCollection.findOne({ username: username });
  return list ? list.products : [];
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addList,
  removeFromList,
  getList,
};
