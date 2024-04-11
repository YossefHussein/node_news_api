const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// this for luncher the server
app.listen(process.env.PORT || 3000, () => {
  console.log("server is started on port 3000");
});

// this connect to my database
mongoose.connect("mongodb+srv://newscluster.lniovc9.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('connected is complete')
}).catch((error) => {
  console.log(`error ${error}`)
})

//  project schema of project
const newsSchema = {
  title: String,
  content: String,
  imageURL: String,
  author: String,
};

// this to adding my schema
const News = mongoose.model("News", newsSchema);

app.get("/", (req, res) => {
  News.find(function (error, news) {
    if (!error) {
      res.send(news);
    } else {
      res.send("error");
    }
  });
});

// this to adding new article  from admin
app.post("/featured", (req, res) => {
  const newNews = new News({
    title: req.body.title,
    content: req.body.content,
    imageURL: req.body.imageURL,
    author: req.body.author,
  });
  newNews.save((err, news) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Added Successfully");
    }
  });
});

// this function to search on news based and news title and author
app.get("/:newsTitle", (req, res) => {
  const news = req.params.newsTitle;
  News.find(
    {
      $or: [
        {
          title: {
            $regex: new RegExp(news, "ig"),
          },
        }, //based on title
        {
          author: {
            $regex: new RegExp(news, "ig"),
          },
        }, //based on author
      ],
    },
    (err, foundItems) => {
      if (foundItems) {
        res.send(foundItems);
      } else {
        res.send("error");
      }
    }
  );
});
