import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Reel {
  id: string;
  platform: "youtube" | "instagram";
  embedId: string;
  thumbnail: string;
  name: string;
  role: string;
  quote: string;
}

const reels: Reel[] = [
  {
    id: "1",
    platform: "youtube",
    embedId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    name: "Alex M.",
    role: "SaaS Founder, UK",
    quote: "Set up my free zone company in 3 weeks — the guidance was spot on.",
  },
  {
    id: "2",
    platform: "youtube",
    embedId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    name: "Priya S.",
    role: "E-commerce Entrepreneur, India",
    quote: "Saved me from a costly mainland mistake. Worth every penny.",
  },
  {
    id: "3",
    platform: "youtube",
    embedId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    name: "Marco R.",
    role: "Consultant, Italy",
    quote: "Clear, honest advice. No fluff, no upselling.",
  },
  {
    id: "4",
    platform: "youtube",
    embedId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    name: "Sarah K.",
    role: "Agency Owner, USA",
    quote: "The cost estimator alone saved me hours of research.",
  },
];

const ReelCard = ({ reel }: { reel: Reel }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group relative flex-shrink-0 w-[220px] md:w-full"
    >
      {/* Video container — 9:16 aspect ratio */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0B1628] aspect-[9/16] shadow-xl shadow-black/30 border border-white/10">
        {!playing ? (
          <>
            <img
              src={reel.thumbnail}
              alt={`${reel.name} testimonial`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628]/90 via-[#0B1628]/20 to-transparent" />

            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={`Play ${reel.name}'s story`}
            >
              <div className="w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/30 transform transition-transform duration-200 group-hover:scale-110">
                <Play className="h-5 w-5 text-gray-900 fill-gray-900 ml-0.5" />
              </div>
            </button>

            {/* Name / role overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-semibold text-sm leading-tight">{reel.name}</p>
              <p className="text-white/55 text-xs mt-0.5">{reel.role}</p>
              <p className="text-white/75 text-xs mt-2 leading-snug italic">"{reel.quote}"</p>
            </div>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${reel.embedId}?autoplay=1&rel=0&modestbranding=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={`${reel.name} testimonial video`}
          />
        )}
      </div>
    </motion.div>
  );
};

const CustomerReels = () => {
  return (
    <section className="py-20 md:py-28 bg-[#111D3C] overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Real Founders, Real Results
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight max-w-lg mt-4">
            Hear from founders who set up in the UAE
          </h2>
          <p className="text-white/50 mt-4 text-base max-w-md leading-relaxed">
            Watch short stories from entrepreneurs who navigated the UAE business setup process with GuidePoint.
          </p>
        </motion.div>

        {/* Horizontal scroll reel strip */}
        <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible">
          {reels.map((reel) => (
            <div key={reel.id} className="snap-start">
              <ReelCard reel={reel} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex items-center gap-2"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            View all customer stories
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReels;
