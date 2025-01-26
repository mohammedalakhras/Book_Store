const express = require("express");
const app = express();

const authors = require("./routes/authors");
const bookPath = require("./routes/book");

const UserPath =require('./routes/users')
const AuthPath =require('./routes/auth')



const mongoose = require("mongoose");

const { Logger } = require("./middlewares/Logger");
const { errorHandler, notFound } = require("./middlewares/Errors");


//Connection to DB
mongoose
  .connect(process.env.MongooDBConnection)
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((e) => {
    console.log("Error:", e);
  });
// app.get();
// app.post()
// app.put();
// app.delete();
app.use(express.json());

app.use(Logger);

app.use("/api/books", bookPath);
app.use("/api/authors", authors);
app.use("/api/auth", AuthPath);
app.use("/api/users", UserPath);

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} Mode on Port ${PORT}`);
});
