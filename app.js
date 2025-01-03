const express = require("express");
const app = express();

const authors =require('./routes/authors')
const bookPath = require("./routes/book");

// app.get();
// app.post()
// app.put();
// app.delete();
app.use(express.json());
app.use("/api/books", bookPath);

app.use('/api/authors',authors)
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
