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
    text: "I had three different quotes from PRO services and had no idea which was fair. GuidePoint helped me pressure-test all of them and I ended up saving significantly. Highly recommend.",
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

const avatarColors = [
  "bg-emerald-500/20 text-emerald-300",
  "bg-teal-500/20 text-teal-300",
  "bg-cyan-500/20 text-cyan-300",
  "bg-blue-500/20 text-blue-300",
  "bg-violet-500/20 text-violet-300",
  "bg-rose-500/20 text-rose-300",
];

const SourceBadge = ({ source }: { source: Review["source"] }) => {
  if (source === "google") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-white/30 font-medium">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
      </span>
    );
  }
  if (source === "trustpilot") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-white/30 font-medium">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#00B67A">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
        Trustpilot
      </span>
    );
  }
  return (
    <span className="text-[10px] text-white/30 font-medium">Verified</span>
  );
};

const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay: index * 0.07 }}
    className="relative bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
  >
    {/* Quote icon */}
    <Quote className="h-5 w-5 text-emerald-400/40 flex-shrink-0" />

    {/* Stars */}
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-white/15"}`}
        />
      ))}
    </div>

    {/* Review text */}
    <p className="text-white/70 text-sm leading-relaxed flex-1">
      {review.text}
    </p>

    {/* Reviewer info */}
    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarColors[parseInt(review.id) - 1] || avatarColors[0]}`}>
          {review.avatar}
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-tight">{review.name}</p>
          <p className="text-white/40 text-xs mt-0.5">{review.role} · {review.country}</p>
        </div>
      </div>
      <div className="text-right">
        <SourceBadge source={review.source} />
        <p className="text-[10px] text-white/20 mt-0.5">{review.date}</p>
      </div>
    </div>
  </motion.div>
);

const ReviewsSection = () => {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-20 md:py-28 bg-neutral-900">
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
            <p className="text-xs font-semibold text-emerald-400 tracking-[0.15em] uppercase mb-3">
              Customer Reviews
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
              Trusted by founders worldwide
            </h2>
            <p className="text-white/45 mt-4 text-base max-w-md leading-relaxed">
              Hundreds of entrepreneurs have used GuidePoint to navigate their UAE business setup with confidence.
            </p>
          </div>

          {/* Aggregate rating */}
          <div className="flex items-center gap-4 bg-white/[0.04] border border-white/[0.07] rounded-2xl px-6 py-4 flex-shrink-0">
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-white">{avgRating}</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="text-white/35 text-xs mt-1">{reviews.length} reviews</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-emerald-400">98%</div>
              <div className="text-white/35 text-xs mt-1 leading-snug">would<br/>recommend</div>
            </div>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-white/30 text-sm">
            Reviews collected from Google, Trustpilot, and direct client feedback.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
