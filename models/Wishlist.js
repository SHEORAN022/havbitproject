const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Ensure unique product per customer in wishlist
wishlistSchema.index({ customer: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);