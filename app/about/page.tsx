import Image from "next/image";
import Button from "../components/Button";

export const metadata = {
  title: "About Shannon Muruli | Courage Coach to Women Who Sell",
  description: "From parking lot sales to regional manager. Learn how Shannon Muruli helps women in sales cultivate courage and untether from their comfort zones.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#161317] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/professional-portrait.jpg"
            alt="Shannon Muruli professional portrait"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 container text-center px-6">
          <h1 className="text-5xl md:text-7xl font-heading mb-6">
            From Parking Lots To Regional Manager
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            My journey from selling pre-paid legal services in parking lots to helping women who sell become untethered sellers.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-4xl mb-6">The Empty Pool Story</h2>
            <p>
              I started out selling pre-paid legal services in parking lots. Not the most glamorous beginning, but it was where I learned what most salespeople never learn: <strong>courage is a competitive advantage.</strong>
            </p>
            <p>
              After meeting a prospect in a Walmart parking lot, following up, and taking them through my sales process, I found myself a week later delivering an award-worthy sales presentation to about a dozen of their construction workers—<em>inside of an empty pool.</em>
            </p>
            <p>
              That moment? That was when I realized: <strong>most people won't show up.</strong> Most people will let the strangeness of the situation talk them out of the opportunity. But the ones who choose courage over comfort? They show up. And they sell.
            </p>

            <h2 className="font-heading text-4xl mt-12 mb-6">From Individual Contributor to Regional Manager</h2>
            <p>
              In less than a year, I transitioned from an individual contributor role to Regional Sales Manager. I inherited an underperforming region, initially ranked last among five, and elevated it to the #1 position.
            </p>
            <p>
              How? I taught them how to do one thing better than any other region: <strong>PROSPECT.</strong>
            </p>
            <p>
              Not with scripts. Not with tactics. With <em>courage.</em> I taught them how to untether from the narratives that kept them from picking up the phone, from walking into the networking event, from following up with the prospect who seemed "out of their league."
            </p>

            <h2 className="font-heading text-4xl mt-12 mb-6">The 900% Territory Elevation</h2>
            <p>
              In one corporate role, I elevated my territory by <strong>900% in less than 90 days.</strong> While in direct sales, I built a team of 200 within 12 months.
            </p>
            <p>
              Those results didn't come from a proprietary sales system. They came from a mindset shift. From choosing <strong>Courage Over Comfort</strong> in every high-stakes moment.
            </p>

            <h2 className="font-heading text-4xl mt-12 mb-6">Why I Coach Women Who Sell</h2>
            <p>
              Over my 10+ years of coaching (since 2014), I've noticed a pattern: Women who sell are brilliant, strategic, and capable. But they're often tethered to comfort zones that don't serve them.
            </p>
            <p>
              They procrastinate on prospecting. They avoid networking events. They let fear of rejection dictate their pipeline. And they wonder why they're not hitting their goals.
            </p>
            <p>
              <strong>I help women who sell untether from those comfort zones so they can serve more and sell more.</strong>
            </p>
            <p>
              Because here's what I know: Your prospects need what you sell. But they want you to <em>connect</em> with them, not sell them. And you can't connect with prospects if you're avoiding them.
            </p>

            <h2 className="font-heading text-4xl mt-12 mb-6">The Untethered Seller Philosophy</h2>
            <p>
              I don't start with strategy. I start with <strong>self-image.</strong>
            </p>
            <p>
              Because when your identity shifts, your behavior follows. When you see yourself as an <em>untethered seller</em>—someone who operates from courage rather than comfort—everything changes.
            </p>
            <p>
              You stop waiting for confidence. You start showing up anyway. You stop conflating relief with alignment. You start choosing courage.
            </p>
            <p>
              And that's when the sales come.
            </p>
          </div>
        </div>
      </section>

      {/* Stats & Social Proof */}
      <section className="section-padding bg-[#f9f9f9]">
        <div className="container text-center">
          <h2 className="text-4xl font-heading mb-12">By The Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-5xl font-heading font-bold mb-2">10+</div>
              <div className="text-sm text-gray-600">Years coaching women who sell (since 2014)</div>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold mb-2">7,415</div>
              <div className="text-sm text-gray-600">Women follow Shannon's work on Facebook</div>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold mb-2">92%</div>
              <div className="text-sm text-gray-600">Recommendation rate (15 client reviews)</div>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold mb-2">408+</div>
              <div className="text-sm text-gray-600">Instagram posts sharing sales courage insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Photos Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-4xl font-heading text-center mb-12">Moments That Matter</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative h-80">
              <Image
                src="/images/speaking.jpg"
                alt="Shannon Muruli speaking at event"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-80">
              <Image
                src="/images/coaching-session.jpg"
                alt="Shannon Muruli coaching session"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-80">
              <Image
                src="/images/casual-outdoor.jpg"
                alt="Shannon Muruli portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#161317] text-white text-center">
        <div className="container-narrow">
          <h2 className="text-4xl md:text-5xl font-heading mb-6 text-white">
            Ready To Become An Untethered Seller?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Let's work together to untether you from your comfort zone so you can serve more and sell more.
          </p>
          <Button href="/work-with-me" variant="primary">
            Explore Coaching Options
          </Button>
        </div>
      </section>
    </>
  );
}
