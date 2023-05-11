import Post from "../models/Post.js";

export function save (req , res )
{
    console.log("test")
    const post = new Post({
        Email_condidate : req.body.email,
        path_cv: req.file.path // Mettre à jour la propriété "path_cv" avec le chemin du fichier CV enregistré
    });

    post.save().then((post) => res.json(post)).catch((err) => console.log(err));
}