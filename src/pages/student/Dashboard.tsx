import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Award, TrendingUp, Clock, Play } from 'lucide-react';
import { useAppSelector } from '@/store/store';
import { selectCurrentUser } from '@/store/slices/authSlice';
import { Progress } from '@/components/ui/progress';

const StudentDashboard = () => {
  const user = useAppSelector(selectCurrentUser);

  const stats = [
    {
      title: 'Enrolled Courses',
      value: '2',
      icon: BookOpen,
      gradient: 'from-blue-500 to-indigo-500',
      change: 'Active',
    },
    {
      title: 'Completed Modules',
      value: '15/24',
      icon: Award,
      gradient: 'from-emerald-500 to-teal-500',
      change: '62% complete',
    },
    {
      title: 'Upcoming Classes',
      value: '5',
      icon: Calendar,
      gradient: 'from-violet-500 to-purple-500',
      change: 'This week',
    },
    {
      title: 'Performance',
      value: '85%',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-500',
      change: 'Good',
    },
  ];

  const enrolledCourses = [
    {
      title: 'MERN Stack Development',
      progress: 75,
      modules: '12/16',
      nextLesson: 'MongoDB Advanced Queries',
      instructor: 'Dr. Amit Sharma',
    },
    {
      title: 'Data Structures & Algorithms',
      progress: 50,
      modules: '8/16',
      nextLesson: 'Binary Search Trees',
      instructor: 'Prof. Neha Gupta',
    },
  ];

  const upcomingClasses = [
    {
      course: 'MERN Stack',
      topic: 'Authentication & Authorization',
      time: '10:00 AM',
      date: 'Today',
      instructor: 'Dr. Amit Sharma',
    },
    {
      course: 'DSA',
      topic: 'Graph Algorithms',
      time: '2:00 PM',
      date: 'Tomorrow',
      instructor: 'Prof. Neha Gupta',
    },
  ];

  const recentAchievements = [
    { title: 'Module Master', description: 'Completed 5 modules in a row', date: '2 days ago' },
    { title: 'Perfect Score', description: 'Scored 100% in React Quiz', date: '5 days ago' },
    { title: 'Early Bird', description: 'Submitted assignment before deadline', date: '1 week ago' },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Welcome back, {user?.fullname || 'Student'}! Keep up the great work!
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

        {/* Enrolled Courses */}
        <Card className="glass-card border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="p-6 glass-card rounded-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">by {course.instructor}</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                      {course.modules}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-semibold text-foreground">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Next Lesson:</p>
                      <p className="text-sm font-medium text-foreground">{course.nextLesson}</p>
                    </div>
                    <Button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700">
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
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
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="glass-card">
                            {cls.course}
                          </Badge>
                          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            {cls.date}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-foreground">{cls.topic}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {cls.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {cls.instructor}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-4 glass-card rounded-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
