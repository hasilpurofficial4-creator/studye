"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { ROUTES } from "@/lib/constants";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalAmount, clearCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Your <span className="neon-text">Cart</span>
        </h1>
      </motion.div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <FiShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body text-lg mb-6">Your cart is empty</p>
          <Link href="/"><Button variant="primary">Continue Shopping</Button></Link>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-8">
            {items.map((item) => (
              <GlassCard key={item.id} className="!p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-white">{item.name}</h3>
                    <p className="text-sm text-neon-blue font-display">Rs. {item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white">
                      <FiMinus size={14} />
                    </button>
                    <span className="font-display font-bold text-white w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white">
                      <FiPlus size={14} />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-red-400/60 hover:text-red-400">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Summary */}
          <GlassCard glow>
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-lg text-white/60">Total</span>
              <span className="font-display text-2xl font-bold neon-text">Rs. {totalAmount}</span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={clearCart} className="flex-1">Clear Cart</Button>
              <Link href={ROUTES.CHECKOUT} className="flex-1">
                <Button variant="primary" size="lg" className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
}
