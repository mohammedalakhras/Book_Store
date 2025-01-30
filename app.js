const express = require("express");
const app = express();
const { connectToDB } = require("./config/db");

//Routes
// const authors = require("./routes/authors");
// const bookPath = require("./routes/book");
// const UserPath =require('./routes/users')
// const AuthPath =require('./routes/auth')

//Middlewares

const { Logger } = require("./middlewares/Logger");
const { errorHandler, notFound } = require("./middlewares/Errors");

//Connection to DB
connectToDB();

// app.get();
// app.post()
// app.put();
// app.delete();

app.use(express.json());

app.use(Logger);

app.use("/api/books", require("./routes/book"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} Mode on Port ${PORT}`);
});
