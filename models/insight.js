const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insightSchema = new Schema({
    "end_year": Number ,
    "intensity": Number,
    "sector": String,
    "topic": String,
    "insight": String,
    "url": String,
    "region": String,
    "start_year": Number,
    "impact": Number,
    "added": String,
    "published": String,
    "country": String,
    "relevance": Number,
    "pestle":String,
    "source": String,
    "title": String,
    "likelihood": Number,
});

const Insight = mongoose.model("Insight", insightSchema);
module.exports = Insight;