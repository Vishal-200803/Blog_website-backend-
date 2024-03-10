const Like = require("../models/likeModel")
const Post = require("../models/postModel");

exports.likePost = async(req,res)=>{
    try{
        const {post,user} = req.body;
        const like = new Like({
            post,user
        });
        const savedLike = await like.save()

        //updating post 
        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes: savedLike._id}},{new:true})
      

        res.json({
            post:updatedPost,
        })

    }
    catch(err){
        return res.status(400).json({
            error: "Error while liking a post",
        });
    }
}

exports.unlikePost = async(req,res)=>{
    try{
        const{post,like} = req.body;
        //find and delete from the like collection
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});

        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes: deletedLike._id}},{new:true});

        res.json({
            post:updatedPost});
    }
    catch(error){
        return res.status(400).json({
            error: "Error while unliking a post",
        });
    }
}