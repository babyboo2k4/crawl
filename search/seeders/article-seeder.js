const mongoose = require('mongoose');
const Article = require('../models/article');
const Author = require('../models/author'); // Import Author model
const { faker } = require('@faker-js/faker');

mongoose.connect('mongodb://127.0.0.1:27017/demo-news', {
    useNewUrlParser: true, // Fix typo in option
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err); // Fix error log
    process.exit(1);
});

exports.process = async () => {
    try {
        const authors = await Author.find();

        if (authors.length === 0) { // Fix typo in 'length'
            console.error('No authors found');
            process.exit(1);
        }

        const articles = [];
        const categories = ['Technology', 'Politics', 'Sports', 'Entertainment', 'Health', 'Science', 'Business'];

        for (let i = 0; i < 10; i++) {
            articles.push({
                articleID: faker.database.mongodbObjectId(),
                urlString: faker.internet.url(),
                articleTitle: faker.lorem.sentence({ min: 5, max: 8 }),
                authorID: authors[i % authors.length]._id, // Fix typo in 'length'
                content: faker.lorem.paragraphs(5),
                publishDate: faker.date.between({ from: '2010-01-01T00:00:00.000Z', to: '2020-01-01T00:00:00.000Z' }),
                category: faker.helpers.arrayElement(categories),
            });
        }

        await Article.insertMany(articles);
        console.log('Insert successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding Articles', error);
        process.exit(1);
    }
}
