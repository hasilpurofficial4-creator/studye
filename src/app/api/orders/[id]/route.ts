import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { Order } from "@/lib/types";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const orders = await readData<Order[]>("orders.json");
    const order = orders.find((o) => o.id === id);
    if (!order) return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: order });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const orders = await readData<Order[]>("orders.json");
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    orders[index] = { ...orders[index], ...body };
    await writeData("orders.json", orders);
    return NextResponse.json({ success: true, data: orders[index] });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const orders = await readData<Order[]>("orders.json");
    const filtered = orders.filter((o) => o.id !== id);
    if (filtered.length === orders.length) return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    await writeData("orders.json", filtered);
    return NextResponse.json({ success: true, message: "Order deleted" });
  } catch { return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 }); }
}
