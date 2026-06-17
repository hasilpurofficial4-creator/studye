"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import GlassCard from "@/components/ui/GlassCard";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const { showToast } = useNotification();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", mobile: "", email: "", address: "", city: "", district: "" });
  const [loading, setLoading] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { showToast("Cart is empty", "error"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      clearCart();
      showToast("Order placed successfully!", "success");
      router.push("/");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to place order", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          <span className="neon-text">Checkout</span>
        </h1>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card glow>
          <h2 className="font-display text-lg font-bold text-white mb-4">Order Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" value={form.name} onChange={update("name")} required />
            <Input label="Mobile Number" value={form.mobile} onChange={update("mobile")} required />
            <Input label="Email" type="email" value={form.email} onChange={update("email")} required />
            <Input label="Address" value={form.address} onChange={update("address")} required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="City" value={form.city} onChange={update("city")} required />
              <Input label="District" value={form.district} onChange={update("district")} required />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
              Place Order
            </Button>
          </form>
        </Card>

        {/* Order Summary */}
        <div>
          <GlassCard>
            <h2 className="font-display text-lg font-bold text-white mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-white/60">{item.name} x{item.quantity}</span>
                  <span className="text-white font-display">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 flex items-center justify-between">
              <span className="font-display text-lg text-white/60">Total</span>
              <span className="font-display text-2xl font-bold neon-text">Rs. {totalAmount}</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
