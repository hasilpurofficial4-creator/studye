// ============================================================
// Study Hub Lahore - TypeScript Type Definitions
// ============================================================

export interface Student {
  id: string;
  name: string;
  fatherName: string;
  class: string;
  idCard: string;
  address: string;
  email?: string;
  password?: string;
  createdAt: string;
  imageUrl?: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  password: string;
  phone?: string;
  createdAt: string;
  imageUrl?: string;
}

export interface Question {
  id: string;
  question: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctOption?: string;
  marks: number;
  type: "mcq" | "subjective";
}

export interface Exam {
  id: string;
  title: string;
  class: string;
  subject?: string;
  type: "mcq" | "subjective";
  questions: Question[];
  totalQuestions: number;
  totalMarks: number;
  duration?: number; // minutes
  createdBy: string;
  createdAt: string;
  imageUrl?: string;
}

export interface Answer {
  questionId: string;
  answer: string;
}

export interface Result {
  id: string;
  studentId: string;
  studentName: string;
  fatherName: string;
  class: string;
  examId: string;
  examTitle: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  answers: Answer[];
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  contactType: "email" | "mobile" | "whatsapp";
  contactValue: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  name: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  district: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  createdAt: string;
}

export interface Settings {
  siteTitle: string;
  logoUrl: string;
  heroImageUrl: string;
  headerText: string;
  footerText: string;
  mobile: string;
  email: string;
  about: string;
  address: string;
}

export interface AuthPayload {
  id: string;
  name: string;
  role: "student" | "teacher" | "admin";
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Notification {
  id: string;
  type: "student" | "teacher" | "exam" | "result" | "contact" | "order";
  message: string;
  read: boolean;
  createdAt: string;
}
