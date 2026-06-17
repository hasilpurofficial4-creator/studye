import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { Student } from "@/lib/types";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const students = await readData<Student[]>("students.json");
    const student = students.find((s) => s.id === id);
    if (!student) return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const students = await readData<Student[]>("students.json");
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    students[index] = { ...students[index], ...body };
    await writeData("students.json", students);
    return NextResponse.json({ success: true, data: students[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const students = await readData<Student[]>("students.json");
    const filtered = students.filter((s) => s.id !== id);
    if (filtered.length === students.length) return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    await writeData("students.json", filtered);
    return NextResponse.json({ success: true, message: "Student deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
