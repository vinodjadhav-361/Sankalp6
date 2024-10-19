import { Request, Response } from 'express';
import User from '../models/User';
import Post from '../models/Post';
import Organization from '../models/Organization';

// ... (keep existing functions)

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ user: req.params.id }).populate('user', 'name handle avatar');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user posts', error });
  }
};

export const getUserOrganizations = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate('organizations');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.organizations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user organizations', error });
  }
};