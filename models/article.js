const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Note = require("./note");

var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    in_library: {
        type: Boolean,
        default: false
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;