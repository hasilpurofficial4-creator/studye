"use client";
import { AdminListPage } from "@/components/admin/AdminListPage";
export default function AdminExams() {
  return <AdminListPage title="Exams" apiUrl="/api/exams" columns={[
    { key: "title", label: "Title" }, { key: "class", label: "Class" },
    { key: "type", label: "Type" }, { key: "totalQuestions", label: "Questions" }, { key: "totalMarks", label: "Marks" },
  ]} />;
}
