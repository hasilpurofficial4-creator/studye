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
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });

    const contacts = await readData<ContactMessage[]>("contacts.json");
    const newContact: ContactMessage = {
      id: generateId(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };
    contacts.push(newContact);
    await writeData("contacts.json", contacts);
    return NextResponse.json({ success: true, data: newContact, message: "Message sent successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
