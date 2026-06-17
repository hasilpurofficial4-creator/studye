export const APP_NAME = "Study Hub Lahore";
export const APP_OWNER = "M. Azam";
export const APP_DESCRIPTION = "Premium Gaming-Style Academy Platform";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  CART: "/cart",
  CHECKOUT: "/checkout",
  STUDENT: {
    LOGIN: "/student/login",
    REGISTER: "/student/register",
    DASHBOARD: "/student/dashboard",
  },
  TEACHER: {
    LOGIN: "/teacher/login",
    DASHBOARD: "/teacher/dashboard",
  },
  EXAM: {
    LIST: "/exam",
    TAKE: (id: string) => `/exam/${id}`,
  },
  RESULTS: {
    LIST: "/results",
    VIEW: (id: string) => `/results/${id}`,
  },
  ADMIN: {
    HOME: "/admin",
    STUDENTS: "/admin/students",
    TEACHERS: "/admin/teachers",
    EXAMS: "/admin/exams",
    RESULTS: "/admin/results",
    ORDERS: "/admin/orders",
    CONTACTS: "/admin/contacts",
    SETTINGS: "/admin/settings",
    NOTIFICATIONS: "/admin/notifications",
  },
} as const;

export const CLASSES = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12", "O-Level", "A-Level",
];

export const COOKIE_NAME = "shl_token";
export const TOKEN_EXPIRY = "7d";

export const API_PATHS = {
  AUTH_LOGIN: "/api/auth/login",
  AUTH_REGISTER: "/api/auth/register",
  AUTH_ADMIN: "/api/auth/admin",
  STUDENTS: "/api/students",
  TEACHERS: "/api/teachers",
  EXAMS: "/api/exams",
  RESULTS: "/api/results",
  CONTACT: "/api/contact",
  ORDERS: "/api/orders",
  SETTINGS: "/api/settings",
  UPLOAD: "/api/upload",
} as const;
