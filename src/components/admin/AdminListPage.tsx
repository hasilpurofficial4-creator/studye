"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";
import { FiTrash2 } from "react-icons/fi";

interface AdminListPageProps {
  title: string;
  apiUrl: string;
  columns: { key: string; label: string }[];
}

export function AdminListPage({ title, apiUrl, columns }: AdminListPageProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useNotification();

  const fetchData = () => {
    setLoading(true);
    fetch(apiUrl)
      .then((r) => r.json())
      .then((data) => setItems(data.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [apiUrl]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Item deleted", "success");
      setItems((prev) => prev.filter((i) => (i as Record<string, string>).id !== id));
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  if (loading) return <Loader text={`Loading ${title}...`} />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-6">{title}</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-display uppercase tracking-wider text-white/40 border-b border-white/10">
              {columns.map((col) => (
                <th key={col.key} className="pb-3 pr-4">{col.label}</th>
              ))}
              <th className="pb-3 w-12">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={(item as Record<string, string>).id} className="border-b border-white/5 text-sm">
                {columns.map((col) => (
                  <td key={col.key} className="py-3 pr-4 text-white/60 max-w-[200px] truncate">
                    {String(item[col.key] ?? "N/A")}
                  </td>
                ))}
                <td className="py-3">
                  <button
                    onClick={() => handleDelete((item as Record<string, string>).id)}
                    className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length === 0 && (
        <div className="text-center py-16 text-white/30 font-body">
          No {title.toLowerCase()} found.
        </div>
      )}

      <div className="mt-4 text-sm text-white/30 font-body">
        Total: {items.length} records
      </div>
    </div>
  );
}
