const express = require("express");
const { object } = require("joi");

const router = express.Router();
const Joi = require("joi");
const { Author } = require("../models/Author");
const authors = [
  {
    id: 1,
    firstname: "Mohammed",
    lastnamme: "Alakhras",
    nationality: "Syria",
    image: "1.png",
  },
  {
    id: 2,
    firstname: "Ahmed",
    lastnamme: "Hazem",
    nationality: "Egypt",
    image: "2.png",
  },
  {
    id: 3,
    firstname: "Alia",
    lastnamme: "Maher",
    nationality: "Lebanon",
    image: "3.png",
  },
];

/**
 *@description get all authors
 *@route /api/authors
 *@method GET
 *@access public
 */

router.get("/", (req, res) => {
  res.status(200).json(authors);
});

/**
 *@description get author by id
 *@route /api/authors
 *@method GET
 *@access public
 */

router.get("/:id", (req, res) => {
  const auth = authors.find((e) => e.id === parseInt(req.params.id));
  if (auth) {
    res.status(200).json(auth);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

/**
 *@description get specific author by id
 *@route /api/authors
 *@method POST
 *@access public
 */

router.post("/", async (req, res) => {
  const { err } = CheckInsertAuthor(req.body);
  if (err) {
    res.status(400).json({ message: err.details[0].message });
  } else {
  }
  const auth = new Author({
    id: authors.length + 1,
    firstname: req.body.firstname,
    lastnamme: req.body.lastnamme,
    nationality: req.body.nationality,
    image: req.body.image,
  });
  const result =await auth.save();

  res.status(201).json(result);
});

/**
 *@description Update Author
 *@route /api/authors
 *@method PUT
 *@access public
 */

router.put("/:id", (req, res) => {
  const { err } = CheckUpdatetAuthor(req.body);

  if (err) {
    return res.status(400).json({ message: err.details[0].message });
  }

  const author = authors.find((b) => b.id === parseInt(req.params.id));

  if (author) {
    res.status(200).json({ message: "Updated " });
  } else {
    res.status(404).json({ message: "Not Found " });
  }
});

/**
 *@description delete author
 *@route /api/authors/:id
 *@method delete
 *@access public
 */
router.delete("/:id", (req, res) => {
  const author = authors.find((b) => b.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json({ msg: "Deleted" });
  } else {
    res.status(400).json({ mgs: "not found" });
  }
});

function CheckInsertAuthor(data) {
  const schema = Joi.object({
    firstname: Joi.string().trim().max(30).min(2).required(),
    lastnamme: Joi.string().trim().max(30).min(2).required(),
    nationality: Joi.string().trim().max(30).min(2).required(),
    image: Joi.string().trim(),
  });
  return schema.validate(data);
}

function CheckUpdatetAuthor(data) {
  const schema = Joi.object({
    firstname: Joi.string().trim().max(30).min(2),
    lastnamme: Joi.string().trim().max(30).min(2),
    nationality: Joi.string().trim().max(30).min(2),
    image: Joi.string().trim(),
  });
  return schema.validate(data);
}

module.exports = router;
