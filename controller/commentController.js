const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async(req,res)=>{
    try{
        //fetch data from req
        const {post,user,body} = req.body;

        //create a comment 
        const commnet = new Comment({
            post,user,body
        });

        // save the new comment
        const savedComment = await comment.save();

        //changing in the post section 
        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{comments: savedComment._id}},{new:true})
                            .populate("comments")
                            .exec();

        res.json({
            post:updatedPost, 
        });
    }
    catch(error){
        return res.status(500).json({
            error: "Error while creating comment",
        });
    }
}