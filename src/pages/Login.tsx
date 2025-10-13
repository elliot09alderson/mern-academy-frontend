import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Code2, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/store';
import { setCredentials } from '@/store/slices/authSlice';
import { toast } from 'sonner';

// Validation schemas
const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const [activeTab, setActiveTab] = useState('student');

  const handleLogin = async (values: { email: string; password: string }, userType: string) => {
    try {
      const result = await login(values).unwrap();

      if (result.success) {
        // Store token and user data
        localStorage.setItem('token', result.data.token);
        dispatch(setCredentials(result.data));

        toast.success(`${userType} login successful!`);

        // Navigate based on user role
        const userRole = result.data.user.role;
        if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else if (userRole === 'faculty') {
          navigate('/faculty/dashboard');
        } else if (userRole === 'student') {
          navigate('/student/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      
      <Card className="w-full max-w-md glass-card relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">MERN Academy</span>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Choose your login type</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student" className="space-y-4">
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={(values) => handleLogin(values, 'Student')}
              >
                {({ isSubmitting, touched, errors: formErrors }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="student-email"
                          name="email"
                          type="email"
                          placeholder="student@example.com"
                          className={`pl-10 ${
                            touched.email && formErrors.email ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="student-password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          className={`pl-10 ${
                            touched.password && formErrors.password ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <ErrorMessage name="password" component="p" className="text-sm text-red-500" />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>
                          {(error as any)?.data?.message || 'Login failed'}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full gradient-primary text-white"
                      disabled={isSubmitting || isLoading}
                    >
                      {isSubmitting || isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        'Sign In as Student'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabsContent>
            
            <TabsContent value="faculty" className="space-y-4">
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={(values) => handleLogin(values, 'Faculty')}
              >
                {({ isSubmitting, touched, errors: formErrors }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="faculty-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="faculty-email"
                          name="email"
                          type="email"
                          placeholder="faculty@mernacademy.com"
                          className={`pl-10 ${
                            touched.email && formErrors.email ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="faculty-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="faculty-password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          className={`pl-10 ${
                            touched.password && formErrors.password ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <ErrorMessage name="password" component="p" className="text-sm text-red-500" />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>
                          {(error as any)?.data?.message || 'Login failed'}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full gradient-secondary text-white"
                      disabled={isSubmitting || isLoading}
                    >
                      {isSubmitting || isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        'Sign In as Faculty'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up here
              </Link>
            </p>
            <p className="text-xs text-muted-foreground">
              <Link to="/admin" className="text-accent hover:underline">
                Admin Panel
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;