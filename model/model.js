const mongoose = require("mongoose")

//  project schema of project
const newsSchema = new mongoose.Schema({
    news: {
        title: String,
        content: String,
        imageURL: String,
        author: String,
        createAt: String
    }
})

// this to adding my schema
const News = mongoose.model("News", newsSchema)

module.exports = News
