const express = require("express");

const router = express.Router();
const mongoose=require('mongoose')
const {
  Author,
  CheckInsertAuthor,
  CheckUpdatetAuthor,
} = require("../models/Author");

const asyncHandler = require("express-async-handler");

/**
 *@description get all authors
 *@route /api/authors
 *@method GET
 *@access public
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authorList = await Author.find().sort({ firstname: 1 }); //.select('firstname lastname');
    res.status(200).json(authorList);
  })
);

/**
 *@description get author by id
 *@route /api/authors
 *@method GET
 *@access public
 */

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
 
    const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid ID format" });
    // }

    const auth = await Author.findById(id);

    if (auth) {
      res.status(200).json(auth);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  })
);

/**
 *@description get specific author by id
 *@route /api/authors
 *@method POST
 *@access public
 */

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { err } = CheckInsertAuthor(req.body);
    if (err) {
      res.status(400).json({ message: err.details[0].message });
    } else {
    }
    const auth = new Author({
      firstname: req.body.firstname,
      lastnamme: req.body.lastnamme,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await auth.save();

    res.status(201).json(result);
  })
);

/**
 *@description Update Author
 *@route /api/authors
 *@method PUT
 *@access public
 */

router.put(
  "/:id",

  asyncHandler(async (req, res) => {
    const { err } = CheckUpdatetAuthor(req.body);

    if (err) {
      return res.status(400).json({ message: err.details[0].message });
    }

    // const author = authors.find((b) => b.id === parseInt(req.params.id));

    // if (author) {
    //   res.status(200).json({ message: "Updated " });
    // } else {
    //   res.status(404).json({ message: "Not Found " });
    // }

    const {id}=req.params;
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //   res.status(400).json({ message: "Invalid ID format" });
    // }
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      { new: true }
    );

    res.status(200).json(author);
  })
);

/**
 *@description delete author
 *@route /api/authors/:id
 *@method delete
 *@access public
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //   res.status(400).json({ message: "Invalid ID format" });
    // }
    
    const author = await Author.findById(req.params.id);

    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Deleted" });
    } else {
      res.status(400).json({ mgs: "not found" });
    }
  })
);

module.exports = router;
