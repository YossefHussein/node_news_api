const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.urlencoded({ extended: true, }))

app.listen(
    process.env.PORT || 3000, function() {
        console.log('server is started on port 3000')
    },
)

mongoose.connect('mongodb+srv://rd:newsapp@cluster0-zbbtc.mongodb.net/newsDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
)

const newsSchema = {
    title: String,
    content: String,
    imageURL: String,
    author: String
}

const News = mongoose.model("News",newsSchema);

app.get('/', function (req, res) {
    News.find(function (error, news) {
        if (!error) {
            res.send(news)
        } else {
            res.send('error')
        }
    },)
})

// this to adding new article  from admin
app.post('/featured', function (req, res) {
    const newNews = new News({
        title: req.body.title,
        content: req.body.content,
        imageURL: req.body.imageURL,
        author: req.body.author,
    })
    newNews.save(function (err, news) {
        if (err) {
            res.send(err)
        } else {
            res.send('Added Successfully')
        }
    })
})

// this function to search on news based and news title and author
app.get('/:newsTitle', function (req, res) {
    const news = req.params.newsTitle
    News.find({
        $or: [
            { title: { $regex: new RegExp(news, "ig") } },//based on title
            { author: { $regex: new RegExp(news, "ig") } }//based on author
        ]
    }, function (err, foundItems) {
        if (foundItems) {
            res.send(foundItems)
        }
        else {
            res.send("error")
        }
    })
})