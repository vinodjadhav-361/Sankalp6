import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart2, PlusCircle } from 'lucide-react';
import { Poll } from '../App';

const PollsPage: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', ''],
    endsAt: '',
  });

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get('/api/polls');
        setPolls(response.data);
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };

    fetchPolls();
  }, []);

  const handleCreatePoll = async () => {
    if (newPoll.question && newPoll.options.every(option => option.trim() !== '') && newPoll.endsAt) {
      try {
        const response = await axios.post('/api/polls', newPoll);
        setPolls([...polls, response.data]);
        setNewPoll({ question: '', options: ['', ''], endsAt: '' });
      } catch (error) {
        console.error('Error creating poll:', error);
      }
    }
  };

  const handleVote = async (pollId: number, optionIndex: number) => {
    try {
      const response = await axios.post(`/api/polls/${pollId}/vote`, { optionIndex });
      setPolls(polls.map(poll =>
        poll.id === pollId ? response.data : poll
      ));
    } catch (error) {
      console.error('Error voting on poll:', error);
    }
  };

  // ... (keep the rest of the component code)

  return (
    // ... (update the JSX to use the fetched data)
  );
};

export default PollsPage;