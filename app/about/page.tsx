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
      <section className="section-padding bg-white text-center">
        <div className="container-narrow pt-2 md:pt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading mb-6 text-[#a08216]">
            From Parking Lots To Regional Manager
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            My journey from selling pre-paid legal services in parking lots to helping women who sell become untethered sellers.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-[#f9f9f9]">
        <div className="container-narrow">
          <div className="bg-white p-6 sm:p-12 shadow-lg">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-4xl mb-6">The Empty Pool Story</h2>
            <p>
              I started out selling pre-paid legal services in parking lots. Not the most glamorous beginning, but it was where I learned what most salespeople never learn: <strong>courage is a competitive advantage.</strong>
            </p>
            <p>
              After meeting a prospect in a Walmart parking lot, following up, and taking them through my sales process, I found myself a week later delivering an award-worthy sales presentation to about a dozen of their construction workers—<em>inside of an empty pool.</em>
            </p>
            <p>
              That moment? That was when I realized: <strong>most people won&apos;t show up.</strong> Most people will let the strangeness of the situation talk them out of the opportunity. But the ones who choose courage over comfort? They show up. And they sell.
            </p>

            <h2 className="font-heading text-4xl mt-12 mb-6">From Individual Contributor to Regional Manager</h2>
            <p>
              In less than a year, I transitioned from an individual contributor role to Regional Sales Manager. I inherited an underperforming region, initially ranked last among five, and elevated it to the #1 position.
            </p>
            <p>
              How? I taught them how to do one thing better than any other region: <strong>PROSPECT.</strong>
            </p>
            <p>
              Not with scripts. Not with tactics. With <em>courage.</em> I taught them how to untether from the narratives that kept them from picking up the phone, from walking into the networking event, from following up with the prospect who seemed &quot;out of their league.&quot;
            </p>

            <h2 className="font-heading text-4xl mt-12 mb-6">The 900% Territory Elevation</h2>
            <p>
              In one corporate role, I elevated my territory by <strong>900% in less than 90 days.</strong> While in direct sales, I built a team of 200 within 12 months.
            </p>
            <p>
              Those results didn&apos;t come from a proprietary sales system. They came from a mindset shift. From choosing <strong>Courage Over Comfort</strong> in every high-stakes moment.
            </p>

            <h2 className="font-heading text-4xl mt-12 mb-6">Why I Coach Women Who Sell</h2>
            <p>
              Over my 10+ years of coaching (since 2014), I&apos;ve noticed a pattern: Women who sell are brilliant, strategic, and capable. But they&apos;re often tethered to comfort zones that don&apos;t serve them.
            </p>
            <p>
              They procrastinate on prospecting. They avoid networking events. They let fear of rejection dictate their pipeline. And they wonder why they&apos;re not hitting their goals.
            </p>
            <p>
              <strong>I help women who sell untether from those comfort zones so they can serve more and sell more.</strong>
            </p>
            <p>
              Because here&apos;s what I know: Your prospects need what you sell. But they want you to <em>connect</em> with them, not sell them. And you can&apos;t connect with prospects if you&apos;re avoiding them.
            </p>

            <h2 className="font-heading text-4xl mt-12 mb-6">The Untethered Seller Philosophy</h2>
            <p>
              I don&apos;t start with strategy. I start with <strong>self-image.</strong>
            </p>
            <p>
              Because when your identity shifts, your behavior follows. When you see yourself as an <em>untethered seller</em>—someone who operates from courage rather than comfort—everything changes.
            </p>
            <p>
              You stop waiting for confidence. You start showing up anyway. You stop conflating relief with alignment. You start choosing courage.
            </p>
            <p>
              And that&apos;s when the sales come.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Stats & Social Proof */}
      <section className="section-padding bg-white">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading mb-12">By The Numbers</h2>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div>
              <dd className="text-3xl sm:text-5xl font-heading font-bold mb-2">10+</dd>
              <dt className="text-sm text-gray-600">Years coaching women who sell (since 2014)</dt>
            </div>
            <div>
              <dd className="text-3xl sm:text-5xl font-heading font-bold mb-2">7,415</dd>
              <dt className="text-sm text-gray-600">Women follow Shannon&apos;s work on Facebook</dt>
            </div>
            <div>
              <dd className="text-3xl sm:text-5xl font-heading font-bold mb-2">92%</dd>
              <dt className="text-sm text-gray-600">Recommendation rate (15 client reviews)</dt>
            </div>
            <div>
              <dd className="text-3xl sm:text-5xl font-heading font-bold mb-2">408+</dd>
              <dt className="text-sm text-gray-600">Instagram posts sharing sales courage insights</dt>
            </div>
          </dl>
        </div>
      </section>

      {/* Personal Photos Grid */}
      <section className="section-padding bg-[#f9f9f9]">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-center mb-12">Moments That Matter</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            <div className="relative h-40 sm:h-52 md:h-64 lg:h-80">
              <Image
                src="/assets/images/about/insta_022.jpg"
                alt="Shannon Muruli speaking at event"
                fill
                className="object-cover object-top grayscale rounded-2xl shadow-2xl"
              />
            </div>
            <div className="relative h-40 sm:h-52 md:h-64 lg:h-80">
              <Image
                src="/assets/images/about/insta_082.jpg"
                alt="Shannon Muruli coaching session"
                fill
                className="object-cover object-top grayscale rounded-2xl shadow-2xl"
              />
            </div>
            <div className="relative h-40 sm:h-52 md:h-64 lg:h-80 col-span-2 md:col-span-1">
              <Image
                src="/assets/images/about/insta_099.jpg"
                alt="Shannon Muruli portrait"
                fill
                className="object-cover object-top grayscale rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#161317] text-white text-center">
        <div className="container-narrow">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-6 text-white">
            Ready To Become An Untethered Seller?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-200">
            Let&apos;s work together to untether you from your comfort zone so you can serve more and sell more.
          </p>
          <Button href="/work-with-me" variant="primary">
            Explore Coaching Options
          </Button>
        </div>
      </section>
    </>
  );
}
