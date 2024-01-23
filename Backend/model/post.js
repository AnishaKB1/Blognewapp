const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Removes leading and trailing whitespaces
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imageUrls: {
        type: [String] // An array to store multiple image URLs
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

const postdata = mongoose.model('postdata', postSchema);

module.exports = postdata;
