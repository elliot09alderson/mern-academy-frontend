export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5003/api';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    profile: '/auth/profile',
    changePassword: '/auth/change-password',
  },
  courses: {
    base: '/courses',
    byId: (id: string) => `/courses/${id}`,
    byBranch: (branchId: string) => `/courses/branch/${branchId}`,
    bySemester: (semester: number) => `/courses/semester/${semester}`,
    active: '/courses/active',
    assignFaculty: (id: string) => `/courses/${id}/assign-faculty`,
  },
  branches: {
    base: '/branches',
    byId: (id: string) => `/branches/${id}`,
    active: '/branches/active',
    statistics: (id: string) => `/branches/${id}/statistics`,
  },
  events: {
    base: '/events',
    byId: (id: string) => `/events/${id}`,
    upcoming: '/events/upcoming',
    past: '/events/past',
    featured: '/events/featured',
    register: (id: string) => `/events/${id}/register`,
    unregister: (id: string) => `/events/${id}/unregister`,
    uploadImage: (id: string) => `/events/${id}/images`,
  },
  students: {
    base: '/students',
    byId: (id: string) => `/students/${id}`,
    outstanding: '/students/outstanding',
    topPerformers: '/students/top-performers',
    bySemester: (semester: number) => `/students/semester/${semester}`,
  },
  faculty: {
    base: '/faculty',
    byId: (id: string) => `/faculty/${id}`,
    courses: (id: string) => `/faculty/${id}/courses`,
  },
};