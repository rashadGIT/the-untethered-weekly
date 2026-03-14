import Image from "next/image";
import Button from "../components/Button";
import NewsletterForm from "../components/NewsletterForm";

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
          <h1 className="text-5xl md:text-6xl font-heading mb-6 text-[#a08216]">
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
            <div className="relative h-[480px] sm:h-[350px] md:h-[500px]">
              <Image
                src="/assets/images/home/lead-magnet-mockup copy - white  with Shannon.png"
                alt="Free Untethered Seller Audio Training"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#7a6212] mb-4">Free Training</div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#161317] mb-6">
                The Untethered Seller Audio Training
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Listen to this FREE audio from Shannon and learn the 3 steps that&apos;ll change your sales life, fast.
              </p>
              <div className="space-y-4 text-gray-700 mb-8">
                <p>
                  Stop waiting for confidence. Start operating from internal authority. In this audio training, you&apos;ll discover:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#7a6212] mt-1">✓</span>
                    <span>How to identify the &quot;tethers&quot; holding you back</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#7a6212] mt-1">✓</span>
                    <span>The shift from performance to presence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#7a6212] mt-1">✓</span>
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
          
          <NewsletterForm />
        </div>
      </section>

      {/* Recommended Reading / Tools (Placeholder for future content) */}
      <section className="py-20 bg-[#161317] text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
            More Ways To Untether
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 border border-white/10 hover:border-[#a08216] transition-colors group" aria-disabled="true">
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#a08216] transition-colors">Recommended Reading</h3>
              <p className="text-gray-400 mb-6">
                Books that have shaped the Untethered Seller philosophy and courage mindset.
              </p>
              <span className="text-sm font-bold uppercase tracking-widest text-[#a08216]" aria-label="Recommended Reading — Coming Soon">Coming Soon</span>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 hover:border-[#a08216] transition-colors group" aria-disabled="true">
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#a08216] transition-colors">Sales Scripts</h3>
              <p className="text-gray-400 mb-6">
                Not rigid scripts, but frameworks for courageous conversations.
              </p>
              <span className="text-sm font-bold uppercase tracking-widest text-[#a08216]" aria-label="Sales Scripts — Coming Soon">Coming Soon</span>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 hover:border-[#a08216] transition-colors group" aria-disabled="true">
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#a08216] transition-colors">Community</h3>
              <p className="text-gray-400 mb-6">
                Connect with other women who are choosing courage over comfort.
              </p>
              <span className="text-sm font-bold uppercase tracking-widest text-[#a08216]" aria-label="Community — Coming Soon">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#a08216] text-white text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">
            Ready To Go Deeper?
          </h2>
          <p className="text-xl mb-10 text-white/90 font-medium">
            Resources are great, but implementation is better. Let&apos;s work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/work-with-me" variant="secondary" className="!bg-white !text-[#a08216] hover:!bg-gray-100">
              View Programs
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}