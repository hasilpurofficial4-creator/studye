import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { examSchema } from "@/lib/validators";
import { Exam } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { getTokenFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const exams = await readData<Exam[]>("exams.json");
    return NextResponse.json({ success: true, data: exams });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getTokenFromRequest(request);
    if (!user || (user.role !== "teacher" && user.role !== "admin")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = examSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });

    const exams = await readData<Exam[]>("exams.json");
    const newExam: Exam = {
      id: generateId(),
      ...parsed.data,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
    };
    exams.push(newExam);
    await writeData("exams.json", exams);
    return NextResponse.json({ success: true, data: newExam, message: "Exam created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
