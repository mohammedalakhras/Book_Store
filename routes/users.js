const experss = require("express");
const mongoose = require("mongoose");
const router = experss.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { validateUpdatedUser, User } = require("../models/User");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

/**
 *@description Update user
 *@route /api/users/:id
 *@method PUT
 *@access private
 */

router.put(
  "/:id",
  verifyTokenAndAuth,
  asyncHandler(async (req, res) => {
    const { err } = validateUpdatedUser(req.body);
    if (err) {
      return res.status(400).json({ message: err.details[0].message });
    }

    //hash password if it will updated

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
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
    ).select("-password");

    return res.status(200).json(updatedUser);
  })
);

/**
 *@description get All Users
 *@route /api/users/
 *@method GET
 *@access private (only admin)
 */

router.get(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  })
);

/**
 *@description get User by ID
 *@route /api/users/:id
 *@method GET
 *@access private (only admin and user himself)
 */

router.get(
  "/:id",
  verifyTokenAndAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if(user)
    return res.status(200).json(user);
  else
  return res.status(404).json({msg:'User Not Found'});
  })
);

/**
 *@description delete User by ID
 *@route /api/users/:id
 *@method DELETE
 *@access private (only admin and user himself)
 */

 router.delete(
  "/:id",
  verifyTokenAndAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if(user)
    return res.status(200).json({msg:'User Deleted'});
  else
  return res.status(404).json({msg:'User Not Found'});
  })
);




module.exports = router;
