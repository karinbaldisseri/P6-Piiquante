const Sauce = require('../models/Sauce');

// LIKE, unlike, DISLIKE, undislike a sauce -> POST
exports.likeSauce = (req, res) => {
    const id = req.params.id;
    if (!req.body.userId) {
        return res.status(400).json({ message : 'Bad request'})
    } else {
        Sauce.findById(id)
            .then(sauce => {
                if (!sauce) {
                    return res.status(404).json({ errror : 'Resource not found'})
                }
            // If a user hasn't voted yet and adds a like
            if (!sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId) && req.body.like === 1) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $push: { usersLiked: req.body.userId }, $inc: { likes: 1 } })
                    .then(() => res.status(200).json({  message: 'Like added !'}))
                    .catch(error => res.status(500).json({ error : 'Internal server error' }));
            // if a user previously liked a sauce and removes the like
            } else if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                    .then(() => res.status(200).json({  message: 'Like removed !'}))
                    .catch(error => res.status(500).json({ error : 'Internal server error' }));
            // If a user hasn't voted yet and adds a dislike
            } else if (!sauce.usersDisliked.includes(req.body.userId) && !sauce.usersLiked.includes(req.body.userId) && req.body.like === -1) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } })
                    .then(() => res.status(200).json({  message: 'Dislike added !'}))
                    .catch(error => res.status(500).json({ error : 'Internal server error' }));
            // if a user previously disliked a sauce and removes the dislike
            } else if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                    .then(() => res.status(200).json({  message: 'Dislike removed !'}))
                    .catch(error => res.status(500).json({ error : 'Internal server error' }));
            } else {
                return res.status(400).json({ message : 'Bad request'})
            }
        })
        .catch (error => res.status(500).json({ error : 'Internal server error' }));
    } 
};

