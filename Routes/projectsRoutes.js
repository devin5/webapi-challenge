const express = require("express");
const db = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Need title and contents" });
  }
  db.insert({ name, description })
    .then(id => {
      console.log(id);
      res.status(200).json(id);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error inserting post" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // if (!name && !description) {
  //   return res.status(400).json({ error: "Need changes" });
  // }
  db.update(id, { name, description })
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error updating post" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Post with id does not exist" });
      }
    })
    .catch(err => {
      console.log("delete", err);
      res.status(500).json({ error: "Error deleting post" });
    });
});

router.get("/actions/:project_id", (req, res) => {
  const { project_id } = req.params;
  db.getProjectActions(project_id)
    .then(actions => {
      if (!actions.length) {
        return res.status(404).json({ error: "post with id does not exist" });
      }
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

module.exports = router;
