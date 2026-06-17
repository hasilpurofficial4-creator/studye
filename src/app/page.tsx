"use client";

import IntroAnimation from "@/components/home/IntroAnimation";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";

export default function HomePage() {
  return (
    <IntroAnimation>
      <HeroSection />
      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-12 neon-border">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to <span className="neon-text-purple">Level Up</span>?
            </h2>
            <p className="text-white/40 font-body text-lg mb-8">
              Join Study Hub Lahore today and experience education reimagined.
              Register as a student or teacher and start your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/student/register" className="btn-gaming rounded-xl">
                Register Now
              </a>
              <a href="/about" className="btn-gaming rounded-xl" style={{ borderColor: "var(--color-neon-purple)", color: "var(--color-neon-purple)" }}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </IntroAnimation>
  );
}
