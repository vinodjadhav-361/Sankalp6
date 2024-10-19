import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Users, Share2, Clock } from 'lucide-react';
import { Event } from '../App';

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttend = async (id: number) => {
    try {
      const response = await axios.post(`/api/events/${id}/attend`);
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === id ? { ...event, isAttending: response.data.isAttending, attendees: response.data.attendees } : event
        )
      );
    } catch (error) {
      console.error('Error attending event:', error);
    }
  };

  const handleShare = async (event: Event) => {
    try {
      await axios.post(`/api/events/${event.id}/share`);
      console.log(`Shared event: ${event.name}`);
    } catch (error) {
      console.error('Error sharing event:', error);
    }
  };

  // ... (keep the rest of the component code)

  return (
    // ... (update the JSX to use the fetched data)
  );
};

export default EventsPage;