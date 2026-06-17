import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { studentRegisterSchema } from "@/lib/validators";
import { createToken } from "@/lib/auth";
import { Student } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { COOKIE_NAME } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = studentRegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const students = await readData<Student[]>("students.json");

    // Check duplicate
    const exists = students.find(
      (s) => s.idCard === parsed.data.idCard || (parsed.data.email && s.email === parsed.data.email)
    );
    if (exists) {
      return NextResponse.json(
        { success: false, error: "Student with this ID Card or Email already exists" },
        { status: 409 }
      );
    }

    const newStudent: Student = {
      id: generateId(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    students.push(newStudent);
    await writeData("students.json", students);

    const token = await createToken({ id: newStudent.id, name: newStudent.name, role: "student" });
    const response = NextResponse.json({
      success: true,
      data: { user: { id: newStudent.id, name: newStudent.name, role: "student" }, token },
      message: "Registration successful",
    }, { status: 201 });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
