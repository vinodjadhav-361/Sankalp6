import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweet from './Tweet';
import { PostType } from '../App';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (id: number) => {
    try {
      const response = await axios.put(`/api/posts/${id}/like`);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === id ? { ...post, likes: response.data.likes } : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Implement handleShare and handleComment similarly

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-saffron-800">Welcome to Sankalp</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-saffron-700">Recent Posts</h2>
        {posts.map((post) => (
          <Tweet
            key={post.id}
            tweet={post}
            onLike={handleLike}
            onShare={() => {}}
            onComment={() => {}}
            onBookmark={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;