import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Building, Users, Flag, Target, MapPin, Link, Mail, Calendar } from 'lucide-react';
import { Organization, PostType } from '../App';
import Tweet from './Tweet';
import ProjectManagementPage from './ProjectManagementPage';

interface OrganizationsPageProps {
  onLike: (id: number) => void;
  onShare: (id: number) => void;
  onComment: (id: number, comment: string) => void;
}

const OrganizationsPage: React.FC<OrganizationsPageProps> = ({ onLike, onShare, onComment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'pledges' | 'missions' | 'management'>('about');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [orgPosts, setOrgPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('/api/organizations');
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (selectedOrg) {
      const fetchOrgPosts = async () => {
        try {
          const response = await axios.get(`/api/organizations/${selectedOrg.id}/posts`);
          setOrgPosts(response.data);
        } catch (error) {
          console.error('Error fetching organization posts:', error);
        }
      };

      fetchOrgPosts();
    }
  }, [selectedOrg]);

  const handleFollow = async (id: number) => {
    try {
      const response = await axios.post(`/api/organizations/${id}/follow`);
      setOrganizations(prevOrgs =>
        prevOrgs.map(org =>
          org.id === id ? { ...org, isFollowing: response.data.isFollowing } : org
        )
      );
    } catch (error) {
      console.error('Error following organization:', error);
    }
  };

  // ... (keep the rest of the component code)

  return (
    // ... (update the JSX to use the fetched data)
  );
};

export default OrganizationsPage;