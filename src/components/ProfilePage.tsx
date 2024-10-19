import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Link, Mail, Users, Award, Briefcase } from 'lucide-react';
import Tweet from './Tweet';
import { PostType, Organization, UserRanking } from '../App';

interface ProfilePageProps {
  userRanking: UserRanking;
  onLike: (id: number) => void;
  onShare: (id: number) => void;
  onComment: (id: number, comment: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userRanking, onLike, onShare, onComment }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'media'>('posts');
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [userOrganizations, setUserOrganizations] = useState<Organization[]>([]);
  const [user, setUser] = useState({
    name: userRanking.name,
    handle: userRanking.handle,
    bio: '',
    location: '',
    website: '',
    joinDate: '',
    following: 0,
    followers: 0,
    coverImage: '',
    avatar: userRanking.avatar,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, postsRes, orgsRes] = await Promise.all([
          axios.get(`/api/users/${userRanking.id}`),
          axios.get(`/api/users/${userRanking.id}/posts`),
          axios.get(`/api/users/${userRanking.id}/organizations`),
        ]);

        setUser(userRes.data);
        setUserPosts(postsRes.data);
        setUserOrganizations(orgsRes.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userRanking.id]);

  // ... (keep the rest of the component code)

  return (
    // ... (update the JSX to use the fetched data)
  );
};

export default ProfilePage;