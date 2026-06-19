import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Loader2 } from 'lucide-react';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/store';
import { setCredentials } from '@/store/slices/authSlice';
import { toast } from 'sonner';

const inputClass =
  'w-full bg-transparent border-b border-[#2A2522] focus:border-[#C4622D] text-[#F0EBE1] placeholder:text-[#6B6660] py-3 text-sm outline-none transition-colors duration-200 font-mono tracking-[0.03em]';

const labelClass =
  'font-mono text-[9px] tracking-[0.2em] text-[#6B6660] uppercase block mb-2';

const errorClass = 'font-mono text-[9px] text-red-400 tracking-[0.06em] mt-1';

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const [tab, setTab] = useState<'student' | 'faculty'>('student');

  const handleLogin = async (values: { email: string; password: string }, userType: string) => {
    try {
      const result = await login(values).unwrap();
      if (result.success) {
        dispatch(setCredentials({ user: result.data.user }));
        toast.success(`${userType} login successful!`);
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Login failed');
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
              className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity duration-200"
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

        <Formik
          key={tab}
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => handleLogin(values, tab === 'student' ? 'Student' : 'Faculty')}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-7">
              <div>
                <label className={labelClass}>Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder={tab === 'student' ? 'student@example.com' : 'faculty@mernacademy.com'}
                  className={inputClass}
                />
                <ErrorMessage name="email" component="p" className={errorClass} />
              </div>

              <div>
                <label className={labelClass}>Password</label>
                <Field name="password" type="password" placeholder="Enter your password" className={inputClass} />
                <ErrorMessage name="password" component="p" className={errorClass} />
              </div>

              {error && (
                <p className="font-mono text-[10px] text-red-400 tracking-[0.06em]">
                  {(error as any)?.data?.message || 'Login failed'}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full flex items-center justify-center bg-[#C4622D] hover:bg-[#D4723D] disabled:opacity-50 text-[#F0EBE1] py-4 font-display font-semibold text-sm tracking-[0.06em] transition-all duration-200 mt-2"
              >
                {isSubmitting || isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…</>
                ) : `Sign in as ${tab === 'student' ? 'Student' : 'Faculty'}`}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 text-center space-y-2">
          <p className="font-mono text-[10px] text-[#6B6660] tracking-[0.08em]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#C4622D] hover:opacity-70 transition-opacity duration-200">
              Register
            </Link>
          </p>
          <p className="font-mono text-[10px] text-[#6B6660] tracking-[0.08em]">
            <Link to="/admin" className="hover:text-[#A39E95] transition-colors duration-200">
              Admin Panel
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
