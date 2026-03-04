import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  country: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  source: "google" | "trustpilot" | "direct";
}

const reviews: Review[] = [
  {
    id: "1",
    name: "James Thornton",
    role: "Tech Startup Founder",
    country: "🇬🇧 United Kingdom",
    rating: 5,
    text: "Genuinely the clearest breakdown of UAE free zones I've found anywhere. The cost estimator saved me from choosing the wrong zone — the difference was nearly AED 15,000 per year.",
    date: "February 2025",
    avatar: "JT",
    source: "google",
  },
  {
    id: "2",
    name: "Ananya Krishnan",
    role: "E-commerce Founder",
    country: "🇮🇳 India",
    rating: 5,
    text: "I had three different quotes from PRO services and had no idea which was fair. IncorpUAE helped me pressure-test all of them and I ended up saving significantly. Highly recommend.",
    date: "January 2025",
    avatar: "AK",
    source: "trustpilot",
  },
  {
    id: "3",
    name: "Luca Ferretti",
    role: "Consultant & Freelancer",
    country: "🇮🇹 Italy",
    rating: 5,
    text: "No fluff, no upselling, no hidden agenda. Just honest guidance. I set up my IFZA company in under 4 weeks following their checklist. The relocation guide for Italy was a bonus.",
    date: "March 2025",
    avatar: "LF",
    source: "google",
  },
  {
    id: "4",
    name: "Sarah Al-Mansouri",
    role: "Agency Owner",
    country: "🇦🇪 UAE",
    rating: 5,
    text: "Even as someone already based in Dubai, the mainland vs free zone comparison tools helped me understand my options for expansion. The visa calculator alone is worth bookmarking.",
    date: "December 2024",
    avatar: "SA",
    source: "direct",
  },
  {
    id: "5",
    name: "Dmitri Volkov",
    role: "Investment Consultant",
    country: "🇷🇺 Russia",
    rating: 5,
    text: "The Arabic and Russian language support was a pleasant surprise. The free zone comparison tool is comprehensive and the advice on tax residency was exactly what I needed.",
    date: "January 2025",
    avatar: "DV",
    source: "trustpilot",
  },
  {
    id: "6",
    name: "Michelle Okafor",
    role: "Marketing Director",
    country: "🇳🇬 Nigeria",
    rating: 5,
    text: "I was overwhelmed by the number of free zones. The zone picker tool narrowed it down to two options based on my activity and budget. Simple, fast, and accurate.",
    date: "February 2025",
    avatar: "MO",
    source: "google",
  },
];

const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay: index * 0.07 }}
    className="relative bg-[#111111] border border-white/[0.07] p-6 flex flex-col gap-4 hover:border-[#C87941]/20 transition-all duration-300"
    style={{ borderRadius: "2px" }}
  >
    {/* Stars */}
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < review.rating ? "fill-[#C87941] text-[#C87941]" : "text-white/10"}`}
        />
      ))}
    </div>

    {/* Review text */}
    <p
      className="text-[#b8b8b8] text-[13px] leading-relaxed flex-1"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      "{review.text}"
    </p>

    {/* Reviewer info */}
    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 bg-[#C87941]/10 text-[#C87941] border border-[#C87941]/20">
          {review.avatar}
        </div>
        <div>
          <p
            className="text-white text-[13px] font-medium leading-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {review.name}
          </p>
          <p
            className="text-[#909090] text-[11px] mt-0.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {review.role} · {review.country}
          </p>
        </div>
      </div>
      <p
        className="text-white/20 text-[10px]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {review.date}
      </p>
    </div>
  </motion.div>
);

const ReviewsSection = () => {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-20 md:py-28 bg-[#0a0a0a]">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="section-label block mb-4">Customer Reviews</span>
            <h2
              className="font-display font-light text-white leading-tight mt-2"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              Trusted by founders worldwide
            </h2>
            <p
              className="text-[#a0a0a0] mt-4 text-[14px] max-w-md leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Hundreds of entrepreneurs have used IncorpUAE to navigate their UAE business setup with confidence.
            </p>
          </div>

          {/* Aggregate rating */}
          <div
            className="flex items-center gap-5 bg-[#111111] border border-white/[0.07] px-6 py-4 flex-shrink-0"
            style={{ borderRadius: "2px" }}
          >
            <div className="text-center">
              <div
                className="font-display font-light text-white"
                style={{ fontSize: "2.5rem", letterSpacing: "-0.03em" }}
              >
                {avgRating}
              </div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-2.5 w-2.5 text-[#C87941] fill-[#C87941]" />
                ))}
              </div>
              <div
                className="text-[#909090] text-[10px] mt-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {reviews.length} reviews
              </div>
            </div>
            <div className="w-px h-10 bg-white/[0.06]" />
            <div className="text-center">
              <div
                className="font-display font-light text-white"
                style={{ fontSize: "2.5rem", letterSpacing: "-0.03em" }}
              >
                98%
              </div>
              <div
                className="text-[#909090] text-[10px] mt-1 leading-snug"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                would<br />recommend
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p
            className="text-white/20 text-[12px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Reviews collected from Google, Trustpilot, and direct client feedback.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
