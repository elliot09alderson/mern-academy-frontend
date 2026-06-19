import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Loader2, Mail, Lock, User, Phone, GraduationCap } from 'lucide-react';
import { useRegisterMutation } from '@/store/api/authApi';
import { toast } from 'sonner';

const inputClass =
  'w-full bg-transparent border-b border-[#2A2522] focus:border-[#C4622D] text-[#F0EBE1] placeholder:text-[#6B6660] py-3 text-sm outline-none transition-colors duration-200 font-mono tracking-[0.03em]';

const labelClass =
  'font-mono text-[9px] tracking-[0.2em] text-[#6B6660] uppercase block mb-2';

const errorClass = 'font-mono text-[9px] text-red-400 tracking-[0.06em] mt-1';

const selectClass =
  'w-full bg-[#0D0C0A] border-b border-[#2A2522] focus:border-[#C4622D] text-[#F0EBE1] py-3 text-sm outline-none transition-colors duration-200 font-mono tracking-[0.03em] appearance-none cursor-pointer';

const studentValidationSchema = Yup.object({
  fullname: Yup.string().min(2).max(100).required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phonenumber: Yup.string()
    .matches(/^[\+]?[1-9][\d]{9,14}$/, 'Invalid phone number')
    .required('Phone number is required'),
  qualification: Yup.string().required('Qualification is required'),
  hereaboutus: Yup.string().required('Required'),
  password: Yup.string()
    .min(6, 'At least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Must include uppercase, lowercase, and number')
    .required('Password is required'),
});

