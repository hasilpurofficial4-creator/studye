import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="font-display text-8xl font-black neon-text mb-4">404</h1>
      <h2 className="font-display text-2xl text-white/80 mb-4">Page Not Found</h2>
      <p className="text-white/40 font-body mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link
        href="/"
        className="btn-gaming rounded-xl px-8 py-3"
      >
        Back to Home
      </Link>
    </div>
  );
}
