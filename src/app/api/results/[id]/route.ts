import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { Result } from "@/lib/types";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const results = await readData<Result[]>("results.json");
    const result = results.find((r) => r.id === id);
    if (!result) return NextResponse.json({ success: false, error: "Result not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: result });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const results = await readData<Result[]>("results.json");
    const filtered = results.filter((r) => r.id !== id);
    if (filtered.length === results.length) return NextResponse.json({ success: false, error: "Result not found" }, { status: 404 });
    await writeData("results.json", filtered);
    return NextResponse.json({ success: true, message: "Result deleted" });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}
