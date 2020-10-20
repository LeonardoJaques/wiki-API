const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/WikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {

  Article.find({}, (err, foundArticles) => {
    if (!err) {
      res.send(foundArticles)
    } else {
      res.send(err)
    }

  });

});

app.post("/articles", (req, res) => {

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save((err) => {
    if (!err) {
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });


});

app.delete("/articles", (req, res) => {
  Article.deleteMany((err) => {
    if (!err) {
      res.send("Successfully dele all articles");
    } else {
      res.send(err);
    }
  });
});

const port = process.env.PORT || 3000
app.listen(port, (req, res) => {
  console.log(`Server is running in port ${port}`);
})