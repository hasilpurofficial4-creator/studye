import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { Teacher } from "@/lib/types";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const teachers = await readData<Teacher[]>("teachers.json");
    const teacher = teachers.find((t) => t.id === id);
    if (!teacher) return NextResponse.json({ success: false, error: "Teacher not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: teacher });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const teachers = await readData<Teacher[]>("teachers.json");
    const index = teachers.findIndex((t) => t.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Teacher not found" }, { status: 404 });
    teachers[index] = { ...teachers[index], ...body };
    await writeData("teachers.json", teachers);
    return NextResponse.json({ success: true, data: teachers[index] });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const teachers = await readData<Teacher[]>("teachers.json");
    const filtered = teachers.filter((t) => t.id !== id);
    if (filtered.length === teachers.length) return NextResponse.json({ success: false, error: "Teacher not found" }, { status: 404 });
    await writeData("teachers.json", filtered);
    return NextResponse.json({ success: true, message: "Teacher deleted" });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}
