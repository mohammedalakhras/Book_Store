const express = require("express");
const router = express.Router();
const Joi = require("joi");

const books = [
  {
    id: 1,
    author: "Chinua Achebe",
    country: "Nigeria",
    year: 1958,
  },
  {
    id: 2,
    author: "Hans Christian Andersen",
    country: "Denmark",
    year: 1836,
  },
  {
    id: 3,
    author: "Dante Alighieri",
    country: "Italy",
    title: "The Divine Comedy",
    year: 1315,
  },
];
//   router.get("/", (req, res) => {
//     res.send("Hello Mohammed");
//   });

//        ALL Books
router.get("/", (req, res) => {
  res.json(books);
});

// Specific Book

router.get("/:iden", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.iden));

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ msg: "not found" });
  }
});

//   router.POST
// use mmiddleware
//   router.use(express.json());

// USE JOI

router.post("/", (req, res) => {
  console.log(req.body);

  const { error } = ValidateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = {
    id: books.length + 1,
    author: req.body.author,
    country: req.body.country,
    title: req.body.title,
    year: req.body.year,
  };
  console.log("Book is :", book);

  books.push(book);

  res.status(201).json(book);
});

router.put("/:id", (req, res) => {
  const { error } = ValidateUpdateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (book) {
    res.status(200).json({ message: "Updated " });
    
  } else {
    res.status(404).json({ message: "Not Found " });
  }
});


/**
 *@description delete author
 *@route /api/books/:id
 *@method delete
 *@access public
 */
 router.delete("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json({ msg: "Deleted" });
  } else {
    res.status(400).json({ mgs: "not found" });
  }
});

function ValidateCreateBook(obj) {
  const schema = Joi.object({
    author: Joi.string().min(3).max(50).required(),
    country: Joi.string().min(3).max(20).required(),
    title: Joi.string().trim().min(3).max(20).required(),
    year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
  });
  return schema.validate(obj);
}

function ValidateUpdateBook(obj) {
  const schema = Joi.object({
    author: Joi.string().min(3).max(50),
    country: Joi.string().min(3).max(20),
    title: Joi.string().trim().min(3).max(20),
    year: Joi.number().min(1900).max(new Date().getFullYear()),
  });
  return schema.validate(obj);
}
module.exports = router;
