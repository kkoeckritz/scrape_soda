var axios = require("axios"); // http library, like jQyery's ajax method
var cheerio = require("cheerio");

module.exports = (app, db) => {
    
    // GET: scrape NYT site for articles
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://www.nytimes.com/news-event/elections-2018").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
            
            // Now, we grab every h2 within an article tag, and do the following:
            $("article").each(function(i, element) {
                // Save an empty result object
                var result = {};
                
                // grab headline, summary, URL of every article
                result.headline = $(this).find(".headline").text();
                result.summary = $(this).find(".summary").text();
                result.url = $(this).find(".story-link").attr("href");
                
                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    console.log(err);
                });
            });
            
            // If we were able to successfully scrape and save an Article, send a message to the client
            res.send("Scrape Complete");
            console.log("Scrape Complete");
        });
    });

    // POST: add article to library
    app.post("/articles/add/:article_id", function(req, res) {
        db.Article.findOneAndUpdate({ "_id": req.params.article_id }, { "in_library": true})
        .exec(function(err, doc) {
            // Log any errors
            if (err) {
                console.log(err);
            }
            else {
                res.send(doc);
            }
        });
    });

    // GET: return JSON of all articles in DB
    app.get("/articles", function(req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
        .then(function(dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });

    // GET: grab specific article; populate it with notes
    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // POST: save note for specific article
    app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
};