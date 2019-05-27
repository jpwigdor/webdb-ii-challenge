const knex = require("knex");
const router = require("express").Router();

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3" //from the root folder
  },
  useNullAsDefault: true
  // debug: true
};
const db = knex(knexConfig);

// endpoints here

// POST
router.post("/", (req, res) => {
  db("zoos")
    .insert(req.body, "id")
    .then(ids => {
      return db("zoos")
        .where({ id: ids[0] })
        .first()
        .then(results => {
          res.status(201).json(results);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(500).json({ message: "Some useful error message" });
    });
});

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
        .json({ error, error: "Unable to retrieve the specified request." });
    });
});

// (Get - zoos by id)
router.get("/:id", (req, res) => {
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
      res
        .status(404)
        .json({ error, error: "The specified id does not exists." });
    });
});

router.delete("/:id", (req, res) => {
  //filter then delete!
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record"} deleted`
        });
      } else {
        res.status(404).json({ message: "Zoo does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // filter and then update!
  db("zoos")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record"} updated`
        });
      } else {
        res.status(404).json({ message: "Zoo does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
