import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import { useAuthPersistence } from "@/hooks/useAuthPersistence";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PrivateRoute } from "@/components/PrivateRoute";
import { AuthDebug } from "@/components/AuthDebug";
import { Loader2 } from "lucide-react";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Students from "./pages/Students";
import Branches from "./pages/Branches";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminStudents from "./pages/admin/Students";
import AdminCourses from "./pages/admin/Courses";
import AdminEvents from "./pages/admin/Events";
import AddBranch from "./pages/admin/AddBranch";
import OutstandingStudents from "./pages/admin/OutstandingStudents";
import AddOutstandingStudent from "./pages/admin/AddOutstandingStudent";
import AddCourse from "./pages/admin/AddCourse";
import AddEvent from "./pages/admin/AddEvent";
import AddFaculty from "./pages/admin/AddFaculty";
import AdminLayout from "./components/admin/AdminLayout";
import FacultyDashboard from "./pages/faculty/Dashboard";
import StudentDashboard from "./pages/student/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useAuthPersistence();

  return (
    <BrowserRouter>
      <SmoothScroll>
        <AuthDebug />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/students" element={<Students />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Login - Public */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            {/* Admin routes without sidebar */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/branches/add" element={<AddBranch />} />
            <Route path="/admin/outstanding-students/add" element={<AddOutstandingStudent />} />
            <Route path="/admin/courses/add" element={<AddCourse />} />
            <Route path="/admin/events/add" element={<AddEvent />} />
            <Route path="/admin/faculty/add" element={<AddFaculty />} />

            {/* Admin routes with sidebar layout */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route path="/admin/outstanding-students" element={<OutstandingStudents />} />
            </Route>
          </Route>

          {/* Faculty Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={["faculty"]} />}>
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          </Route>

          {/* Student Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={["student"]} />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate
      loading={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }
      persistor={persistor}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="mern-academy-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

export default App;
