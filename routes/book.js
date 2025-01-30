const express = require("express");
const router = express.Router();
const {
  ValidateCreateBook,
  ValidateUpdateBook,
  Book,
} = require("../models/Book");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

//   router.get("/", (req, res) => {
//     res.send("Hello Mohammed");
//   });

//        ALL Books
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate("author");
    res.status(200).json(books);
  })
);

// Specific Book

router.get(
  "/:iden",
  asyncHandler(async (req, res) => {
    // if (!mongoose.Types.ObjectId.isValid(req.params.iden)) {
    //   res.status(400).json({ msg: "Invalid ID Format" });
    // }

    const book = await Book.findById(req.params.iden).populate("author");

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ msg: "not found" });
    }
  })
);

//   router.POST
// use mmiddleware
//   router.use(express.json());

// USE JOI

/**
 * @description Create a new book
 * @route /api/books/
 * @method POST
 * @access private (Admin Only)
 */

router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = ValidateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    console.log("Book is :", book);

    const result = await book.save();

    res.status(201).json(result);
  })
);

/**
 * @description Update a book
 * @route /api/books/:id
 * @method PUT
 * @access private (Admin Only)
 */

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   res.status(400).json({ msg: "Invalid ID Format" });
    // }

    const { error } = ValidateUpdateBook(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      { new: true }
    );

    if (book) {
      res.status(200).json({ message: "Updated " });
    } else {
      res.status(404).json({ message: "Not Found " });
    }
  })
);

/**
 *@description delete book
 *@route /api/books/:id
 *@method delete
 *@access private (Admin Only)
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      const Deletedbook = await Book.findByIdAndDelete(req.params.id);

      res.status(200).json({ msg: "Deleted" });
    } else {
      res.status(400).json({ mgs: "not found" });
    }
  })
);

module.exports = router;
