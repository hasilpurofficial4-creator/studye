import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { examSchema } from "@/lib/validators";
import { Exam } from "@/lib/types";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const exams = await readData<Exam[]>("exams.json");
    const exam = exams.find((e) => e.id === id);
    if (!exam) return NextResponse.json({ success: false, error: "Exam not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: exam });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const exams = await readData<Exam[]>("exams.json");
    const index = exams.findIndex((e) => e.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Exam not found" }, { status: 404 });
    exams[index] = { ...exams[index], ...body };
    await writeData("exams.json", exams);
    return NextResponse.json({ success: true, data: exams[index] });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const exams = await readData<Exam[]>("exams.json");
    const filtered = exams.filter((e) => e.id !== id);
    if (filtered.length === exams.length) return NextResponse.json({ success: false, error: "Exam not found" }, { status: 404 });
    await writeData("exams.json", filtered);
    return NextResponse.json({ success: true, message: "Exam deleted" });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}
