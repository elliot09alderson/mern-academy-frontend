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
        console.log('Login success - result:', result);
        // Cookie is automatically set by backend
        // Update Redux store with user data only
        dispatch(setCredentials({
          user: result.data.user
        }));

        toast.success(`${userType} login successful!`);

        // Navigate to homepage after successful login
        navigate('/');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error(err?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-slate-950 to-black relative overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl animate-orb-float"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-orb-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl animate-orb-pulse"></div>
      </div>

      {/* Code elements floating in background */}
      <div className="absolute inset-0 opacity-10 text-violet-400 text-xs font-mono overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 animate-float-slow">
          <pre>{`const user = await login({
  email, password
})`}</pre>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delay-1">
          <pre>{`if (authenticated) {
  redirect('/dashboard')
}`}</pre>
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-delay-2">
          <pre>{`// MERN Stack Auth
JWT.verify(token)`}</pre>
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-float-slow">
          <pre>{`POST /api/auth/login
Status: 200 OK`}</pre>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.07)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <Card className="w-full max-w-md relative z-10 bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-violet-500/20">
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