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

/* Requests Targetting all Articles  */
app.route("/articles")
  .get((req, res) => {
    Article.find({}, (err, foundArticles) => {
      if (!err) {
        res.send(foundArticles)
      } else {
        res.send(err)
      }
    });
  })

  .get((req, res) => {

  })

  .post((req, res) => {
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
  })

  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("Successfully dele all articles");
      } else {
        res.send(err);
      }
    });
  });

/* End Requests Targetting A Specific Articles  */

app.route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({
      title: req.params.articleTitle
    }, (err, foundArticle) => {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching is title was found.");
      }
    });
  })
  .put((req, res) => {
    Article.update({
      title: req.params.articleTitle
    }, {
      title: req.body.title,
      content: req.body.content
    }, {
      overwrite: true
    }, (err) => {
      if (!err) {
        res.send("Successfully updated article.");
      }
    });
  })
  .patch((req, res) => {
    Article.update({
      title: req.params.articleTitle
    }, {
      $set: req.body
    }, (err) => {
      if (!err) {
        res.send("Successfully update Article");
      } else {
        res.send("Successfully update Article");
      }
    });
  })
  .delete((req, res) => {

    Article.deleteOne({
      title: req.params.articleTitle
    }, (err) => {
      if (!err) {
        res.send("Successfully Delete Article");
      } else {
        res.send(err);
      }
    });
  });


const port = process.env.PORT || 3000
app.listen(port, (req, res) => {
  console.log(`Server is running in port ${port}`);
})