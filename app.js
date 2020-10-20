const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();


mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("its work, get!");
});

app.post("/", (req, res) => {
  console.log("its work! post");
});


const port = process.env.PORT || 3000
app.listen(port, (req, res) => {
  console.log(`Server is running in port ${port}`);
})