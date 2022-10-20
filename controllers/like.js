const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) => {
    const id = req.params.id;
    Sauce.findById(id)
        .then(sauce => {
// req.body.like = like de la requete (1 , 0, -1) 
// si le tableau des users qui ont liké la sauce n'inclut PAS l'id du user de la requête ET qu'il a  "Liké", alors  === 
// si un user qui n'avait pas précédemment liké, ajoute un like:
            if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $push: { usersLiked: req.body.userId }, $inc: { likes: 1 } })
                    .then(() => res.status(200).json({  message: 'Like de la saucé incrémenté !'}))
                    .catch(error => res.status(404).json({ error }));
// si un user qui avait précédemment liké , enlève son like
            } else if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                    .then(() => res.status(200).json({  message: 'Like de la sauce annulé / décrémenté !'}))
                    .catch(error => res.status(404).json({ error }));
// si un user qui n'avait pas précédemment disliké , ajoute un dislike
            } else if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } })
                    .then(() => res.status(200).json({  message: 'Dislike de la saucé incrémenté !'}))
                    .catch(error => res.status(404).json({ error }));
// si un user qui avait précédemment disliké , enlève son dislike
            } else if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                    .then(() => res.status(200).json({  message: 'Dislike de la sauce annulé / décrémenté !'}))
                    .catch(error => res.status(404).json({ error }));
            } else {
                return res.status(404).json({ message : 'Bad request'})
            }
        })
        .catch (error => res.status(404).json({ error }));
};

