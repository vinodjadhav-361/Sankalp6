import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Home, Search, Bell, Mail, Bookmark, User, Building, Trophy, Calendar, Settings, Hash, BarChart2, Video, Users, ShoppingBag } from 'lucide-react';
import ProfilePage from './components/ProfilePage';
import OrganizationsPage from './components/OrganizationsPage';
import NotificationsPage from './components/NotificationsPage';
import MessagingPage from './components/MessagingPage';
import EventsPage from './components/EventsPage';
import RankingPage from './components/RankingPage';
import SettingsPage from './components/SettingsPage';
import HashtagsPage from './components/HashtagsPage';
import PollsPage from './components/PollsPage';
import LivestreamPage from './components/LivestreamPage';
import TeamManagementPage from './components/TeamManagementPage';
import MarketplacePage from './components/MarketplacePage';
import ExplorePage from './components/ExplorePage';
import Tweet from './components/Tweet';

// ... (keep existing interfaces)

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [posts, setPosts] = useState<PostType[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [userRanking, setUserRanking] = useState<UserRanking>({
    id: 1,
    name: 'John Doe',
    handle: '@johndoe',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=John',
    points: 1000,
    rank: 5,
    badges: ['Top Contributor', 'Event Organizer'],
    streak: 7
  });
  const [games, setGames] = useState<Game[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [livestreams, setLivestreams] = useState<Livestream[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, orgsRes, eventsRes, gamesRes, pollsRes, livestreamsRes] = await Promise.all([
          axios.get('/api/posts'),
          axios.get('/api/organizations'),
          axios.get('/api/events'),
          axios.get('/api/games'),
          axios.get('/api/polls'),
          axios.get('/api/livestreams')
        ]);

        setPosts(postsRes.data);
        setOrganizations(orgsRes.data);
        setEvents(eventsRes.data);
        setGames(gamesRes.data);
        setPolls(pollsRes.data);
        setLivestreams(livestreamsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

  const handleShare = async (id: number) => {
    try {
      const response = await axios.put(`/api/posts/${id}/share`);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === id ? { ...post, shares: response.data.shares } : post
        )
      );
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const handleComment = async (id: number, comment: string) => {
    try {
      const response = await axios.post(`/api/posts/${id}/comment`, { content: comment });
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === id
            ? {
                ...post,
                comments: post.comments + 1,
                replies: [...post.replies, response.data],
              }
            : post
        )
      );
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  // ... (keep the rest of the component code)

  return (
    // ... (keep the existing JSX)
  );
};

export default App;