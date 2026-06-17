"use client";
import { AdminListPage } from "@/components/admin/AdminListPage";
export default function AdminStudents() {
  return <AdminListPage title="Students" apiUrl="/api/students" columns={[
    { key: "name", label: "Name" }, { key: "fatherName", label: "Father Name" },
    { key: "class", label: "Class" }, { key: "idCard", label: "ID Card" }, { key: "address", label: "Address" },
  ]} />;
}
