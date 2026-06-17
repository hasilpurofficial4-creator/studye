import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { studentRegisterSchema } from "@/lib/validators";
import { getTokenFromRequest } from "@/lib/auth";
import { Student } from "@/lib/types";
import { generateId } from "@/lib/utils";

export async function GET() {
  try {
    const students = await readData<Student[]>("students.json");
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    console.error("Get students error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = studentRegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const students = await readData<Student[]>("students.json");
    const newStudent: Student = {
      id: generateId(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    students.push(newStudent);
    await writeData("students.json", students);

    return NextResponse.json({ success: true, data: newStudent, message: "Student added" }, { status: 201 });
  } catch (error) {
    console.error("Create student error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
