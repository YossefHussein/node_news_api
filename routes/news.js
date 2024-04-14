const express = require("express")
const News = require("../model/model")
const newsRouter = express.Router()
let myNews = News

// this to adding new article  from admin
newsRouter.post("/add-news", (req, res) => {
    const newNews = new myNews({
        title: req.body.news.title,
        content: req.body.news.content,
        imageURL: req.body.news.imageURL,
        author: req.body.news.author,
        createAt: req.body.news.createAt
    })
    newNews.save((err, news) => {
        if (err) {
            res.send(err)
        } else {
            res.send(`news added successfully: \n news information: \n ${news}`)
        }
    })
})

newsRouter.get("/get-news", (req, res) => {
    myNews.find(function (error, news) {
        if (!error) {
            res.send(news)
        } else {
            res.send("error to get news")
        }
    })
})

// this function to search on news based and news title and author
newsRouter.get("/search-news-title", (req, res) => {
    const news = req.params.newsTitle
    myNews.find(
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
                res.send(foundItems)
            } else {
                res.send("error")
            }
        }
    )
})

module.exports = newsRouter