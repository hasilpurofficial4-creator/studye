"use client";
import { AdminListPage } from "@/components/admin/AdminListPage";
export default function AdminOrders() {
  return <AdminListPage title="Orders" apiUrl="/api/orders" columns={[
    { key: "name", label: "Customer" }, { key: "mobile", label: "Mobile" },
    { key: "totalAmount", label: "Amount" }, { key: "status", label: "Status" }, { key: "city", label: "City" },
  ]} />;
}
