const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true},
    likes: { type: Number, default: 0 }, // required ?
    dislikes: { type: Number, default: 0 },// required ?
    usersLiked: { type: [String] }, // OU [{type: String}],  -- ['String <userId>']  -- required ?
    usersDisliked: { type: [String] }, // OU [{type: String}],  -- ['String <userId>']  -- required ?
});

module.exports = mongoose.model('Sauce', sauceSchema);