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

async function addList(list) {
  return listsCollection.insertOne(list);
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addList,
};