"use client";
import { AdminListPage } from "@/components/admin/AdminListPage";
export default function AdminTeachers() {
  return <AdminListPage title="Teachers" apiUrl="/api/teachers" columns={[
    { key: "name", label: "Name" }, { key: "subject", label: "Subject" },
    { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
  ]} />;
}
