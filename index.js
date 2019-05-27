const knex = require("knex");
const express = require("express");
const helmet = require("helmet");
const router = require("express").Router();

const server = express();

server.use(express.json());
server.use(helmet());

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);
// endpoints here

router.get("/", (req, res) => {
  db("roles");
  // get the roles from the database
  res.send("Write code to retrieve all roles");
});

router.get("/:id", (req, res) => {
  // retrieve a role by id
  res.send("Write code to retrieve a role by id");
});

router.post("/", (req, res) => {
  // add a role to the database
  res.send("Write code to add a role");
});

router.put("/:id", (req, res) => {
  // update roles
  res.send("Write code to modify a role");
});

router.delete("/:id", (req, res) => {
  // remove roles (inactivate the role)
  res.send("Write code to remove a role");
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
