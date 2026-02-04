import Button from "../components/Button";

export const metadata = {
  title: "Merch | Shannon Muruli",
  description: "Shop Courage Over Comfort merch and tools designed for women who sell.",
};

const merchItems = [
  {
    name: "Courage Over Comfort Hoodie",
    description: "A soft, heavyweight hoodie for early mornings, late calls, and bold follow-ups.",
    price: "$68",
    category: "Apparel",
    badge: "Best Seller",
  },
  {
    name: "COC Logo T-Shirt",
    description: "Breathable, everyday tee with a clean Courage Over Comfort mark.",
    price: "$34",
    category: "Apparel",
  },
  {
    name: "Sales Courage Journal",
    description: "Guided prompts to reframe rejection and track daily courageous actions.",
    price: "$28",
    category: "Journals",
  },
  {
    name: "Prospecting Planner",
    description: "Weekly planner built to keep your pipeline brave and consistent.",
    price: "$32",
    category: "Tools",
  },
  {
    name: "Fearless Seller Tote Bag",
    description: "Carry your notes, scripts, and courage in a durable canvas tote.",
    price: "$24",
    category: "Accessories",
  },
  {
    name: "Daily Courage Affirmation Cards",
    description: "A daily deck of bold reminders to choose courage over comfort.",
    price: "$22",
    category: "Tools",
  },
];

const orderLink = (itemName: string) =>
  `mailto:hello@shannonmuruli.com?subject=${encodeURIComponent(`Merch Order - ${itemName}`)}`;

export default function MerchPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-[#161317] text-white">
        <div className="container-narrow text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#FF6B35] mb-4">Merch</p>
          <h1 className="text-5xl md:text-6xl font-heading mb-6">
            Courage You Can Wear
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            Shop the Courage Over Comfort collection designed for women who sell. Apparel, tools, and daily reminders to keep you untethered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#shop" variant="primary" className="!px-10">
              Shop The Collection
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="!border-white !text-white hover:!bg-white hover:!text-[#161317]"
            >
              Bulk Orders
            </Button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="shop" className="section-padding bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-heading mb-3">Featured Merch</h2>
              <p className="text-gray-600 max-w-2xl">
                Every item is built around one idea: choosing courage over comfort in the moments that matter most.
              </p>
            </div>
            <p className="text-sm text-gray-500">Pre-orders ship in 2-3 weeks.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {merchItems.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-gray-200 bg-[#fafafa] p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider text-gray-500">
                    {item.category}
                  </span>
                  {item.badge ? (
                    <span className="text-xs bg-[#FF6B35] text-white px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="text-2xl font-heading mb-3">{item.name}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <div className="mt-auto">
                  <div className="text-lg font-semibold mb-4">{item.price}</div>
                  <Button
                    href={orderLink(item.name)}
                    variant="secondary"
                    className="w-full !py-3 !text-xs"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Questions about sizing or gifting? Email hello@shannonmuruli.com and we will help you place your order.
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="section-padding bg-[#f9f9f9]">
        <div className="container-narrow">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-heading mb-3">Designed For Courage</h3>
              <p className="text-gray-600">
                Pieces you can wear to networking events, coaching sessions, and everyday sales moments.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-heading mb-3">Small Batch Runs</h3>
              <p className="text-gray-600">
                Limited drops to keep each item special. Order early to secure your size.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-heading mb-3">Team Gifting</h3>
              <p className="text-gray-600">
                Want to outfit your sales team? Reach out for bulk pricing and gifting bundles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white text-center">
        <div className="container-narrow">
          <h2 className="text-4xl md:text-5xl font-heading mb-6">
            Build Your Courage Kit
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Pair your favorite merch with coaching tools for a full Courage Over Comfort experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/work-with-me" variant="secondary">
              Explore Coaching
            </Button>
            <Button href="/contact" variant="outline">
              Ask About Merch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
