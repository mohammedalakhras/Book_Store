const express = require("express");
const app = express();

const authors = require("./routes/authors");
const bookPath = require("./routes/book");

const mongoose = require("mongoose");
//Connection to DB
mongoose
  .connect("mongodb://localhost/bookStoreDB")
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
app.use("/api/books", bookPath);

app.use("/api/authors", authors);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
