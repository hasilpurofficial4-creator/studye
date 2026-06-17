import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/github-api";
import { orderSchema } from "@/lib/validators";
import { Order } from "@/lib/types";
import { generateId } from "@/lib/utils";

export async function GET() {
  try {
    const orders = await readData<Order[]>("orders.json");
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });

    const orders = await readData<Order[]>("orders.json");
    const totalAmount = parsed.data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: generateId(),
      ...parsed.data,
      totalAmount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    await writeData("orders.json", orders);
    return NextResponse.json({ success: true, data: newOrder, message: "Order placed successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
