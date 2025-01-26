const experss = require("express");
const mongoose = require("mongoose");
const router = experss.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { validateUpdatedUser, User } = require("../models/User");
const { verifyToken } = require("../middlewares/verifyToken");

/**
 *@description Update user
 *@route /api/users/:id
 *@method PUT
 *@access private
 */

// router.put(
//   "/:id",
//   asyncHandler(async (req, res) => {
//
// );

router.put(
  "/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (req.body.id != req.user.id) {
      res.status(403).json({ msg: "Unauthorized" });
    }
    const { err } = validateUpdatedUser(req.body);
    if (err) {
      return res.status(400).json({ message: err.details[0].message });
    }

    //hash password if it will updated

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, slat);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      },
      { new: true }
    );

    res.status(200).json({ updatedUser });
  })
);
module.exports = router;
