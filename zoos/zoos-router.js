const knex = require("knex");
const router = require("express").Router();

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3" //from the root folder
  },
  useNullAsDefault: true,
  debug: true
};
const db = knex(knexConfig);

// endpoints here

// (Get - zoos)
router.get("/", (req, res) => {
  db("zoos")
    .then(zoos => {
      console.log(zoos);
      res.status(201).json(zoos);
    })
    .catch(error => {
      res
        .status(404)
        .json({ error: "Unable to retrieve the specified request." });
    });
});

// (Get - zoos by id)
router.get("/api/zoos/:id", (req, res) => {
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

// POST
router.post("/", (req, res) => {
  db("zoos")
    .insert(req.body, "id")
    .then(results => {
      res.status(201).json(results);
    })
    .catch(err => {
      res.status(500).json({ message: "Some useful error message" });
    });
});

router.put("/:id", (req, res) => {
  // update roles
  res.send("Write code to modify a role");
});

router.delete("/:id", (req, res) => {
  // remove roles (inactivate the role)
  res.send("Write code to remove a role");
});

module.exports = router;
