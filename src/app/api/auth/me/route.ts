import { NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getTokenFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
