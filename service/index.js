const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const DB = require("./database.js");

const authCookieName = "token";

let users = {};
let prices = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static("public"));

app.set("trust proxy", true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post("/auth/login", async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth token if stored in cookie
apiRouter.delete("/auth/logout", (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// get prices
apiRouter.get("/prices", (_req, res) => {
  if (prices.length === 0) {
    readGrocerPricesFromCsv().then((data) => {
      prices = data;
    });
  }
  res.send(prices);
});

apiRouter.post("/list", async (req, res) => {
  console.log("adding to list");
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    await DB.addList(user.email, req.body.product);
    res.status(201).send();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

apiRouter.get("/list", async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    const list = await DB.getList(user.email);
    res.send(list);
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

apiRouter.delete("/list", async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    await DB.removeFromList(user.email, req.body.product);
    res.status(204).send();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

async function readGrocerPricesFromCsv() {
  //using this csv as a temporary database
  const products = [];
  return new Promise((resolve) => {
    fs.createReadStream(path.resolve("GroceryData.csv"))
      .pipe(csv())
      .on("data", (row) => {
        const { Item, Image, ...storePrices } = row;

        const pricesRead = Object.entries(storePrices)
          .filter(([key, value]) => key !== "Unit Size" && value)
          .map(([store, price]) => ({ store, price: parseFloat(price) }));

        products.push({
          name: Item,
          imgSrc: Image,
          prices: pricesRead,
        });
      })
      .on("end", () => {
        resolve(products);
      });
  });
}
