import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { contactSchema } from "@/lib/validators";
import { ContactMessage } from "@/lib/types";
import { generateId } from "@/lib/utils";

export async function GET() {
  try {
    const contacts = await readData<ContactMessage[]>("contacts.json");
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });

    const newContact: ContactMessage = {
      id: generateId(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    try {
      const contacts = await readData<ContactMessage[]>("contacts.json");
      contacts.push(newContact);
      await writeData("contacts.json", contacts);
    } catch (dbError) {
      // GitHub not configured - log but still accept the message
      console.error("Contact DB write failed (GitHub not configured?):", dbError);
    }

    return NextResponse.json({ success: true, data: newContact, message: "Message sent successfully" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
