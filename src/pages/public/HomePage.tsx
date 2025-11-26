import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetActiveCoursesQuery } from "../../store/api/courseApi";
import { useGetActiveBranchesQuery } from "../../store/api/branchApi";
import {
  useGetUpcomingEventsQuery,
  useGetFeaturedEventsQuery,
} from "../../store/api/eventApi";
import { useGetOutstandingStudentsQuery } from "../../store/api/studentApi";
import { useGetTestimonialsQuery } from "../../store/api/testimonialApi";
import { useLogoutMutation } from "../../store/api/authApi";
import { useAppSelector, useAppDispatch } from "../../store/store";
import {
  selectIsAuthenticated,
  selectCurrentUser,
  logout,
} from "../../store/slices/authSlice";
import { toast } from "sonner";
import {
  BookOpen,
  Building,
  Calendar,
  Trophy,
  Users,
  GraduationCap,
  ArrowRight,
  MapPin,
  Clock,
  Star,
  LogOut,
  User as UserIcon,
  Quote,
} from "lucide-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const [logoutMutation] = useLogoutMutation();

  // Log authentication state for debugging
  React.useEffect(() => {
    console.log("HomePage - Auth State:", {
      isAuthenticated,
      hasUser: !!currentUser,
      userName: currentUser?.name,
    });
  }, [isAuthenticated, currentUser]);

  const { data: coursesData } = useGetActiveCoursesQuery({ limit: 6 });
  const { data: branchesData } = useGetActiveBranchesQuery({ limit: 4 });
  const { data: upcomingEvents } = useGetUpcomingEventsQuery({ limit: 4 });
  const { data: featuredEvents } = useGetFeaturedEventsQuery({ limit: 3 });
  const { data: outstandingStudents } = useGetOutstandingStudentsQuery({
    limit: 6,
  });
  const { data: testimonials } = useGetTestimonialsQuery({ isActive: true, limit: 3 });

  const handleLogout = async () => {
    try {
      // Call logout API to clear server cookies
      await logoutMutation().unwrap();

      // Clear localStorage token
      localStorage.removeItem("token");

      // Clear Redux state
      dispatch(logout());

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API fails, clear local state
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">MERN Academy</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center text-gray-700 px-3 py-2">
                    <UserIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">
                      {currentUser?.name || "User"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to MERN Academy
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Empowering students with cutting-edge education in technology,
              engineering, and sciences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </Link>
              <Link
                to="/courses"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {coursesData?.pagination?.total || 0}
              </div>
              <div className="text-gray-600">Active Courses</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {branchesData?.pagination?.total || 0}
              </div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {outstandingStudents?.pagination?.total || 0}
              </div>
              <div className="text-gray-600">Outstanding Students</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {upcomingEvents?.pagination?.total || 0}
              </div>
              <div className="text-gray-600">Upcoming Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents?.data && featuredEvents.data.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Events
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't miss out on these exciting upcoming events and activities
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.data.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    {event.images && event.images.length > 0 ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${
                          event.images[0].url
                        }`}
                        alt={event.eventName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-white" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          event.eventType === "academic"
                            ? "bg-blue-100 text-blue-800"
                            : event.eventType === "cultural"
                            ? "bg-purple-100 text-purple-800"
                            : event.eventType === "sports"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.eventType}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {event.eventName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.venue}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {new Date(event.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Courses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of courses designed to prepare you
              for the future
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData?.data?.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.courseName}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Code:</span>
                    <span className="font-medium">{course.courseCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Credits:</span>
                    <span className="font-medium">{course.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Branch:</span>
                    <span className="font-medium">
                      {course.branchId?.branchName || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Departments
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our diverse range of academic departments and
              specializations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {branchesData?.data?.map((branch) => (
              <div
                key={branch._id}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {branch.branchName}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {branch.description}
                </p>
                <div className="text-sm text-gray-500">
                  <div>Code: {branch.branchCode}</div>
                  <div>Seats: {branch.totalSeats}</div>
                  {branch.establishedYear && (
                    <div>Est: {branch.establishedYear}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outstanding Students Section */}
      {outstandingStudents?.data && outstandingStudents.data.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Outstanding Students
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Celebrating academic excellence and achievements of our top
                performers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {outstandingStudents.data.map((student) => (
                <div
                  key={student._id}
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {student.userId.name}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Student ID: {student.studentId}</div>
                    <div>GPA: {student.gpa.toFixed(1)}</div>
                    <div>Semester: {student.currentSemester}</div>
                    <div>Attendance: {student.attendance}%</div>
                  </div>
                  {student.achievements.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-xs text-gray-500">
                        {student.achievements.length} Achievement
                        {student.achievements.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials?.data && testimonials.data.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute top-20 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="text-center mb-16 relative z-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                What Our Students Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from our community about their learning journey and success stories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {testimonials.data.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 border border-gray-100"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Quote Icon Background */}
                  <div className="absolute top-6 right-6 text-gray-100 group-hover:text-blue-50 transition-colors duration-300">
                    <Quote className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:shadow-blue-200 transition-shadow duration-300">
                          <img
                            src={testimonial.image.url}
                            alt={testimonial.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                          <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            } transform group-hover:scale-110 transition-transform duration-300`}
                            style={{ transitionDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                        "{testimonial.title}"
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
                        {testimonial.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-b-2xl"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents?.data && upcomingEvents.data.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest events and activities happening at
                our academy
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.data.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex">
                    <div className="w-1/3 h-32 bg-gradient-to-r from-orange-500 to-red-500 relative">
                      {event.images && event.images.length > 0 ? (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}${
                            event.images[0].url
                          }`}
                          alt={event.eventName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="w-2/3 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${
                            event.eventType === "academic"
                              ? "bg-blue-100 text-blue-800"
                              : event.eventType === "cultural"
                              ? "bg-purple-100 text-purple-800"
                              : event.eventType === "sports"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {event.eventType}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {event.eventName}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.venue}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(event.startDate).toLocaleDateString()}
                        </div>
                        <div>Organizer: {event.organizer}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/events"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                View All Events
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold">MERN Academy</h3>
              </div>
              <p className="text-gray-400">
                Empowering minds, shaping futures through quality education and
                innovation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/courses" className="hover:text-white">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/branches" className="hover:text-white">
                    Departments
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Students</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/register" className="hover:text-white">
                    Apply Now
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-white">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link to="/outstanding" className="hover:text-white">
                    Outstanding Students
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="text-gray-400 space-y-2">
                <div>📧 info@mernacademy.edu</div>
                <div>📞 +1 (555) 123-4567</div>
                <div>📍 123 Education Street, Learning City</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MERN Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
