import Image from "next/image";
import Button from "../components/Button";

export const metadata = {
  title: "Resources | Shannon Muruli",
  description: "Free resources, tools, and insights to help you untether from your comfort zone and sell more.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-32 bg-white text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#161317] mb-6">
            Resources
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Tools, guides, and insights to help you cultivate courage, untether from your comfort zone, and serve more people.
          </p>
        </div>
      </section>

      {/* Free Audio Training */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/images/lead-magnet-mockup copy - white  with Shannon.png"
                alt="Free Untethered Seller Audio Training"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#FF6B35] mb-4">Free Training</div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#161317] mb-6">
                The Untethered Seller Audio Training
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Listen to this FREE audio from Shannon and learn the 3 steps that'll change your sales life, fast.
              </p>
              <div className="space-y-4 text-gray-700 mb-8">
                <p>
                  Stop waiting for confidence. Start operating from internal authority. In this audio training, you'll discover:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF6B35] mt-1">✓</span>
                    <span>How to identify the "tethers" holding you back</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF6B35] mt-1">✓</span>
                    <span>The shift from performance to presence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF6B35] mt-1">✓</span>
                    <span>Practical steps to choose courage over comfort today</span>
                  </li>
                </ul>
              </div>
              <Button href="#newsletter" variant="primary">
                Get The Free Audio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white" id="newsletter">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-4">Weekly Sales Courage</div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#161317] mb-6">
            Join The Untethered Weekly
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Weekly sales courage delivered to your inbox. For women who sell who are ready to choose courage over comfort, untether from their comfort zones, and serve more people.
          </p>
          
          <form className="max-w-md mx-auto flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-none focus:outline-none focus:border-[#FF6B35] transition-colors text-center"
              required
            />
            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#161317] text-white font-bold uppercase tracking-[0.15em] hover:bg-[#FF6B35] transition-colors"
            >
              Get Weekly Courage
            </button>
            <p className="text-xs text-gray-400 mt-2">
              No spam. Unsubscribe anytime. Just courage.
            </p>
          </form>
        </div>
      </section>

      {/* Recommended Reading / Tools (Placeholder for future content) */}
      <section className="py-20 bg-[#161317] text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
            More Ways To Untether
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 border border-white/10 hover:border-[#FF6B35] transition-colors group cursor-pointer">
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#FF6B35] transition-colors">Recommended Reading</h3>
              <p className="text-gray-400 mb-6">
                Books that have shaped the Untethered Seller philosophy and courage mindset.
              </p>
              <span className="text-sm font-bold uppercase tracking-widest text-[#FF6B35]">Coming Soon</span>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 hover:border-[#FF6B35] transition-colors group cursor-pointer">
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#FF6B35] transition-colors">Sales Scripts</h3>
              <p className="text-gray-400 mb-6">
                Not rigid scripts, but frameworks for courageous conversations.
              </p>
              <span className="text-sm font-bold uppercase tracking-widest text-[#FF6B35]">Coming Soon</span>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 hover:border-[#FF6B35] transition-colors group cursor-pointer">
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#FF6B35] transition-colors">Community</h3>
              <p className="text-gray-400 mb-6">
                Connect with other women who are choosing courage over comfort.
              </p>
              <span className="text-sm font-bold uppercase tracking-widest text-[#FF6B35]">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FF6B35] text-white text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">
            Ready To Go Deeper?
          </h2>
          <p className="text-xl mb-10 text-white/90 font-medium">
            Resources are great, but implementation is better. Let's work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/work-with-me" variant="secondary" className="!bg-white !text-[#FF6B35] hover:!bg-gray-100">
              View Programs
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}