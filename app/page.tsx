import Image from "next/image";
import Button from "./components/Button";
import FadeIn from "./components/FadeIn";
import Counter from "./components/Counter";
import HeroVideoModal from "./components/HeroVideoModal";

export default function Home() {
  return (
    <>
      {/* Section 1: Hero with Video Background */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-background-0.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center text-white">
          <FadeIn delay={0.2} direction="down">
            <p className="text-[13px] md:text-[15px] uppercase tracking-[0.3em] mb-6 font-bold text-[#FF6B35]">
              For Women Who Sell
            </p>
          </FadeIn>
          <FadeIn delay={0.4} direction="up">
            <h1 className="text-[48px] md:text-[72px] lg:text-[90px] font-extrabold mb-8 leading-[1.1] tracking-tight">
              Become An<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">
                Untethered
              </span> Seller
            </h1>
          </FadeIn>
          <FadeIn delay={0.6} direction="up">
            <p className="text-[20px] md:text-[24px] mb-12 max-w-3xl mx-auto font-light leading-[1.6] text-gray-100">
              I don't start with strategy. I start with <em className="font-semibold not-italic text-white">self-image</em>. Because the women who cultivate the courage to untether from their comfort zones will serve more and sell more.
            </p>
          </FadeIn>
          <FadeIn delay={0.8} direction="up">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button href="/work-with-me" variant="primary" className="!px-10 !py-5 !text-[15px] !tracking-[0.15em]">
                  Start Your Transformation
                </Button>
                <Button href="#newsletter" variant="secondary" className="!bg-white !text-[#161317] hover:!bg-gray-100 !px-10 !py-5 !text-[15px] !tracking-[0.15em]">
                  Get Weekly Courage
                </Button>
              </div>
              <HeroVideoModal />
            </div>
          </FadeIn>
          <FadeIn delay={1} direction="up">
            <p className="mt-12 text-[14px] font-medium tracking-wide uppercase opacity-80">
              Courage Coach & Self-Image Strategist
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 1.2.3: Lead Magnet (Marie Forleo Style) */}
      <section className="py-8 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            {/* Left: Headline & CTA */}
            <div className="max-w-2xl">
              <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-normal mb-3 leading-[1.15] tracking-tight text-gray-900">
                Learn How to Get <em className="italic font-serif">Untethered</em><br />and Sell More
              </h2>
              <p className="text-[16px] md:text-[18px] mb-6 leading-[1.5] text-gray-700">
                Listen to this <span className="font-bold">FREE audio</span> from Shannon and learn the <span className="font-bold">3 steps that&rsquo;ll change your sales life, fast</span>.
              </p>
              {/*<form className="flex flex-col sm:flex-row gap-2 mb-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-2.5 border-2 border-gray-300 rounded-full text-[14px] focus:outline-none focus:border-[#FF6B35] transition-colors"
                  required
                />
                <Button type="submit" variant="primary" className="!px-6 !py-2.5 !text-[12px] !tracking-[0.12em] whitespace-nowrap">
                  GET IT FREE
                </Button>
              </form>
              <p className="text-[10px] text-gray-500 text-center sm:text-left">
                No spam. Only courage. Unsubscribe anytime.
              </p>*/}
            </div>

            {/* Right: Lead Magnet Image with Shannon in Phone */}
            <div className="relative">
              <div className="relative h-[250px] lg:h-[350px]">
                <Image
                  src="/images/lead-magnet-mockup copy - white  with Shannon.png"
                  alt="Free Untethered Seller Audio Training"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1.5: Visual Moment */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d3a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/lifestyle-chanel.jpg"
                alt="Shannon Muruli"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="text-white">
              <blockquote className="text-[32px] md:text-[42px] lg:text-[52px] font-bold mb-8 leading-[1.15] tracking-tight">
                "You will close deals in rooms that once intimidated you."
              </blockquote>
              <p className="text-[19px] md:text-[22px] text-gray-300 font-light leading-[1.6]">
                Borrow this belief until it becomes yours. The courage to untether from your comfort zone is already within you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1.6: Marie Forleo Hero */}
      <section className="relative h-screen flex items-center bg-[#dfd2c4] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left: Text Content */}
            <div className="max-w-xl">
              <FadeIn delay={0.2}>
                <p className="text-[11px] md:text-[12px] uppercase tracking-[0.3em] mb-8 font-bold text-gray-700">
                  HEYA!
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <h1 className="text-[72px] md:text-[90px] lg:text-[110px] font-normal mb-8 leading-[0.95] tracking-tight text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                  I&apos;M<br />
                  SHANNON.
                </h1>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p className="text-[18px] md:text-[20px] mb-10 leading-[1.7] text-gray-800 font-light">
                  My hunch is someone you trust mentioned my name, or you stumbled upon one of my videos, quotes or articles online. Whatever path you took, I&apos;m really glad you&apos;re here. This site is full of incredible resources and ideas that can help you change your life (not kidding!). Here&apos;s a quick lay of the land so you can find what you&apos;re looking for and we can start something beautiful together.
                </p>
              </FadeIn>
              <FadeIn delay={0.8}>
                <Button
                  href="/about"
                  variant="primary"
                  className="!px-10 !py-4 !text-[13px] !tracking-[0.15em] !bg-black !text-white hover:!bg-gray-800 !rounded-full !font-semibold"
                >
                  Learn More
                </Button>
              </FadeIn>
            </div>

            {/* Right: Full Body Image */}
            <FadeIn delay={0.4} direction="right" className="h-full">
              <div className="relative h-full flex items-end justify-center lg:justify-end">
                <div className="relative w-full h-full max-w-[600px]">
                  <Image
                    src="/images/hero/shannon-fullbody-2.png"
                    alt="Shannon Muruli - Courage Coach"
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 1.2: Industry Strip (Logo Bar Equivalent) */}
      <section className="py-10 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-6">
            Trusted By Women In
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Real Estate */}
            <div className="flex items-center gap-3 group">
              <svg className="w-6 h-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-bold tracking-widest text-gray-600 group-hover:text-[#FF6B35] transition-colors">REAL ESTATE</span>
            </div>
            
            {/* Pharmaceuticals */}
            <div className="flex items-center gap-3 group">
              <svg className="w-6 h-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-sm font-bold tracking-widest text-gray-600 group-hover:text-[#FF6B35] transition-colors">PHARMA</span>
            </div>

            {/* Tech Sales */}
            <div className="flex items-center gap-3 group">
              <svg className="w-6 h-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-bold tracking-widest text-gray-600 group-hover:text-[#FF6B35] transition-colors">TECH SALES</span>
            </div>

            {/* Financial Services */}
            <div className="flex items-center gap-3 group">
              <svg className="w-6 h-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-bold tracking-widest text-gray-600 group-hover:text-[#FF6B35] transition-colors">FINANCE</span>
            </div>

            {/* Direct Sales */}
            <div className="flex items-center gap-3 group">
              <svg className="w-6 h-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-bold tracking-widest text-gray-600 group-hover:text-[#FF6B35] transition-colors">DIRECT SALES</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured / Social Proof */}
      <section className="py-16 md:py-20 bg-[#fafafa] border-y border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-center text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-12 font-bold">
            Trusted By Women In Sales Worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 mb-16">
            <FadeIn delay={0.1}>
              <div className="text-center">
                <div className="text-[40px] font-bold text-[#FF6B35] leading-none mb-2">
                  <Counter value={7415} suffix="+" />
                </div>
                <div className="text-[11px] text-gray-600 uppercase tracking-[0.15em] font-semibold">Followers</div>
              </div>
            </FadeIn>
            <div className="w-px h-12 bg-gray-300 hidden md:block"></div>
            <FadeIn delay={0.2}>
              <div className="text-center">
                <div className="text-[40px] font-bold text-[#FF6B35] leading-none mb-2">
                  <Counter value={10} suffix="+" />
                </div>
                <div className="text-[11px] text-gray-600 uppercase tracking-[0.15em] font-semibold">Years Coaching</div>
              </div>
            </FadeIn>
            <div className="w-px h-12 bg-gray-300 hidden md:block"></div>
            <FadeIn delay={0.3}>
              <div className="text-center">
                <div className="text-[40px] font-bold text-[#FF6B35] leading-none mb-2">
                  <Counter value={92} suffix="%" />
                </div>
                <div className="text-[11px] text-gray-600 uppercase tracking-[0.15em] font-semibold">5-Star Rating</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 3: Problem/Agitation */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <h2 className="text-[38px] md:text-[48px] font-bold text-center mb-5 leading-[1.2] tracking-tight">
              Are You Tethered To Your Comfort Zone?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-[19px] text-gray-600 mb-16 max-w-2xl mx-auto leading-[1.6]">
              Most women who sell aren't struggling because they lack skill. They're tethered to comfort.
            </p>
          </FadeIn>

          {/* Grid with cards and photo */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="text-[#FF6B35] text-[32px] font-bold mb-5 leading-none">01</div>
                <h3 className="text-[19px] font-bold mb-4 leading-[1.3]">Fear Before It Even Happens</h3>
                <p className="text-[15px] text-gray-700 leading-[1.7]">
                  You feel the rejection before anyone says no. The doom arrives before the sales interaction. And sometimes? You cancel. Even if you paid to be there.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="text-[#FF6B35] text-[32px] font-bold mb-5 leading-none">02</div>
                <h3 className="text-[19px] font-bold mb-4 leading-[1.3]">Your Past Self-Image Is Following You</h3>
                <p className="text-[15px] text-gray-700 leading-[1.7]">
                  Your role changed. But your self-image didn't. You sell now—but sparingly. Because a part of you still sees sales as something you're not.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="bg-white p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="text-[#FF6B35] text-[32px] font-bold mb-5 leading-none">03</div>
                <h3 className="text-[19px] font-bold mb-4 leading-[1.3]">You're Confusing Relief With Alignment</h3>
                <p className="text-[15px] text-gray-700 leading-[1.7]">
                  Comfort feels like relief. Courage feels like resistance. So you mistake relief for alignment—and stay tethered to what feels safe.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Photo Grid with Quote Graphics */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="/images/borrow-belief.jpg"
                alt="You will close deals in rooms that once intimidated you"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="/images/quote-progress.jpg"
                alt="Progress doesn't always feel successful"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <p className="text-center text-[24px] md:text-[28px] italic text-gray-800 font-light leading-[1.4]">
            You're not a shy seller.<br />
            <span className="font-semibold not-italic">You're in environments that activate your shyness.</span>
          </p>
        </div>
      </section>

      {/* Section 4: Solution/Philosophy */}
      <section className="py-20 md:py-28 bg-[#fafafa]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-[38px] md:text-[52px] font-bold mb-5 leading-[1.2] tracking-tight">
              The Untethered Seller Framework
            </h2>
            <p className="text-[19px] md:text-[22px] max-w-3xl mx-auto text-gray-600 font-normal leading-[1.6]">
              What if you stopped shying away from your calling? What if you chose <span className="text-[#FF6B35] font-bold">courage over comfort</span>—and became untethered?
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="relative h-[500px] lg:h-[600px]">
                <Image
                  src="/images/group-coaching.jpg"
                  alt="Shannon Muruli coaching session"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
            <div className="space-y-7 order-1 lg:order-2">
              <div className="border-l-[3px] border-[#FF6B35] pl-6 py-1">
                <h3 className="text-[19px] font-bold mb-2 text-gray-900 leading-[1.3]">Self-Image First</h3>
                <p className="text-[15px] text-gray-700 leading-[1.7]">
                  I don't start with strategy. I start with self-image. Because when your identity shifts, your behavior follows.
                </p>
              </div>
              <div className="border-l-[3px] border-[#FF6B35] pl-6 py-1">
                <h3 className="text-[19px] font-bold mb-2 text-gray-900 leading-[1.3]">Presence Over Performance</h3>
                <p className="text-[15px] text-gray-700 leading-[1.7]">
                  People buy based on how they FEEL in your presence. Not your pitch. Not your script. Your presence.
                </p>
              </div>
              <div className="border-l-[3px] border-[#FF6B35] pl-6 py-1">
                <h3 className="text-[19px] font-bold mb-2 text-gray-900 leading-[1.3]">Momentum Over Mindset</h3>
                <p className="text-[15px] text-gray-700 leading-[1.7]">
                  The doom never survived momentum. Waiting to feel confident keeps you waiting. Showing up anyway shifts everything.
                </p>
              </div>
              <div className="border-l-[3px] border-[#FF6B35] pl-6 py-1">
                <h3 className="text-[19px] font-bold mb-2 text-gray-900 leading-[1.3]">Mathematical, Not Emotional</h3>
                <p className="text-[15px] text-gray-700 leading-[1.7]">
                  Low pipeline makes every "no" feel heavier than it is. It's often not emotional—it's mathematical. You just haven't met enough people.
                </p>
              </div>
              <div className="border-l-[3px] border-[#FF6B35] pl-6 py-1">
                <h3 className="text-[19px] font-bold mb-2 text-gray-900 leading-[1.3]">Internal Authority</h3>
                <p className="text-[15px] text-gray-700 leading-[1.7]">
                  Untethered sellers operate from confidence rather than fear. They don't wait for permission. They choose courage.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Video/Content Block */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d3a] py-16 px-8 md:px-16 rounded-3xl shadow-2xl max-w-6xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35] rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7931E] rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#FF6B35] font-bold mb-6">Featured Content</p>
                <blockquote className="text-[28px] md:text-[36px] font-bold italic text-white mb-6 leading-[1.3]">
                  "I don't start with strategy.<br />I start with self-image."
                </blockquote>
                <p className="text-[17px] text-gray-300 mb-10 font-light leading-[1.7]">
                  Watch how transforming your self-image creates lasting change in your sales results. This is where the real work begins.
                </p>
                <Button href="/work-with-me" variant="primary" className="!px-10 !py-4 !text-[13px]">
                  Discover Self-Image That Sells
                </Button>
              </div>
              <div className="relative h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 flex items-center justify-center group cursor-pointer">
                <Image
                  src="/images/group-coaching.jpg"
                  alt="Shannon Muruli coaching"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-[#FF6B35] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4.5: Quote Moment */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl group lg:col-span-2">
              <Image
                src="/images/no-lost-value.jpg"
                alt="Neither you nor what you sell lost value because a sale didn't close"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="/images/stay-calm.jpg"
                alt="Stay Calm"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: About/Credibility */}
      <section className="section-padding bg-gradient-to-br from-[#f8f9fa] to-white">
        <div className="container">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <div className="relative h-[600px]">
                <Image
                  src="/images/speaking-professional.jpg"
                  alt="Shannon Muruli speaking professionally"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-bold mb-4">My Story</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                From Parking Lots<br />To Regional Manager
              </h2>
              <div className="space-y-4 text-gray-700 mb-8 leading-relaxed">
                <p className="text-lg">I started out selling pre-paid legal services in parking lots.</p>
                <p>After meeting a prospect in a Walmart parking lot, following up, and taking them through my sales process, I found myself a week later delivering an award-worthy sales presentation to about a dozen of their construction workers—<em>inside of an empty pool.</em></p>
                <p>In less than a year, I transitioned from an individual contributor role to Regional Sales Manager. I inherited an underperforming region, initially ranked last among five, and elevated it to the <strong className="text-[#FF6B35]">#1 position</strong>.</p>
                <p>How? I taught them how to do one thing better than any other region: <strong>PROSPECT.</strong></p>
                <p>I've excelled in various sales roles by choosing courage over comfort. In one corporate role, I elevated my territory by <strong className="text-[#FF6B35]">900%</strong> in less than 90 days. While in direct sales, I built a team of 200 within 12 months.</p>
                <p className="text-xl font-semibold text-gray-900 pt-4">Now, I help women who sell untether from their comfort zones so they can serve more and sell more.</p>
              </div>
              <Button href="/about" variant="secondary">
                Read My Full Story →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Social Proof/Testimonial */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-bold mb-4">Success Stories</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Real Results From<br />Real Women
            </h2>
          </div>

          {/* Featured Testimonial with Photo */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 max-w-6xl mx-auto">
            <div className="relative h-[500px] lg:h-[600px] order-2 lg:order-1">
              <Image
                src="/images/lifestyle-outdoor.jpg"
                alt="Shannon Muruli lifestyle"
                fill
                className="object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-12 rounded-2xl shadow-lg order-1 lg:order-2">
              <div className="text-[#FF6B35] text-6xl mb-6">"</div>
              <blockquote className="text-2xl md:text-3xl font-light italic text-gray-800 mb-8 leading-relaxed">
                Do whatever it takes to join Shannon's one-on-one Courage Over Comfort Coaching
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  WA
                </div>
                <div>
                  <div className="font-bold text-gray-900">Winsome Alexander</div>
                  <div className="text-sm text-gray-600">Furniture Sales → Remote Healthcare Sales</div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card text-center hover:shadow-2xl transition-all">
              <div className="text-6xl font-bold text-[#FF6B35] mb-3">300%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Sales Growth</div>
              <div className="text-sm text-gray-600">In less than 6 months</div>
            </div>
            <div className="card text-center hover:shadow-2xl transition-all">
              <div className="text-6xl font-bold text-[#FF6B35] mb-3">425%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Territory Expansion</div>
              <div className="text-sm text-gray-600">In under 6 months</div>
            </div>
            <div className="card text-center hover:shadow-2xl transition-all">
              <div className="text-6xl font-bold text-[#FF6B35] mb-3">125%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Commission Increase</div>
              <div className="text-sm text-gray-600">Career shift success</div>
            </div>
          </div>

          <div className="text-center">
            <Button href="/client-results" variant="secondary">
              See More Success Stories →
            </Button>
          </div>
        </div>
      </section>

      {/* Section 7: Services Teaser */}
      <section className="section-padding bg-[#f8f9fa]">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-bold mb-4">Ways to Work Together</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Whether you need foundational training, personalized coaching, or community connection—there's a path for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src="/images/selfie-professional.jpg"
                  alt="Self-Image That Sells"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute top-6 right-6 text-4xl font-bold text-white/40 group-hover:text-[#FF6B35] transition-colors">01</div>
              </div>
              <div className="bg-white p-8">
                <div className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-bold mb-3">Foundational</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#FF6B35] transition-colors">Self-Image That Sells</h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-[15px]">
                  My most foundational work for women who sell. We start with self-image—not strategy. Because when you see yourself differently, you show up differently.
                </p>
                <a href="/work-with-me" className="inline-flex items-center text-[#FF6B35] font-semibold hover:text-[#F7931E] transition-colors group">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src="/images/stay-calm.jpg"
                  alt="Courage Over Comfort Coaching"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute top-6 right-6 text-4xl font-bold text-white/40 group-hover:text-[#FF6B35] transition-colors">02</div>
              </div>
              <div className="bg-white p-8">
                <div className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-bold mb-3">1-on-1 Coaching</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#FF6B35] transition-colors">Courage Over Comfort Coaching</h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-[15px]">
                  One-on-one coaching for women who sell. We disrupt narratives that keep you tethered to your comfort zone and cultivate the courage to serve more and sell more.
                </p>
                <a href="/work-with-me" className="inline-flex items-center text-[#FF6B35] font-semibold hover:text-[#F7931E] transition-colors group">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src="/images/event-soiree.jpg"
                  alt="The Sell More Soirée"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute top-6 right-6 text-4xl font-bold text-white/40 group-hover:text-[#FF6B35] transition-colors">03</div>
              </div>
              <div className="bg-white p-8">
                <div className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-bold mb-3">Live Event</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#FF6B35] transition-colors">The Sell More Soirée</h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-[15px]">
                  An event for women who sell who are ready to untether from comfort and step into their full sales potential. Connection. Courage. Community.
                </p>
                <a href="/work-with-me" className="inline-flex items-center text-[#FF6B35] font-semibold hover:text-[#F7931E] transition-colors group">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button href="/work-with-me" variant="primary">Explore All Services</Button>
          </div>
        </div>
      </section>

      {/* Section 8: Instagram Feed */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#FF6B35] font-bold mb-4">Follow Along</p>
            <h2 className="text-[38px] md:text-[48px] font-bold mb-5 leading-[1.2]">
              Latest from Instagram
            </h2>
            <a
              href="https://www.instagram.com/shannonmuruli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-gray-600 hover:text-[#FF6B35] transition-colors font-medium"
            >
              @shannonmuruli
            </a>
          </div>

          {/* 2-row grid with different layouts */}
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <Image
                  src="/images/quote-1.jpg"
                  alt="You will close deals in rooms that once intimidated you"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <Image
                  src="/images/lifestyle-chanel.jpg"
                  alt="Shannon Muruli lifestyle"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <Image
                  src="/images/no-lost-value.jpg"
                  alt="Neither you nor what you sell lost value"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <Image
                  src="/images/networking-event.jpg"
                  alt="Networking event"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <Image
                  src="/images/quote-2.jpg"
                  alt="Out Do The Old You"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <Image
                  src="/images/story-card.jpg"
                  alt="Personal story"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <Image
                  src="/images/quote-dream.jpg"
                  alt="I, too, Have A Dream"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <Image
                  src="/images/quote-progress.jpg"
                  alt="Progress doesn't always feel successful"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button href="https://www.instagram.com/shannonmuruli/" variant="secondary" className="!px-10">
              Follow on Instagram
            </Button>
          </div>
        </div>
      </section>

      {/* Section 8.5: Quote Breakout */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/quote-stretch.jpg"
                alt="What stretched you this year also strengthened you"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/quote-version.jpg"
                alt="What version of yourself are you no longer willing to shrink back into"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Newsletter/Lead Magnet */}
      <section id="newsletter" className="section-padding bg-gradient-to-br from-white to-[#f8f9fa] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#FF6B35] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#F7931E] rounded-full blur-3xl"></div>
        </div>
        <div className="container-narrow relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-center mb-16">
            <div className="lg:col-span-2">
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/selfie-professional.jpg"
                  alt="Shannon Muruli"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-3 bg-white p-12 md:p-16 rounded-3xl shadow-2xl text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-bold mb-4">Weekly Inspiration</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get The Untethered Weekly
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                Weekly sales courage delivered to your inbox. For women who sell who are ready to choose courage over comfort.
              </p>
              <form className="max-w-lg mx-auto mb-6">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-5 mb-4 border-2 border-gray-300 rounded-full text-base focus:outline-none focus:border-[#FF6B35] transition-colors"
                  required
                />
                <input
                  type="text"
                  placeholder="First Name (optional)"
                  className="w-full px-6 py-5 mb-6 border-2 border-gray-300 rounded-full text-base focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
                <Button type="submit" variant="primary" className="w-full !py-5 !text-base">
                  Get Weekly Courage
                </Button>
              </form>
              <div className="flex items-center justify-center gap-8 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No spam
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Unsubscribe anytime
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  7,415+ subscribers
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Final CTA */}
      <section className="section-padding bg-gradient-to-br from-[#1a1a2e] to-[#2d2d3a] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF6B35] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F7931E] rounded-full blur-3xl"></div>
        </div>
        <div className="container-narrow relative z-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-bold mb-6">Ready to Transform?</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
            Your Next Sales Breakthrough<br />
            Starts With <span className="text-[#FF6B35]">Choosing Courage</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Become an untethered seller who operates from internal authority. One who doesn't wait for confidence—but shows up anyway.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button href="/work-with-me" variant="primary" className="!px-12 !py-5">
              Become An Untethered Seller
            </Button>
            <Button href="#newsletter" variant="secondary">
              Get The Untethered Weekly
            </Button>
          </div>
          <p className="text-base italic text-gray-400 font-light">✨ sell yourself on that</p>
        </div>
      </section>
    </>
  );
}
