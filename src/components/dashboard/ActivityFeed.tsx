import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleUser, Bell, Search, Filter, ArrowRight, MoreHorizontal, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

type ActivityItem = {
  id: number | string;
  user: string;
  action: string;
  subject: string;
  timestamp?: string;
  date?: string;
  type?: string;
  icon?: string;
  link?: string;
};

interface ActivityFeedProps {
  activities: ActivityItem[];
  onViewAll?: () => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities: initialActivities, onViewAll }) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState(initialActivities);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setActivities(initialActivities);
  }, [initialActivities]);

  // Filter activities based on search query and filter
  const filteredActivities = activities
    .filter(activity => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          activity.user.toLowerCase().includes(query) ||
          activity.action.toLowerCase().includes(query) ||
          activity.subject.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(activity => {
      if (filter === 'all') return true;

      // Example filters - in a real app these would be more sophisticated
      if (filter === 'invoices') return activity.subject.toLowerCase().includes('invoice');
      if (filter === 'clients') return activity.subject.toLowerCase().includes('client');
      if (filter === 'quotes') return activity.subject.toLowerCase().includes('quote') || activity.subject.toLowerCase().includes('quotation');

      return true;
    });

  const handleViewActivity = (activity: ActivityItem) => {
    // If activity has a specific link, navigate to it
    if (activity.link) {
      navigate(activity.link);
    } else {
      // Otherwise, determine destination based on activity subject
      if (activity.subject.toLowerCase().includes('invoice')) {
        navigate('/invoices');
      } else if (activity.subject.toLowerCase().includes('client')) {
        navigate('/clients');
      } else if (activity.subject.toLowerCase().includes('quote') || activity.subject.toLowerCase().includes('quotation')) {
        navigate('/quotations');
      }
    }
  };

  const toggleMenu = (id: string | number) => {
    setShowMenu(prev => ({
      ...prev,
      [id.toString()]: !prev[id.toString()]
    }));
  };

  const handleViewAllActivities = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      navigate('/activities');
    }
  };

  return (
    <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-slate-900 font-sf-pro flex items-center justify-between">
          <span>Recent Activity</span>
          <div className="flex space-x-2">
            {showSearch ? (
              <div className="flex items-center bg-white/70 rounded-lg px-2">
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-1 px-2 text-xs w-36 bg-transparent border-none focus:outline-none"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowSearch(false)}
                >
                  <Search className="h-3 w-3 text-slate-400" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-1 hover:bg-mokm-purple-100 hover:text-mokm-purple-600 transition-colors"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}

            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-1 hover:bg-mokm-purple-100 hover:text-mokm-purple-600 transition-colors"
                onClick={() => setShowMenu(prev => ({ ...prev, filter: !prev.filter }))}
              >
                <Filter className="h-4 w-4" />
              </Button>

              {showMenu.filter && (
                <div className="absolute right-0 top-full mt-1 p-2 bg-white rounded-lg shadow-md z-10 w-32">
                  {['all', 'invoices', 'clients', 'quotes'].map((option) => (
                    <button
                      key={option}
                      className={`w-full text-left px-2 py-1 text-xs rounded-md ${filter === option ? 'bg-mokm-purple-100 text-mokm-purple-600' : 'hover:bg-slate-100'}`}
                      onClick={() => {
                        setFilter(option);
                        setShowMenu(prev => ({ ...prev, filter: false }));
                      }}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-sf-pro text-lg">No recent activity</p>
            <p className="text-sm text-slate-400 mt-2 font-sf-pro">Your business activity will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((activity) => {
              // Calculate relative time
              const relativeTime = formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true });

              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 animate-fade-in cursor-pointer hover:bg-white/30 rounded-lg p-2 relative"
                  onClick={() => handleViewActivity(activity)}
                >
                  <div className="rounded-full bg-gradient-to-r from-mokm-purple-500 to-mokm-pink-500 p-2">
                    {activity.icon === 'user' ? (
                      <CircleUser className="h-4 w-4 text-white" />
                    ) : (
                      <Bell className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1 pr-6">
                    <p className="text-sm text-slate-700 font-sf-pro">
                      <span className="font-medium text-slate-900">{activity.user}</span> {activity.action} <span className="font-medium text-slate-900">{activity.subject}</span>
                    </p>
                    <p className="text-xs text-slate-500 font-sf-pro">{relativeTime}</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:opacity-100 hover:bg-mokm-purple-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(activity.id);
                    }}
                  >
                    <MoreHorizontal className="h-3 w-3 text-slate-400" />
                  </Button>

                  {showMenu[activity.id] && (
                    <div className="absolute right-2 top-8 bg-white rounded-lg shadow-md z-10 w-32 p-1">
                      <button
                        className="flex items-center w-full text-left px-2 py-1 text-xs hover:bg-slate-100 rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewActivity(activity);
                        }}
                      >
                        <ArrowRight className="h-3 w-3 mr-1" /> View details
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {filteredActivities.length > 0 && (
          <div className="flex justify-center mt-4">
            <Button
              variant="link"
              size="sm"
              onClick={handleViewAllActivities}
              className="text-xs text-mokm-purple-600 hover:text-mokm-purple-800"
            >
              View All Activities
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
