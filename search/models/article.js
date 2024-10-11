const mongoose = require('mongoose');
const Scheme = mongoose.Schema;


const articleSchema = new Scheme({
    articleID: {
        type: String,
        required: true,
    },
    urlString: {
        type: String,
        required: true,
    },
    articleTitle: {
        type: String,
        required: true,
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Article', articleSchema);