const mongoose = require('mongoose');
const Author = require('../models/author');
const { faker } = require('@faker-js/faker');

mongoose.connect('mongodb://127.0.0.1:27017/demo-news', {
    useNewUrlParser: true, // Fix typo here
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err); // Fix error logging
    process.exit(1);
});

exports.process = async () => {
    const authors = [];
    for (let i = 0; i < 20; i++) {
        authors.push({
            authorID: faker.database.mongodbObjectId(),
            authorFirstName: faker.person.firstName(),
            authorLastName: faker.person.lastName()
        });
    }

    try {
        await Author.deleteMany(); // Clear existing authors before inserting new ones
        await Author.insertMany(authors);
        console.log('Insert successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding authors', error);
        process.exit(1);
    }
}
