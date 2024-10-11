const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    authorID: {
        type: String,
        required: true,
    },
    authorFirstName: {
        type: String,
        required: true,
    },
    authorLastName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Author', authorSchema);