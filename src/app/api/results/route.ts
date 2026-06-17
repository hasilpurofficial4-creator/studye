import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { resultSchema } from "@/lib/validators";
import { Result } from "@/lib/types";
import { generateId } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const results = await readData<Result[]>("results.json");
    const data = studentId ? results.filter((r) => r.studentId === studentId) : results;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = resultSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });

    const results = await readData<Result[]>("results.json");
    const newResult: Result = {
      id: generateId(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };
    results.push(newResult);
    await writeData("results.json", results);
    return NextResponse.json({ success: true, data: newResult, message: "Result saved" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
