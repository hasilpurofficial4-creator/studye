import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/github-api";
import { loginSchema } from "@/lib/validators";
import { createToken } from "@/lib/auth";
import { Student, Teacher } from "@/lib/types";
import { COOKIE_NAME } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password, role } = parsed.data;

    if (role === "student") {
      const students = await readData<Student[]>("students.json");
      const student = students.find(
        (s) => (s.email === email || s.idCard === email) && s.password === password
      );

      if (!student) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }

      const token = await createToken({ id: student.id, name: student.name, role: "student" });
      const response = NextResponse.json({
        success: true,
        data: { user: { id: student.id, name: student.name, role: "student" }, token },
      });

      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    if (role === "teacher") {
      const teachers = await readData<Teacher[]>("teachers.json");
      const teacher = teachers.find(
        (t) => t.email === email && t.password === password
      );

      if (!teacher) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }

      const token = await createToken({ id: teacher.id, name: teacher.name, role: "teacher" });
      const response = NextResponse.json({
        success: true,
        data: { user: { id: teacher.id, name: teacher.name, role: "teacher" }, token },
      });

      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ success: false, error: "Invalid role" }, { status: 400 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
