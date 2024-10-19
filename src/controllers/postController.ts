import { Request, Response } from 'express';
import Post from '../models/Post';
import Comment from '../models/Comment';

// ... (keep other functions)

export const commentPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const newComment = new Comment({
      user: req.body.userId,
      post: post._id,
      content: req.body.content,
    });

    const savedComment = await newComment.save();
    
    post.comments.push(savedComment._id);
    await post.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: 'Error commenting on post', error });
  }
};