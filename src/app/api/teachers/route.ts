import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { teacherSchema } from "@/lib/validators";
import { Teacher } from "@/lib/types";
import { generateId } from "@/lib/utils";

export async function GET() {
  try {
    const teachers = await readData<Teacher[]>("teachers.json");
    return NextResponse.json({ success: true, data: teachers });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = teacherSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });

    const teachers = await readData<Teacher[]>("teachers.json");
    const newTeacher: Teacher = { id: generateId(), ...parsed.data, createdAt: new Date().toISOString() };
    teachers.push(newTeacher);
    await writeData("teachers.json", teachers);
    return NextResponse.json({ success: true, data: newTeacher, message: "Teacher added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
