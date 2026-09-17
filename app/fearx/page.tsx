import Image from "next/image";
import Button from "../components/Button";
import FadeIn from "../components/FadeIn";
import HeroVideoModal from "../components/HeroVideoModal";
import FearXApplyForm from "./FearXApplyForm";

export const metadata = {
  title: 'FEARX — Where Women Who Sell Choose Courage Over Comfort | Shannon Muruli',
  description: 'FEARX is a storytelling platform where women who sell step onto the Courage Carpet to share the moment they faced fear, chose courage over comfort, and discovered the impact that decision made in their sales.',
  alternates: { canonical: 'https://shannonmuruli.com/fearx' },
  openGraph: {
    title: 'FEARX — Where Women Who Sell Choose Courage Over Comfort',
    description: 'FEARX is a storytelling platform where women who sell step onto the Courage Carpet to share the moment they faced fear and chose courage over comfort.',
    url: 'https://shannonmuruli.com/fearx',
  },
};

export default function FearXPage() {
  return (
    <>
      {/* ─── Section 1: Hero ─── */}
      <section className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden pt-28 md:pt-20">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="w-full h-full object-cover"
          >
            <source
              src="/assets/videos/fearX/WhatsApp Video 2026-03-07 at 11.51.21.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center text-white">
          <FadeIn delay={0.2} direction="down">
            <p className="text-[12px] md:text-[13px] uppercase tracking-[0.35em] mb-6 font-bold text-[#a08216]">
              Where Women Who Sell Choose Courage Over Comfort
            </p>
          </FadeIn>

          <FadeIn delay={0.35} direction="up">
            <div className="flex justify-center mb-6">
              <Image
                src="/assets/images/fearX/FearX_logo.png"
                alt="FEARX"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.5} direction="up">
            <h1 className="text-[34px] sm:text-[46px] md:text-[68px] lg:text-[84px] font-extrabold mb-5 md:mb-8 leading-[1.1] tracking-tight">
              Fear Isn&apos;t the Problem.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a08216] to-[#c4a030]">
                The Self-Image Fear Creates Is.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.65} direction="up">
            <p className="text-[16px] md:text-[22px] mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-[1.7] text-gray-100">
              FEARX is a storytelling platform where women who sell step onto the Courage Carpet
              to share the moment they faced fear, chose courage over comfort, and discovered the
              impact that decision made in their sales and in the lives of the people they serve.
            </p>
          </FadeIn>

          <FadeIn delay={0.8} direction="up">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="#apply-speaker"
                  variant="primary"
                  className="!px-10 !py-5 !text-[15px] !tracking-[0.15em]"
                >
                  Apply to Speak
                </Button>
                <Button
                  href="#attend"
                  variant="secondary"
                  className="!bg-white !text-[#161317] hover:!bg-gray-100 !px-10 !py-5 !text-[15px] !tracking-[0.15em]"
                >
                  Attend FEARX
                </Button>
              </div>
              <HeroVideoModal videoSrc="/assets/videos/fearX/WhatsApp Video 2026-03-07 at 11.51.29.mp4" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Section 2: Why FEARX Exists ─── */}
      <section className="bg-[#161317] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <FadeIn direction="up">
              <div className="relative h-[400px] sm:h-[500px] md:h-[580px] overflow-hidden rounded-sm">
                <Image
                  src="/assets/images/fearX/8.png"
                  alt="Shannon Muruli hosting FEARX"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn delay={0.2} direction="up">
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#a08216] mb-4">
                  The Origin
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-8 leading-[1.15]">
                  After Nearly Two Decades in Sales&hellip;
                </h2>
                <div className="space-y-5 text-gray-300 text-[17px] leading-[1.8]">
                  <p>
                    Most women in sales don&apos;t struggle because they lack skill.
                  </p>
                  <p>
                    They struggle because they are tethered to a self-image rooted in fear.
                  </p>
                  <ul className="space-y-2 pl-4 border-l-2 border-[#a08216]">
                    <li>Fear of rejection.</li>
                    <li>Fear of asking the wrong question.</li>
                    <li>Fear of being judged.</li>
                    <li>Fear of hearing &ldquo;no.&rdquo;</li>
                    <li>Fear of being seen.</li>
                  </ul>
                  <p>
                    Over time, those fears quietly become part of how a seller sees herself.
                    And once fear becomes part of a seller&apos;s self-image, it begins to shape everything —
                    the questions she asks, the conversations she avoids, the opportunities she never pursues.
                  </p>
                  <p className="text-white text-xl font-heading font-semibold pt-2">
                    But when a woman untethers from that fear-based self-image&hellip;
                    <br />
                    <span className="text-[#a08216]">She stops performing. She starts serving.</span>
                    <br />
                    And everything changes.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Section 3: The Purpose of FEARX ─── */}
      <section className="bg-[#f9f9f9] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <FadeIn direction="up">
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#a08216] mb-4">
                  The Mission
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#161317] mb-8 leading-[1.15]">
                  FEARX Exists to Help Women Who Sell Shift Their Self-Image.
                </h2>
                <div className="space-y-5 text-gray-700 text-[17px] leading-[1.8]">
                  <p>Because the goal isn&apos;t just to help women sell more.</p>
                  <p>
                    The goal is to help women untether from a self-image rooted in fear so they
                    can begin showing up with courage, conviction, and clarity.
                  </p>
                  <p>
                    When a seller changes how she sees herself, she changes how she shows up in
                    every conversation. She stops avoiding the hard questions. She stops shrinking
                    in the presence of authority. She stops trying to be liked.
                  </p>
                  <p>And she starts doing what great sellers do best: <strong>serving people boldly.</strong></p>
                </div>
                <blockquote className="mt-8 text-[20px] md:text-[24px] font-heading italic text-[#a08216] leading-[1.5]">
                  &ldquo;When a seller changes how she sees herself, she changes how she shows up in every conversation.&rdquo;
                </blockquote>
              </div>
            </FadeIn>

            {/* Image */}
            <FadeIn delay={0.2} direction="up">
              <div className="relative h-[400px] sm:h-[500px] md:h-[580px] overflow-hidden rounded-sm">
                <Image
                  src="/assets/images/fearX/3.png"
                  alt="Speaker on the FEARX Courage Carpet"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Section 4: The Courage Carpet ─── */}
      <section className="bg-[#161317]">
        {/* Full-bleed image */}
        <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
          <Image
            src="/assets/images/fearX/WhatsApp Image 2026-03-07 at 10.58.31.jpeg"
            alt="Shannon Muruli standing on the FEARX Courage Carpet"
            fill
            className="object-cover object-top"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#161317]" />
          {/* FEARX watermark */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <Image
              src="/assets/images/fearX/FearX_logo.png"
              alt=""
              width={80}
              height={80}
              className="rounded-full opacity-70"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Text */}
        <div className="max-w-[900px] mx-auto px-6 md:px-12 pt-12 pb-20 md:pb-28 text-center">
          <FadeIn direction="up">
            <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#a08216] mb-4">
              The Courage Carpet
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-8 leading-[1.15]">
              A Symbolic Space.<br />A Transformative Moment.
            </h2>
            <div className="space-y-5 text-gray-300 text-[17px] leading-[1.8] mb-12">
              <p>
                At FEARX, speakers step onto the Courage Carpet — a symbolic space where women
                share the moment they faced fear in a sales conversation, chose courage anyway,
                and discovered the impact that decision made in their sales and in the lives of
                the people they serve.
              </p>
              <p className="font-semibold text-white">Not theory. Not tactics. Truth.</p>
            </div>
            <p className="text-4xl md:text-5xl font-heading italic text-[#a08216] leading-[1.3]">
              &ldquo;Because courage is contagious.&rdquo;
            </p>
            <p className="text-gray-400 mt-6 text-[17px] leading-[1.8] max-w-2xl mx-auto">
              When one woman shares the moment she chose courage, another woman in the audience
              realizes she can too.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Section 5: Who Speaks at FEARX ─── */}
      <section className="bg-[#fafafa] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn direction="up">
            <div className="text-center mb-14">
              <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#a08216] mb-3">
                The Speakers
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#161317] leading-[1.15]">
                Three Categories of Women Who Sell
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: "I",
                title: "Serve to Sell",
                subtitle: "Early Journey",
                description:
                  "Women in the early years of their sales journey discovering the courage to speak up, show up, and serve boldly. These women share the breakthroughs that happen when you face fear head-on for the first time.",
              },
              {
                label: "II",
                title: "Serve to Scale",
                subtitle: "Building Momentum",
                description:
                  "Women who have built momentum in sales and learned how courage expands their reach, results, and impact. Their stories illuminate what becomes possible when fear no longer drives the conversation.",
              },
              {
                label: "III",
                title: "Serve to Soar",
                subtitle: "Elite & Leading",
                description:
                  "Elite sellers and leaders with over a decade of experience who have not only sold successfully, but now lead and elevate others. They share the courage lessons that define a career — not just a quarter.",
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.15} direction="up">
                <div className="bg-white border-t-4 border-[#a08216] shadow-md p-8 h-full">
                  <span className="text-[#a08216] font-heading text-3xl font-bold mb-2 block">
                    {card.label}
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-2">
                    {card.subtitle}
                  </p>
                  <h3 className="text-2xl font-heading font-bold text-[#161317] mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-[1.8] text-[15px]">{card.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} direction="up">
            <p className="text-center mt-12 text-[17px] text-gray-600 italic leading-[1.8]">
              These women don&apos;t just share strategies. They share the moment courage changed everything.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Section 6: Why This Event Matters ─── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <FadeIn direction="up">
            <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#a08216] mb-4 text-center">
              A Moment That Changed Everything
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-heading font-bold text-[#161317] mb-12 text-center leading-[1.2]">
              Sometimes Courage in Sales Looks Like Showing Up One More Time.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} direction="up">
            <div className="prose prose-lg max-w-none text-gray-700 leading-[1.9] space-y-6">
              <p>
                One of the most powerful lessons I ever learned in sales came from serving two
                elderly couples who needed what I offered but were hesitant to move forward.
              </p>
              <p>
                Years ago, I worked in pharmaceutical sales. Part of my role was visiting
                pharmacies and introducing a service designed to help patients reduce the cost
                of their medications. I believed in it deeply — not just because it worked,
                but because it helped people afford medicine they needed to live.
              </p>
              <p>
                There was one pharmacy I had visited nearly ten times. Ten visits. Ten
                conversations. And still, they had never used the service.
              </p>
              <p>
                If you&apos;ve ever sold anything, you know what starts to happen in moments like that.
                You begin telling yourself stories. <em>Maybe they&apos;re not interested. Maybe I&apos;m
                bothering them. Maybe I should stop coming by.</em>
              </p>
              <p>But that day, I showed up again.</p>
              <p>
                While I was standing at the counter, I overheard an elderly couple talking to the
                technician about their prescriptions. Both of them were battling cancer.
              </p>
              <p>
                The technician ran their insurance and quietly told them the price. Their
                medications were going to cost about $1,500 each.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            <blockquote className="my-10 pl-6 border-l-4 border-[#a08216]">
              <p className="text-2xl md:text-3xl font-heading italic text-[#161317] leading-[1.4]">
                &ldquo;They might have to choose between their medication and their mortgage.&rdquo;
              </p>
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <div className="space-y-6 text-gray-700 leading-[1.9]">
              <p>
                In that moment, I had a choice. I could stay quiet. Or I could speak up.
                So I did.
              </p>
              <p>
                I told the technician about the service I had been sharing with her for months
                and asked if she&apos;d be willing to try it for them. She entered the information.
                And suddenly everything changed.
              </p>
              <p>
                One medication dropped from around $1,500 to about $400. The other dropped to
                just under $500. What felt impossible just minutes earlier suddenly became
                manageable.
              </p>
              <p className="text-[19px] text-[#161317] font-semibold leading-[1.7]">
                That moment changed how I saw sales forever. Because selling is not just about
                closing deals. Sometimes courage in sales looks like showing up one more time
                when it would be easier to stop. Sometimes it looks like speaking up when fear
                tells you to stay quiet.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Section 7: Become a FEARX Speaker ─── */}
      <section id="apply-speaker" className="bg-[#161317] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Text + Image */}
            <FadeIn direction="up">
              <div className="text-white">
                <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#a08216] mb-4">
                  Become a FEARX Speaker
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 leading-[1.15]">
                  Your Story Could Be the One That Sets Another Woman Free.
                </h2>
                <div className="space-y-5 text-gray-300 text-[17px] leading-[1.8] mb-8">
                  <p>
                    If you have a story about the moment you faced fear in sales and chose
                    courage anyway&hellip;
                  </p>
                  <p>
                    Your story could be the one that helps another woman untether from the
                    fear holding her back.
                  </p>
                  <p className="text-white font-semibold">
                    Apply to Stand on the Courage Carpet.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.2} direction="up">
              <FearXApplyForm type="speaker" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Section 8: Become a FEARX Panelist ─── */}
      <section id="attend" className="bg-[#f9f9f9] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Form */}
            <FadeIn direction="up">
              <FearXApplyForm type="panelist" />
            </FadeIn>

            {/* Text + Image */}
            <FadeIn delay={0.2} direction="up">
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#a08216] mb-4">
                  Become a FEARX Panelist
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#161317] mb-6 leading-[1.15]">
                  Move the Audience from Inspiration to Insight.
                </h2>
                <div className="space-y-5 text-gray-700 text-[17px] leading-[1.8] mb-8">
                  <p>
                    FEARX Panelists are experienced women who have spent 10+ years selling,
                    leading, and navigating high-stakes environments.
                  </p>
                  <p>Panelists participate in a moderated conversation exploring:</p>
                  <ul className="space-y-2 pl-4 border-l-2 border-[#a08216]">
                    <li>Courage in long-term sales careers</li>
                    <li>Self-image shifts as women grow into leadership</li>
                    <li>Navigating fear at higher levels of responsibility</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
