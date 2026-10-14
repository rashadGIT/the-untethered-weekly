import Image from "next/image";
import FadeIn from "./components/FadeIn";
import StartSellingModal from "./components/StartSellingModal";
// Full previous homepage preserved here; swap the import below to restore it.
// import LegacyHomePage from "./components/LegacyHomePage";

export default function Home() {
  // return <LegacyHomePage />;
  return (
    <>
      {/* Hero: Full-bleed photo + dark text panel, Stacey Boehman-style minimal homepage */}
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Photo */}
        <div className="relative w-full lg:w-[58%] h-[55vh] lg:h-screen order-1">
          <Image
            src="/assets/images/WhatsApp Image 2026-08-10 at 22.40.03.jpeg"
            alt="Shannon Muruli"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "left 15%" }}
          />
          {/* Fade into text panel */}
          <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[#161317]" />
          <div className="lg:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#161317]" />
        </div>

        {/* Text Panel */}
        <div className="relative w-full lg:w-[42%] min-h-[45vh] lg:h-screen bg-[#161317] flex items-center justify-center lg:justify-start px-8 md:px-14 lg:px-10 py-16 lg:py-0 order-2">
          <div className="max-w-lg text-center lg:text-left">
            <FadeIn delay={0.2} direction="down">
              <p className="text-[15px] md:text-[17px] uppercase tracking-[0.3em] mb-6 font-bold text-white/80">
                My Name Is Shannon Muruli
              </p>
            </FadeIn>
            <FadeIn delay={0.4} direction="up">
              <h1
                className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[64px] text-white mb-6 leading-[1.15] tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                I help women<br />
                <span className="inline-block pl-6 md:pl-10">who sell —</span><br />
                <span className="inline-block pl-6 md:pl-10">sell more.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.6} direction="up">
              <p
                className="text-[28px] md:text-[34px] text-[#c4a030] mb-10 leading-[1.2] pl-6 md:pl-10"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                by becoming an untethered seller
              </p>
            </FadeIn>
            <FadeIn delay={0.8} direction="up">
              <StartSellingModal className="inline-flex items-center justify-center font-bold uppercase tracking-[0.2em] transition-all duration-300 border-2 border-[#a08216] text-[#a08216] hover:bg-[#a08216] hover:text-white px-10 py-4 text-[13px] ml-6 md:ml-10">
                Start Selling More
              </StartSellingModal>
            </FadeIn>
          </div>
        </div>
      </section>

    </>
  );
}
