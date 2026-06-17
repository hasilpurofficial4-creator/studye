"use client";
import { AdminListPage } from "@/components/admin/AdminListPage";
export default function AdminContacts() {
  return <AdminListPage title="Contact Messages" apiUrl="/api/contact" columns={[
    { key: "name", label: "Name" }, { key: "contactType", label: "Type" },
    { key: "contactValue", label: "Contact" }, { key: "message", label: "Message" },
  ]} />;
}
