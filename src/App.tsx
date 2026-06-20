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
import { CustomCursor } from "@/components/CustomCursor";
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
import EditCourse from "./pages/admin/EditCourse";
import AddEvent from "./pages/admin/AddEvent";
import AddFaculty from "./pages/admin/AddFaculty";
import EditFaculty from "./pages/admin/EditFaculty";
import AdminFaculty from "./pages/admin/Faculty";
import AdminBranches from "./pages/admin/Branches";
import EditBranch from "./pages/admin/EditBranch";
import Testimonials from "./pages/admin/Testimonials";
import AddTestimonial from "./pages/admin/AddTestimonial";
import EditTestimonial from "./pages/admin/EditTestimonial";
import AdminLayout from "./components/admin/AdminLayout";
import Offers from "./pages/admin/Offers";
import FacultyDashboard from "./pages/faculty/Dashboard";
import StudentDashboard from "./pages/student/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const WhatsAppFAB = () => (
  <a
    href="https://wa.me/918770800807"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-13 h-13 bg-[#25D366] hover:bg-[#20c45c] shadow-lg shadow-black/40 transition-all duration-200 hover:scale-110"
    style={{ width: 52, height: 52, borderRadius: 0 }}
  >
    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
);

const AppContent = () => {
  useAuthPersistence();

  return (
    <BrowserRouter>
      <SmoothScroll>
        <CustomCursor />
        <WhatsAppFAB />
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
            <Route
              path="/admin/outstanding-students/add"
              element={<AddOutstandingStudent />}
            />
            <Route path="/admin/courses/add" element={<AddCourse />} />
            <Route path="/admin/courses/edit/:id" element={<EditCourse />} />
            <Route path="/admin/events/add" element={<AddEvent />} />
            <Route path="/admin/faculty/add" element={<AddFaculty />} />
            <Route path="/admin/faculty/edit/:id" element={<EditFaculty />} />
            <Route path="/admin/branches/edit/:id" element={<EditBranch />} />
            <Route path="/admin/testimonials" element={<Testimonials />} />
            <Route path="/admin/add-testimonial" element={<AddTestimonial />} />
            <Route path="/admin/edit-testimonial/:id" element={<EditTestimonial />} />

            {/* Admin routes with sidebar layout */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route path="/admin/faculty" element={<AdminFaculty />} />
              <Route path="/admin/branches" element={<AdminBranches />} />
              <Route
                path="/admin/outstanding-students"
                element={<OutstandingStudents />}
              />
              <Route path="/admin/offers" element={<Offers />} />
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
