import Image from "next/image";
import Button from "../components/Button";

export const metadata = {
  title: "Work With Me | Shannon Muruli Coaching",
  description: "Explore coaching programs for women who sell: Self-Image That Sells, Courage Over Comfort Coaching, and The Sell More Soirée.",
};

export default function WorkWithMePage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-white text-center">
        <div className="container-narrow pt-2 md:pt-0">
          <h1 className="text-5xl md:text-6xl font-heading mb-6">
            Work With Me
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Three ways to cultivate courage, untether from your comfort zone, and become the seller you're capable of being.
          </p>
        </div>
      </section>

      {/* Self-Image That Sells - PRIMARY */}
      <section className="section-padding bg-[#f9f9f9]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/images/coaching-session.jpg"
                alt="Shannon Muruli coaching session"
                fill
                className="object-cover shadow-lg"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#3e3641] mb-4">Foundational Program</div>
              <h2 className="text-4xl font-heading mb-6">Self-Image That Sells</h2>
              <p className="text-xl text-gray-700 mb-6">
                My most foundational work for women who sell. We start with self-image—not strategy.
              </p>
              <div className="space-y-4 text-gray-700 mb-8">
                <p>
                  Because when you see yourself differently, you show up differently. When your identity shifts from "person who sells sometimes" to "untethered seller," your behavior follows.
                </p>
                <p>
                  This program is for women who sell who are done waiting for confidence and ready to choose courage.
                </p>
              </div>
              <div className="bg-white p-6 mb-8 border-l-4 border-[#161317]">
                <h3 className="font-heading text-xl mb-4">What We'll Work On:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Self-image transformation: shifting how you see yourself as a seller</li>
                  <li>• Prospecting courage: untethering from fear-based behaviors</li>
                  <li>• Presence over performance: connecting vs. convincing</li>
                  <li>• Internal authority: operating from confidence rather than fear</li>
                  <li>• Momentum strategies: showing up before you feel ready</li>
                </ul>
              </div>
              <Button href="/contact">Get Started</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Courage Over Comfort Coaching */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="text-xs uppercase tracking-wider text-[#3e3641] mb-4">1-on-1 Coaching</div>
              <h2 className="text-4xl font-heading mb-6">Courage Over Comfort Coaching</h2>
              <p className="text-xl text-gray-700 mb-6">
                One-on-one coaching for women who sell who are ready for personalized support.
              </p>
              <div className="space-y-4 text-gray-700 mb-8">
                <p>
                  We disrupt the narratives that keep you tethered to your comfort zone. We identify the specific fear-based behaviors holding you back (procrastination, rejection avoidance, perfectionism) and replace them with courage-based actions.
                </p>
                <p>
                  This isn't about giving you scripts or tactics. It's about shifting your self-image so profoundly that the behaviors change automatically.
                </p>
              </div>
              <div className="bg-[#f9f9f9] p-6 mb-8 border-l-4 border-[#161317]">
                <h3 className="font-heading text-xl mb-4">This Is For You If:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• You procrastinate on prospecting and know it's costing you</li>
                  <li>• Fear of rejection is keeping your pipeline thin</li>
                  <li>• You avoid networking events even when you know you should go</li>
                  <li>• You're tired of choosing comfort over commission</li>
                  <li>• You want personalized accountability and support</li>
                </ul>
              </div>
              <Button href="/contact">Apply for Coaching</Button>
            </div>
            <div className="relative h-[400px] order-1 md:order-2">
              <Image
                src="/images/coc-branding.jpg"
                alt="Courage Over Comfort coaching"
                fill
                className="object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Sell More Soirée */}
      <section className="section-padding bg-[#f9f9f9]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/images/speaking-professional.jpg"
                alt="Shannon Muruli speaking at event"
                fill
                className="object-cover shadow-lg"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#3e3641] mb-4">Live Event</div>
              <h2 className="text-4xl font-heading mb-6">The Sell More Soirée</h2>
              <p className="text-xl text-gray-700 mb-6">
                An event for women who sell who are ready to untether from comfort and step into their full sales potential.
              </p>
              <div className="space-y-4 text-gray-700 mb-8">
                <p>
                  Connection. Courage. Community.
                </p>
                <p>
                  This isn't another sales tactics workshop. This is a space where women who sell come together to cultivate courage, share their struggles without shame, and leave with a renewed sense of what's possible when you choose courage over comfort.
                </p>
                <p>
                  <strong>Details and dates to be announced.</strong> Join The Untethered Weekly newsletter to be the first to know when registration opens.
                </p>
              </div>
              <Button href="#newsletter">Join The Waitlist</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <h2 className="text-4xl font-heading text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-heading mb-3">How is this different from traditional sales training?</h3>
              <p className="text-gray-700">
                I don't start with strategy. I start with self-image. Most sales training teaches tactics without addressing the internal narratives that keep you from executing those tactics. We fix the root cause: your self-image as a seller.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-heading mb-3">What if I'm naturally shy or introverted?</h3>
              <p className="text-gray-700">
                You're not a shy seller. You're in environments that activate your shyness. I teach you how to differentiate between environmental-based shyness and inherent personality—and how to operate from courage regardless.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-heading mb-3">How long does coaching take?</h3>
              <p className="text-gray-700">
                That depends on your goals and commitment level. Some clients see shifts in weeks. Others work with me for months. We'll discuss your specific timeline during our initial conversation.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-heading mb-3">Do you offer payment plans?</h3>
              <p className="text-gray-700">
                Let's talk about your situation during our initial consultation. I'm committed to making this work accessible to women who are serious about growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#161317] text-white text-center">
        <div className="container-narrow">
          <h2 className="text-4xl md:text-5xl font-heading mb-6 text-white">
            Ready To Choose Courage Over Comfort?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Let's talk about which option is right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary">
              Start The Conversation
            </Button>
            <Button href="/client-results" variant="ghost">
              See Client Results
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
