import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";

export const metadata = {
  title: "About Us | FixItNow",
  description: "Learn more about FixItNow, the trusted home maintenance platform.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight mb-6">
              Trusted By Thousands <br className="hidden md:block" />
              Of Homeowners.
            </h1>
          </div>
          <div className="flex-1">
            <p className="text-text/70 text-lg leading-relaxed max-w-2xl">
              For Years, We&apos;ve Been Helping Families Take Care Of Their Homes By
              Providing Reliable, Professional Services That Make Life Easier And More
              Convenient. Our Mission Is To Simplify Home Maintenance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-secondary/10 border border-secondary/20 rounded-3xl p-8 flex flex-col aspect-square md:aspect-auto md:h-80">
            <h2 className="text-5xl font-bold text-secondary mb-2">15k+</h2>
            <p className="text-text/80 text-lg font-medium">Homes Served</p>
            <div className="flex-1 flex items-center">
              <p className="text-text/80 font-bold">Across Multiple Cities And Neighborhoods</p>
            </div>
          </div>


          <div className="bg-[#97c0d3]/10 border border-[#97c0d3]/20 rounded-3xl p-8 flex flex-col aspect-square md:aspect-auto md:h-80">
            <h2 className="text-5xl font-bold text-[#97c0d3] mb-2">95%</h2>
            <p className="text-text/80 text-lg font-medium">On-Time Service</p>
            <div className="flex-1 flex items-center">
              <p className="text-text/80 font-bold">We Value Your Time And Deliver As Promised</p>
            </div>
          </div>


          <div className="relative rounded-3xl aspect-square md:aspect-auto md:h-80 border border-[#eab308]/20 bg-[#eab308]/10 mt-12 md:mt-0">
            <div className="absolute -left-8 -right-8 -top-16 bottom-0 z-10 pointer-events-none">
              <Image
                src="/NicePng_clash-of-clans-png_640054.png"
                alt="Clash of Clans Builder 1"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>


          <div className="relative rounded-3xl aspect-square md:aspect-auto md:h-80 border border-[#3b82f6]/20 bg-[#3b82f6]/10 mt-12 md:mt-0">
            <div className="absolute -left-8 -right-8 -top-16 bottom-0 z-10 pointer-events-none">
              <Image
                src="/NicePng_coc-troops-png_3623954.png"
                alt="Clash of Clans Builder 2"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>


          <div className="bg-[#97c0d3]/10 border border-[#97c0d3]/20 rounded-3xl p-8 flex flex-col aspect-square md:aspect-auto md:h-80">
            <h2 className="text-5xl font-bold text-[#97c0d3] mb-2">500+</h2>
            <p className="text-text/80 text-lg font-medium">Certified Professionals</p>
            <div className="flex-1 flex items-center">
              <p className="text-text/80 font-bold">Skilled, Trained, And Background-Checked</p>
            </div>
          </div>


          <div className="bg-[#97c0d3]/10 border border-[#97c0d3]/20 rounded-3xl p-8 flex flex-col aspect-square md:aspect-auto md:h-80">
            <h2 className="text-5xl font-bold text-[#97c0d3] mb-2">4.9/5</h2>
            <p className="text-text/80 text-lg font-medium">Customer Rating</p>
            <div className="flex-1 flex items-center">
              <p className="text-text/80 font-bold">Based On Thousands Of Verified Reviews</p>
            </div>
          </div>
        </div>
      </section>


      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-3xl h-[500px] border border-[#8b5cf6]/20 bg-[#8b5cf6]/10 mt-16 md:mt-0">
            <div className="absolute -left-12 -right-12 -top-20 bottom-0 z-10 pointer-events-none">
              <Image
                src="/pngaaa.com-4146076.png"
                alt="Clash of Clans Builder 3"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-3xl p-10 h-full flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
              The Reasons People Count On Us
            </h2>
            <p className="text-text/70 mb-8 text-lg">
              We&apos;re More Than Just A Delivery Service—We&apos;re Your Daily Companion
              For Groceries, Meals, Medicines, And Packages.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Verified & Skilled Professionals",
                "Transparent Pricing, No Hidden Costs",
                "On-Time Service Guarantee",
                "24/7 Customer Support",
              ].map((reason, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary w-6 h-6 shrink-0" />
                  <span className="text-text/90 font-medium text-lg">{reason}</span>
                </li>
              ))}
            </ul>
            <div>
              <Link
                href="https://arafat-sany.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-text px-8 text-sm font-medium text-background transition-colors hover:bg-secondary hover:text-background"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-text max-w-xl">
            Loved By Thousands Of Happy Homeowners
          </h2>
          <p className="text-text/60 max-w-md pb-2">
            Every day, families rely on us to handle their cleaning, repairs, and
            home maintenance needs with care and professionalism — that&apos;s why
            thousands of homeowners continue to choose and recommend our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">

          <div className="bg-[#1a1a1a]/40 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
            <p className="text-text/80 text-[15px] mb-8 leading-relaxed">
              &quot;Quick, reliable, and professional! I booked an AC repair online and
              within 30 minutes the technician arrived, identified the issue, and fixed
              it right away.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="font-bold text-[#97c0d3] text-lg w-8">
                DK
              </div>
              <div>
                <h4 className="text-text font-bold text-sm">Daniel K.</h4>
                <div className="flex text-secondary text-xs mt-1 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a]/40 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
            <p className="text-text/80 text-[15px] mb-8 leading-relaxed">
              &quot;The cleaning team exceeded my expectations. They arrived on time,
              worked with attention to detail, and left my entire home sparkling
              clean. It honestly feels like I&apos;m living in a brand-new house.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="font-bold text-[#97c0d3] text-lg w-8">
                SM
              </div>
              <div>
                <h4 className="text-text font-bold text-sm">Sarah M.</h4>
                <div className="flex text-secondary text-xs mt-1 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>


          <div className="bg-[#1a1a1a]/40 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
            <p className="text-text/80 text-[15px] mb-8 leading-relaxed">
              &quot;What I appreciate most is the combination of affordable pricing and
              trustworthy professionals. They explained everything clearly, charged
              exactly what was promised.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="font-bold text-[#97c0d3] text-lg w-8">
                PS
              </div>
              <div>
                <h4 className="text-text font-bold text-sm">Priya S.</h4>
                <div className="flex text-secondary text-xs mt-1 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-gradient-to-br from-primary/20 via-background to-secondary/20 border border-primary/20 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">

            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-primary/40 blur-3xl rounded-full" />
            <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-secondary/40 blur-3xl rounded-full" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
              Need Help Today? We&apos;re Just A Click Away.
            </h2>
            <p className="text-text/70 text-lg mb-10">
              Order Now And Experience Delivery The Way It Should Be – Fast, Safe, And Simple.
            </p>
            <Link
              href="/services"
              className="inline-flex h-14 items-center justify-center rounded-full bg-text px-10 text-base font-bold text-background transition-all hover:bg-primary hover:text-background hover:scale-105"
            >
              Book A Service Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
