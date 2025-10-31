import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/store';
import { setCredentials } from '@/store/slices/authSlice';
import { toast } from 'sonner';

// Validation schema
const adminLoginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleAdminLogin = async (values: { email: string; password: string }) => {
    try {
      const result = await login(values).unwrap();

      if (result.success) {
        // Verify if user is actually an admin
        if (result.data.user.role !== 'admin') {
          toast.error('Access denied. Admin credentials required.');
          return;
        }

        // Update Redux state with user data
        // No need to store token - using HTTP-only cookies
        dispatch(setCredentials({
          user: result.data.user
        }));

        toast.success('Admin login successful!');
        navigate('/admin');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Admin login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Code snippets floating in background */}
      <div className="absolute inset-0 opacity-10 text-purple-400 text-xs font-mono overflow-hidden">
        <div className="absolute top-10 left-10 animate-float-slow">
          <pre>{`const admin = {
  role: 'superuser',
  permissions: ['all']
}`}</pre>
        </div>
        <div className="absolute top-40 right-20 animate-float-delay-1">
          <pre>{`if (user.authenticated) {
  grant('access')
}`}</pre>
        </div>
        <div className="absolute bottom-20 left-20 animate-float-delay-2">
          <pre>{`// Secure admin portal
authenticate(credentials)`}</pre>
        </div>
        <div className="absolute bottom-40 right-10 animate-float-slow">
          <pre>{`POST /api/admin/login
Authorization: Bearer`}</pre>
        </div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <Card className="w-full max-w-md relative z-10 border-purple-500/30 bg-slate-900/90 backdrop-blur-2xl shadow-2xl shadow-purple-500/20">
        <CardHeader className="text-center space-y-4">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to main login
          </Link>

          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>

          <div>
            <CardTitle className="text-3xl font-bold text-white">Admin Portal</CardTitle>
            <CardDescription className="text-purple-200">
              Secure administrator access
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{ email: 'admin@mernacademy.com', password: 'Admin@123' }}
            validationSchema={adminLoginValidationSchema}
            onSubmit={handleAdminLogin}
          >
            {({ isSubmitting, touched, errors: formErrors }) => (
              <Form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-purple-100">Admin Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                    <Field
                      as={Input}
                      id="admin-email"
                      name="email"
                      type="email"
                      placeholder="admin@mernacademy.com"
                      className={`pl-10 bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-400 focus:border-purple-500 ${
                        touched.email && formErrors.email ? 'border-red-500' : ''
                      }`}
                    />
                  </div>
                  <ErrorMessage name="email" component="p" className="text-sm text-red-400" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-purple-100">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                    <Field
                      as={Input}
                      id="admin-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className={`pl-10 bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-400 focus:border-purple-500 ${
                        touched.password && formErrors.password ? 'border-red-500' : ''
                      }`}
                    />
                  </div>
                  <ErrorMessage name="password" component="p" className="text-sm text-red-400" />
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-900/20 border-red-500/50">
                    <AlertDescription className="text-red-200">
                      {(error as any)?.data?.message || 'Admin login failed'}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg shadow-purple-500/50 transition-all"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Sign In as Admin
                    </>
                  )}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 pt-6 border-t border-purple-500/20">
            <p className="text-xs text-center text-purple-300">
              This portal is restricted to authorized administrators only.
              <br />
              Unauthorized access attempts will be logged.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
