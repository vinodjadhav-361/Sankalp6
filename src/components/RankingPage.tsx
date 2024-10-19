import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Star, Zap, Award, GamepadIcon } from 'lucide-react';
import { UserRanking, Game } from '../App';

interface RankingPageProps {
  userRanking: UserRanking;
}

const RankingPage: React.FC<RankingPageProps> = ({ userRanking }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'achievements' | 'games'>('leaderboard');
  const [leaderboard, setLeaderboard] = useState<UserRanking[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaderboardRes, gamesRes] = await Promise.all([
          axios.get('/api/leaderboard'),
          axios.get('/api/games')
        ]);

        setLeaderboard(leaderboardRes.data);
        setGames(gamesRes.data);
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      }
    };

    fetchData();
  }, []);

  // ... (keep the rest of the component code)

  return (
    // ... (update the JSX to use the fetched data)
  );
};

export default RankingPage;