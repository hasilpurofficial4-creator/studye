import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { settingsSchema } from "@/lib/validators";
import { Settings } from "@/lib/types";

const defaultSettings: Settings = {
  siteTitle: "Study Hub Lahore",
  logoUrl: "",
  heroImageUrl: "",
  headerText: "Study Hub Lahore",
  footerText: "Study Hub Lahore by M. Azam",
  mobile: "+92 300 1234567",
  email: "info@studyhublahore.com",
  about: "Study Hub Lahore is a premium gaming-style academy platform for modern education.",
  address: "Lahore, Pakistan",
};

export async function GET() {
  try {
    const settings = await readData<Settings>("settings.json");
    const data = { ...defaultSettings, ...settings };
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: true, data: defaultSettings });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });

    const current = await readData<Settings>("settings.json").catch(() => defaultSettings);
    const updated = { ...current, ...parsed.data };
    await writeData("settings.json", updated);
    return NextResponse.json({ success: true, data: updated, message: "Settings updated" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
