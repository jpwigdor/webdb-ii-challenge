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

// (Get - zoos)
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(201).json(zoos);
    })
    .catch(error => {
      res
        .status(404)
        .json({ error: "Unable to retrieve the specified request." });
    });
});

// (Get - zoos by id)
server.get("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(201).json(zoo);
      } else {
        res.status(404).json({ message: "Zoo not found." });
      }
    })
    .catch(error => {
      res.status(404).json({ error: "The specified id does not exists." });
    });
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
