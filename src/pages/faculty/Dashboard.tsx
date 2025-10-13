import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Calendar, Clock, Award } from 'lucide-react';
import { useAppSelector } from '@/store/store';
import { selectCurrentUser } from '@/store/slices/authSlice';

const FacultyDashboard = () => {
  const user = useAppSelector(selectCurrentUser);

  const stats = [
    {
      title: 'My Students',
      value: '45',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-500',
      change: '+5 this month',
    },
    {
      title: 'Active Courses',
      value: '3',
      icon: BookOpen,
      gradient: 'from-emerald-500 to-teal-500',
      change: 'Teaching',
    },
    {
      title: 'Upcoming Classes',
      value: '8',
      icon: Calendar,
      gradient: 'from-violet-500 to-purple-500',
      change: 'This week',
    },
    {
      title: 'Pending Reviews',
      value: '12',
      icon: Clock,
      gradient: 'from-orange-500 to-red-500',
      change: 'Assignments',
    },
  ];

  const upcomingClasses = [
    { course: 'MERN Stack Development', time: '10:00 AM', date: 'Today', students: 15 },
    { course: 'System Design', time: '2:00 PM', date: 'Today', students: 12 },
    { course: 'Data Structures', time: '11:00 AM', date: 'Tomorrow', students: 20 },
  ];

  const recentActivity = [
    { type: 'submission', student: 'Rahul Kumar', activity: 'Submitted Assignment 5', time: '2 hours ago' },
    { type: 'query', student: 'Priya Singh', activity: 'Asked a question in DSA', time: '4 hours ago' },
    { type: 'completion', student: 'Ankit Jain', activity: 'Completed Module 3', time: '6 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Faculty Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Welcome back, {user?.fullname || 'Faculty Member'}!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card border-0 hover:scale-105 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Upcoming Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((cls, index) => (
                  <div
                    key={index}
                    className="p-4 glass-card rounded-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{cls.course}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {cls.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {cls.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {cls.students} students
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        Scheduled
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="p-4 glass-card rounded-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.student}</p>
                        <p className="text-sm text-muted-foreground">{activity.activity}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-card border-0 mt-6">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 glass-card rounded-lg hover:scale-105 transition-all duration-300 text-left">
                <BookOpen className="h-6 w-6 text-blue-500 mb-2" />
                <h4 className="font-semibold text-foreground">Upload Materials</h4>
                <p className="text-sm text-muted-foreground mt-1">Share course resources</p>
              </button>
              <button className="p-4 glass-card rounded-lg hover:scale-105 transition-all duration-300 text-left">
                <Users className="h-6 w-6 text-emerald-500 mb-2" />
                <h4 className="font-semibold text-foreground">View Students</h4>
                <p className="text-sm text-muted-foreground mt-1">Check student progress</p>
              </button>
              <button className="p-4 glass-card rounded-lg hover:scale-105 transition-all duration-300 text-left">
                <Calendar className="h-6 w-6 text-violet-500 mb-2" />
                <h4 className="font-semibold text-foreground">Schedule Class</h4>
                <p className="text-sm text-muted-foreground mt-1">Create new session</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
