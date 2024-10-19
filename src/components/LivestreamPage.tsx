import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Video, Play, Users, Calendar } from 'lucide-react';
import { Livestream } from '../App';

const LivestreamPage: React.FC = () => {
  const [livestreams, setLivestreams] = useState<Livestream[]>([]);
  const [newLivestream, setNewLivestream] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    const fetchLivestreams = async () => {
      try {
        const response = await axios.get('/api/livestreams');
        setLivestreams(response.data);
      } catch (error) {
        console.error('Error fetching livestreams:', error);
      }
    };

    fetchLivestreams();
  }, []);

  const handleCreateLivestream = async () => {
    if (newLivestream.title && newLivestream.description && newLivestream.startTime && newLivestream.endTime) {
      try {
        const response = await axios.post('/api/livestreams', newLivestream);
        setLivestreams([...livestreams, response.data]);
        setNewLivestream({ title: '', description: '', startTime: '', endTime: '' });
      } catch (error) {
        console.error('Error creating livestream:', error);
      }
    }
  };

  // ... (keep the rest of the component code)

  return (
    // ... (update the JSX to use the fetched data)
  );
};

export default LivestreamPage;