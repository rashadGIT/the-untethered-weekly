import Button from "../components/Button";

export const metadata = {
  title: "Client Results | Shannon Muruli Coaching",
  description: "Real results from women who sell. See how Courage Over Comfort Coaching transforms sales careers.",
};

export default function ClientResultsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-white text-center">
        <div className="container-narrow pt-2 md:pt-0">
          <h1 className="text-5xl md:text-6xl font-heading mb-6">
            Real Results From Real Women
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Women who choose courage over comfort don't just feel better. They sell more.
          </p>
        </div>
      </section>

      {/* Featured Testimonial: Winsome Alexander */}
      <section className="section-padding bg-[#f9f9f9]">
        <div className="container-narrow">
          <div className="bg-white p-12 shadow-lg">
            <div className="text-xs uppercase tracking-wider text-[#3e3641] mb-4 text-center">Featured Success Story</div>
            <h2 className="text-3xl font-heading text-center mb-8">Winsome Alexander</h2>

            <blockquote className="text-2xl font-heading italic text-center mb-8 text-gray-800">
              "Do whatever it takes to join Shannon's one-on-one Courage Over Comfort Coaching"
            </blockquote>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#f9f9f9] p-6 text-center">
                <div className="text-5xl font-heading font-bold mb-2 text-[#161317]">300%</div>
                <div className="text-sm text-gray-600">Sales Growth</div>
                <div className="text-xs text-gray-500 mt-2">In less than 6 months</div>
              </div>
              <div className="bg-[#f9f9f9] p-6 text-center">
                <div className="text-5xl font-heading font-bold mb-2 text-[#161317]">425%</div>
                <div className="text-sm text-gray-600">Territory Expansion</div>
                <div className="text-xs text-gray-500 mt-2">In under 6 months</div>
              </div>
              <div className="bg-[#f9f9f9] p-6 text-center">
                <div className="text-5xl font-heading font-bold mb-2 text-[#161317]">125%</div>
                <div className="text-sm text-gray-600">Commission Increase</div>
                <div className="text-xs text-gray-500 mt-2">Career shift success</div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h3 className="font-heading text-2xl mb-4">The Challenge</h3>
              <p className="text-gray-700">
                Winsome was transitioning from furniture decor sales to remote healthcare sales—a completely different industry with higher stakes and longer sales cycles. She was struggling with:
              </p>
              <ul className="text-gray-700">
                <li>Fear of rejection in a new, unfamiliar industry</li>
                <li>Imposter syndrome in healthcare sales</li>
                <li>Procrastination on prospecting activities</li>
                <li>Old self-image from previous sales role limiting her potential</li>
              </ul>

              <h3 className="font-heading text-2xl mt-8 mb-4">The Transformation</h3>
              <p className="text-gray-700">
                Through Courage Over Comfort Coaching, Winsome:
              </p>
              <ul className="text-gray-700">
                <li>Shifted her self-image from "furniture seller" to "healthcare sales professional"</li>
                <li>Developed prospecting courage that led to consistent pipeline growth</li>
                <li>Learned to operate from presence rather than performance anxiety</li>
                <li>Built momentum that made the doom feelings disappear</li>
              </ul>

              <h3 className="font-heading text-2xl mt-8 mb-4">The Results</h3>
              <p className="text-gray-700">
                Within 6 months:
              </p>
              <ul className="text-gray-700">
                <li><strong>300% sales growth</strong> compared to her first 6 months</li>
                <li><strong>425% territory and commission expansion</strong></li>
                <li><strong>125% commission increase</strong> overall</li>
                <li>Career transformation from furniture to healthcare sales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Clients Say */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <h2 className="text-4xl font-heading text-center mb-12">Common Transformations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f9f9f9] p-8">
              <h3 className="text-2xl font-heading mb-4">From Procrastination to Action</h3>
              <p className="text-gray-700">
                Women who used to avoid prospecting calls start making them before they "feel ready." The momentum creates confidence, not the other way around.
              </p>
            </div>
            <div className="bg-[#f9f9f9] p-8">
              <h3 className="text-2xl font-heading mb-4">From Fear to Presence</h3>
              <p className="text-gray-700">
                Women who felt anxious in sales conversations shift to focusing on how prospects feel in their presence. Connections replace performances.
              </p>
            </div>
            <div className="bg-[#f9f9f9] p-8">
              <h3 className="text-2xl font-heading mb-4">From Thin Pipeline to Full Pipeline</h3>
              <p className="text-gray-700">
                Women who had mathematical problems (not enough prospects) solve them by cultivating the courage to prospect consistently. Every "no" feels lighter.
              </p>
            </div>
            <div className="bg-[#f9f9f9] p-8">
              <h3 className="text-2xl font-heading mb-4">From Old Identity to Untethered Seller</h3>
              <p className="text-gray-700">
                Women whose past self-image was following them into new roles shed the old identity and step into who they're becoming. Behavior follows identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="section-padding bg-[#f9f9f9]">
        <div className="container text-center">
          <h2 className="text-4xl font-heading mb-12">Why Women Trust Shannon</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-5xl font-heading font-bold mb-2">10+</div>
              <div className="text-sm text-gray-600">Years coaching women who sell (since 2014)</div>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold mb-2">92%</div>
              <div className="text-sm text-gray-600">Recommendation rate from 15 client reviews</div>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold mb-2">7,415</div>
              <div className="text-sm text-gray-600">Women follow Shannon's work on Facebook</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#161317] text-white text-center">
        <div className="container-narrow">
          <h2 className="text-4xl md:text-5xl font-heading mb-6 text-white">
            Ready For Your Own Transformation?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Women who choose courage over comfort don't stay stuck. They sell more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/work-with-me" variant="primary">
              Explore Coaching Options
            </Button>
            <Button href="/contact" variant="ghost">
              Start The Conversation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
