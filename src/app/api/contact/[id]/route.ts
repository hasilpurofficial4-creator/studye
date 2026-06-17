import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { ContactMessage } from "@/lib/types";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const contacts = await readData<ContactMessage[]>("contacts.json");
    const filtered = contacts.filter((c) => c.id !== id);
    if (filtered.length === contacts.length) return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 });
    await writeData("contacts.json", filtered);
    return NextResponse.json({ success: true, message: "Contact deleted" });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}
