import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const reels = [
  {
    id: "reel1",
    src: "/reels/reel1.mp4",
    name: "James Mitchell",
    role: "Tech Startup Founder",
    location: "🇬🇧 UK → Dubai",
    quote: "Within 6 weeks I was fully operational. The cost estimator saved me from a $20k mistake.",
  },
  {
    id: "reel2",
    src: "/reels/reel2.mp4",
    name: "Priya Sharma",
    role: "E-commerce Entrepreneur",
    location: "🇮🇳 India → Dubai",
    quote: "I saved over AED 15,000 in setup costs just by using their platform.",
  },
  {
    id: "reel3",
    src: "/reels/reel3.mp4",
    name: "Marcus Weber",
    role: "Consulting Agency Owner",
    location: "🇩🇪 Germany → Dubai",
    quote: "Within 2 months I had my trade license, office, and residency visa.",
  },
  {
    id: "reel4",
    src: "/reels/reel4.mp4",
    name: "Sarah Al-Rashid",
    role: "Marketing Consultant",
    location: "🇦🇺 Australia → Dubai",
    quote: "The whole process took less than 3 weeks. My only regret is not doing it sooner.",
  },
];

function ReelCard({ reel }: { reel: (typeof reels)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex-shrink-0 w-[240px] sm:w-[260px] md:w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group border border-white/10"
      style={{ aspectRatio: "9/16" }}
      onClick={togglePlay}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.src}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628]/90 via-[#0B1628]/20 to-transparent pointer-events-none" />

      {/* Play/Pause button */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-amber-400/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-amber-400/30 transform group-hover:scale-110 transition-transform duration-200">
          {playing ? (
            <Pause className="h-6 w-6 text-gray-900 fill-gray-900" />
          ) : (
            <Play className="h-6 w-6 text-gray-900 fill-gray-900 ml-1" />
          )}
        </div>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
      >
        {muted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </button>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        {/* Stars */}
        <div className="text-amber-400 text-sm mb-2">★★★★★</div>
        {/* Quote */}
        <p className="text-white/85 text-xs leading-relaxed mb-3 italic line-clamp-3">
          "{reel.quote}"
        </p>
        {/* Divider */}
        <div className="w-8 h-0.5 bg-amber-400 mb-2" />
        {/* Name */}
        <p className="text-white font-bold text-sm">{reel.name}</p>
        {/* Role */}
        <p className="text-amber-400 text-xs mt-0.5">{reel.role}</p>
        {/* Location */}
        <p className="text-white/50 text-xs mt-0.5">{reel.location}</p>
      </div>
    </motion.div>
  );
}

const CustomerReels = () => {
  return (
    <section className="py-20 md:py-28 bg-[#080F1E] overflow-hidden">
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
            Hear from founders who{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
              set up in the UAE
            </span>
          </h2>
          <p className="text-white/55 mt-4 text-base max-w-md leading-relaxed">
            Watch short stories from entrepreneurs who navigated the UAE business
            setup process with IncorporateUAE.
          </p>
        </motion.div>

        {/* Reel cards */}
        <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible">
          {reels.map((reel) => (
            <div key={reel.id} className="snap-start">
              <ReelCard reel={reel} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReels;