const facultyValidationSchema = Yup.object({
  fullname: Yup.string().min(2).max(100).required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phonenumber: Yup.string()
    .matches(/^[\+]?[1-9][\d]{9,14}$/, 'Invalid phone number')
    .required('Phone number is required'),
  specialization: Yup.string().required('Specialization is required'),
  password: Yup.string()
    .min(6, 'At least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Must include uppercase, lowercase, and number')
    .required('Password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'student' | 'faculty'>('student');
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleStudentRegister = async (values: any) => {
    try {
      const result = await register({
        name: values.fullname,
        email: values.email,
        password: values.password,
        role: 'student' as const,
        phone: values.phonenumber,
        qualification: values.qualification,
        hereaboutus: values.hereaboutus,
        guardianName: 'Parent Name',
        guardianContact: values.phonenumber,
      }).unwrap();
      if (result.success) {
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (err: any) {
      if (err?.data?.errors) {
        err.data.errors.forEach((e: any) => toast.error(`${e.field}: ${e.message}`));
      } else {
        toast.error(err?.data?.message || 'Registration failed');
      }
    }
  };

  const handleFacultyRegister = async (values: any) => {
    try {
      const result = await register({
        name: values.fullname,
        email: values.email,
        password: values.password,
        role: 'faculty' as const,
        phone: values.phonenumber,
        specialization: values.specialization,
        qualification: 'Masters',
        experience: 5,
      }).unwrap();
      if (result.success) {
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (err: any) {
      if (err?.data?.errors) {
        err.data.errors.forEach((e: any) => toast.error(`${e.field}: ${e.message}`));
      } else {
        toast.error(err?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0C0A] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Link to="/">
            <img
              src="/mern_academy_logo_transparent.png"
              alt="MERN Academy"
              className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity duration-200"
            />
          </Link>
        </div>

        {/* Tab switcher */}
        <div
          className="flex gap-px mb-10"
          style={{ backgroundColor: '#2A2522' }}
        >
          {(['student', 'faculty'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 font-mono text-[10px] tracking-[0.2em] uppercase py-3 transition-colors duration-200 ${
                tab === t
                  ? 'bg-[#C4622D] text-[#F0EBE1]'
                  : 'bg-[#0D0C0A] text-[#6B6660] hover:text-[#A39E95]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Student form */}
        {tab === 'student' && (
          <Formik
            key="student"
            initialValues={{ fullname: '', email: '', phonenumber: '', qualification: '', hereaboutus: '', password: '' }}
            validationSchema={studentValidationSchema}
            onSubmit={handleStudentRegister}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-7">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <Field name="fullname" placeholder="John Doe" className={inputClass} />
                  <ErrorMessage name="fullname" component="p" className={errorClass} />
                </div>

                <div>
                  <label className={labelClass}>Email</label>
                  <Field name="email" type="email" placeholder="john@example.com" className={inputClass} />
                  <ErrorMessage name="email" component="p" className={errorClass} />
                </div>

                <div>
                  <label className={labelClass}>Phone Number</label>
                  <Field name="phonenumber" type="tel" placeholder="+91 9876543210" className={inputClass} />
                  <ErrorMessage name="phonenumber" component="p" className={errorClass} />
                </div>

                <div>
                  <label className={labelClass}>Qualification</label>
                  <select
                    onChange={(e) => setFieldValue('qualification', e.target.value)}
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>Select qualification</option>
                    <option value="12th Pass">12th Pass</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Other">Other</option>
                  </select>
                  <ErrorMessage name="qualification" component="p" className={errorClass} />
                </div>

                <div>
                  <label className={labelClass}>How did you hear about us?</label>
                  <select
                    onChange={(e) => setFieldValue('hereaboutus', e.target.value)}
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>Select option</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Friend">Friend / Referral</option>
                    <option value="College">College</option>
                    <option value="Poster">Poster</option>
                    <option value="Website">Website / Search Engine</option>
                    <option value="Google Maps">Google Maps</option>
                  </select>
                  <ErrorMessage name="hereaboutus" component="p" className={errorClass} />
                </div>

                <div>
                  <label className={labelClass}>Password</label>
                  <Field name="password" type="password" placeholder="Create a strong password" className={inputClass} />
                  <ErrorMessage name="password" component="p" className={errorClass} />
                </div>

                {error && (
                  <p className="font-mono text-[10px] text-red-400 tracking-[0.06em]">
                    {(error as any)?.data?.message || 'Registration failed'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full group flex items-center justify-center bg-[#C4622D] hover:bg-[#D4723D] disabled:opacity-50 text-[#F0EBE1] py-4 font-display font-semibold text-sm tracking-[0.06em] transition-all duration-200 mt-2"
                >
                  {isSubmitting || isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering…</>
                  ) : 'Register as Student'}
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* Faculty form */}
        {tab === 'faculty' && (
          <Formik
            key="faculty"
            initialValues={{ fullname: '', email: '', phonenumber: '', specialization: '', password: '' }}
            validationSchema={facultyValidationSchema}
            onSubmit={handleFacultyRegister}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-7">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <Field name="fullname" placeholder="Dr. Jane Smith" className={inputClass} />
                  <ErrorMessage name="fullname" component="p" className={errorClass} />
                </div>

                <div>
                  <label className={labelClass}>Email</label>
                  <Field name="email" type="email" placeholder="jane@mernacademy.com" className={inputClass} />
                  <ErrorMessage name="email" component="p" className={errorClass} />
                </div>

                <div>
                  <label className={labelClass}>Phone Number</label>
                  <Field name="phonenumber" type="tel" placeholder="+91 9876543210" className={inputClass} />
                  <ErrorMessage name="phonenumber" component="p" className={errorClass} />
                </div>

                <div>
                  <label className={labelClass}>Specialization</label>
                  <select
                    onChange={(e) => setFieldValue('specialization', e.target.value)}
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>Select specialization</option>
                    <option value="MERN Stack">MERN Stack</option>
                    <option value="AI/ML">AI / ML</option>
                    <option value="Data Structures & Algorithms">Data Structures &amp; Algorithms</option>
                    <option value="System Design">System Design</option>
                    <option value="Other">Other</option>
                  </select>
                  <ErrorMessage name="specialization" component="p" className={errorClass} />
                </div>

                <div>
                  <label className={labelClass}>Password</label>
                  <Field name="password" type="password" placeholder="Create a strong password" className={inputClass} />
                  <ErrorMessage name="password" component="p" className={errorClass} />
                </div>

                {error && (
                  <p className="font-mono text-[10px] text-red-400 tracking-[0.06em]">
                    {(error as any)?.data?.message || 'Registration failed'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full group flex items-center justify-center bg-[#C4622D] hover:bg-[#D4723D] disabled:opacity-50 text-[#F0EBE1] py-4 font-display font-semibold text-sm tracking-[0.06em] transition-all duration-200 mt-2"
                >
                  {isSubmitting || isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering…</>
                  ) : 'Register as Faculty'}
                </button>
              </Form>
            )}
          </Formik>
        )}

        <p className="font-mono text-[10px] text-[#6B6660] text-center mt-8 tracking-[0.08em]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#C4622D] hover:opacity-70 transition-opacity duration-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
