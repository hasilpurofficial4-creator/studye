"use client";
import { AdminListPage } from "@/components/admin/AdminListPage";
export default function AdminResults() {
  return <AdminListPage title="Results" apiUrl="/api/results" columns={[
    { key: "studentName", label: "Student" }, { key: "examTitle", label: "Exam" },
    { key: "totalMarks", label: "Total" }, { key: "obtainedMarks", label: "Obtained" }, { key: "percentage", label: "%" },
  ]} />;
}
