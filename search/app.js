const express = require('express');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Article = require('./models/article');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/demo-news', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.get('/search', async (req, res) => {
    const { authorName, category, publishDate } = req.query;

    const pipeline = [];
    if (authorName) {
        const [first, last] = authorName.split(' ');

        pipeline.push({
            $lookup: {
                from: 'authors',
                localField: 'authorID',
                foreignField: '_id',
                as: 'authorDetails',
            },
        });

        const matchConditions = [];
        if (first) {
            matchConditions.push({ 'authorDetails.first': { $regex: first, $options: 'i' } });
        }
        if (last) {
            matchConditions.push({ 'authorDetails.last': { $regex: last, $options: 'i' } });
        }

        if (matchConditions.length > 0) {
            pipeline.push({
                $match: {
                    $or: matchConditions,
                },
            });
        }
    }

    if (category) {
        pipeline.push({
            $match: { category: category },
        });
    }

    if (publishDate) {
        pipeline.push({
            $match: { publishDate: { $gte: new Date(publishDate) } },
        });
    }

    pipeline.push({
        $project: {
            _id: 1,
            title: 1,
            url: 1,
            publishDate: 1,
            category: 1,
            author: {
                $concat: [
                    { $arrayElemAt: ['$authorDetails.first', 0] },
                    ' ',
                    { $arrayElemAt: ['$authorDetails.last', 0] },
                ],
            },
        },
    });

    try {
        const articles = await Article.aggregate(pipeline);
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
