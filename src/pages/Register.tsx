import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Code2, Mail, Lock, User, Phone, GraduationCap, Loader2 } from 'lucide-react';
import { useRegisterMutation } from '@/store/api/authApi';
import { toast } from 'sonner';

// Validation schemas
const studentValidationSchema = Yup.object({
  fullname: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phonenumber: Yup.string()
    .matches(/^[\+]?[1-9][\d]{9,14}$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  qualification: Yup.string()
    .required('Qualification is required'),
  hereaboutus: Yup.string()
    .required('Please tell us how you heard about us'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
});

const facultyValidationSchema = Yup.object({
  fullname: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phonenumber: Yup.string()
    .matches(/^[\+]?[1-9][\d]{9,14}$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  specialization: Yup.string()
    .required('Specialization is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleStudentRegister = async (values: any) => {
    try {
      const registerData = {
        name: values.fullname,
        email: values.email,
        password: values.password,
        role: 'student' as const,
        phone: values.phonenumber,
        guardianName: 'Parent Name', // These would need to be added to the form
        guardianContact: values.phonenumber,
      };

      const result = await register(registerData).unwrap();
      if (result.success) {
        toast.success('Student registration successful!');
        navigate('/auth/login');
      }
    } catch (err: any) {
      if (err?.data?.errors) {
        err.data.errors.forEach((error: any) => {
          toast.error(`${error.field}: ${error.message}`);
        });
      } else {
        toast.error(err?.data?.message || 'Student registration failed');
      }
    }
  };

  const handleFacultyRegister = async (values: any) => {
    try {
      const registerData = {
        name: values.fullname,
        email: values.email,
        password: values.password,
        role: 'faculty' as const,
        phone: values.phonenumber,
        specialization: values.specialization,
        qualification: 'Masters', // This would need to be added to the form
        experience: 5, // This would need to be added to the form
      };

      const result = await register(registerData).unwrap();
      if (result.success) {
        toast.success('Faculty registration successful!');
        navigate('/auth/login');
      }
    } catch (err: any) {
      if (err?.data?.errors) {
        err.data.errors.forEach((error: any) => {
          toast.error(`${error.field}: ${error.message}`);
        });
      } else {
        toast.error(err?.data?.message || 'Faculty registration failed');
      }
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
          <CardTitle className="text-2xl">Join Us Today</CardTitle>
          <CardDescription>Create your account to start learning</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student" className="space-y-4">
              <Formik
                initialValues={{
                  fullname: '',
                  email: '',
                  phonenumber: '',
                  qualification: '',
                  hereaboutus: '',
                  password: ''
                }}
                validationSchema={studentValidationSchema}
                onSubmit={handleStudentRegister}
              >
                {({ isSubmitting, touched, errors: formErrors, setFieldValue, values }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="student-name"
                          name="fullname"
                          type="text"
                          placeholder="John Doe"
                          className={`pl-10 ${
                            touched.fullname && formErrors.fullname ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <ErrorMessage name="fullname" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="student-email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          className={`pl-10 ${
                            touched.email && formErrors.email ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="student-phone"
                          name="phonenumber"
                          type="tel"
                          placeholder="+91 9876543210"
                          className={`pl-10 ${
                            touched.phonenumber && formErrors.phonenumber ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <ErrorMessage name="phonenumber" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualification">Qualification</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                        <Select onValueChange={(value) => setFieldValue('qualification', value)}>
                          <SelectTrigger className={`pl-10 ${
                            touched.qualification && formErrors.qualification ? 'border-red-500' : ''
                          }`}>
                            <SelectValue placeholder="Select your qualification" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12th Pass">12th Pass</SelectItem>
                            <SelectItem value="Diploma">Diploma</SelectItem>
                            <SelectItem value="Graduate">Graduate</SelectItem>
                            <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <ErrorMessage name="qualification" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hear-about">How did you hear about us?</Label>
                      <Select onValueChange={(value) => setFieldValue('hereaboutus', value)}>
                        <SelectTrigger className={`${
                          touched.hereaboutus && formErrors.hereaboutus ? 'border-red-500' : ''
                        }`}>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Friend">Friend</SelectItem>
                          <SelectItem value="College">College</SelectItem>
                          <SelectItem value="Poster">Poster</SelectItem>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Google Maps">Google Maps</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage name="hereaboutus" component="p" className="text-sm text-red-500" />
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
                          placeholder="Create a strong password"
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
                          {(error as any)?.data?.message || 'Registration failed'}
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
                          Registering...
                        </>
                      ) : (
                        'Register as Student'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabsContent>
            
            <TabsContent value="faculty" className="space-y-4">
              <Formik
                initialValues={{
                  fullname: '',
                  email: '',
                  phonenumber: '',
                  specialization: '',
                  password: ''
                }}
                validationSchema={facultyValidationSchema}
                onSubmit={handleFacultyRegister}
              >
                {({ isSubmitting, touched, errors: formErrors, setFieldValue }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="faculty-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="faculty-name"
                          name="fullname"
                          type="text"
                          placeholder="Dr. Jane Smith"
                          className={`pl-10 ${
                            touched.fullname && formErrors.fullname ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <ErrorMessage name="fullname" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="faculty-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="faculty-email"
                          name="email"
                          type="email"
                          placeholder="jane@mernacademy.com"
                          className={`pl-10 ${
                            touched.email && formErrors.email ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="faculty-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="faculty-phone"
                          name="phonenumber"
                          type="tel"
                          placeholder="+91 9876543210"
                          className={`pl-10 ${
                            touched.phonenumber && formErrors.phonenumber ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <ErrorMessage name="phonenumber" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select onValueChange={(value) => setFieldValue('specialization', value)}>
                        <SelectTrigger className={`${
                          touched.specialization && formErrors.specialization ? 'border-red-500' : ''
                        }`}>
                          <SelectValue placeholder="Select your specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MERN Stack">MERN Stack</SelectItem>
                          <SelectItem value="AI/ML">AI/ML</SelectItem>
                          <SelectItem value="Data Structures & Algorithms">Data Structures & Algorithms</SelectItem>
                          <SelectItem value="System Design">System Design</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage name="specialization" component="p" className="text-sm text-red-500" />
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
                          placeholder="Create a strong password"
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
                          {(error as any)?.data?.message || 'Registration failed'}
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
                          Registering...
                        </>
                      ) : (
                        'Register as Faculty'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;