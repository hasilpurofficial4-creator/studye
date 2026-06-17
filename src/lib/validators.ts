import { z } from "zod";

export const studentRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father name is required"),
  class: z.string().min(1, "Class is required"),
  idCard: z.string().min(5, "ID Card number must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  email: z.string().email("Invalid email").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  imageUrl: z.string().optional(),
});

export const teacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  subject: z.string().min(1, "Subject is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const questionSchema = z.object({
  id: z.string(),
  question: z.string().min(1, "Question text is required"),
  optionA: z.string().optional(),
  optionB: z.string().optional(),
  optionC: z.string().optional(),
  optionD: z.string().optional(),
  correctOption: z.string().optional(),
  marks: z.number().min(1),
  type: z.enum(["mcq", "subjective"]),
});

export const examSchema = z.object({
  title: z.string().min(2, "Exam title is required"),
  class: z.string().min(1, "Class is required"),
  subject: z.string().optional(),
  type: z.enum(["mcq", "subjective"]),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
  totalQuestions: z.number().min(1),
  totalMarks: z.number().min(1),
  duration: z.number().optional(),
  imageUrl: z.string().optional(),
});

export const resultSchema = z.object({
  studentId: z.string(),
  studentName: z.string(),
  fatherName: z.string(),
  class: z.string(),
  examId: z.string(),
  examTitle: z.string(),
  totalMarks: z.number(),
  obtainedMarks: z.number(),
  percentage: z.number(),
  answers: z.array(z.object({
    questionId: z.string(),
    answer: z.string(),
  })),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  contactType: z.enum(["email", "mobile", "whatsapp"]),
  contactValue: z.string().min(3, "Contact value is required"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const orderSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
    imageUrl: z.string().optional(),
  })).min(1, "At least one item is required"),
  name: z.string().min(2, "Name is required"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  district: z.string().min(2, "District is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["student", "teacher"]),
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const settingsSchema = z.object({
  siteTitle: z.string(),
  logoUrl: z.string().optional(),
  heroImageUrl: z.string().optional(),
  headerText: z.string().optional(),
  footerText: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  about: z.string().optional(),
  address: z.string().optional(),
});
