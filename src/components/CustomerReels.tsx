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
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
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
      className="relative flex-shrink-0 w-[240px] sm:w-[260px] md:w-full overflow-hidden cursor-pointer group border border-white/[0.07] hover:border-[#C87941]/20 transition-colors duration-300"
      style={{ aspectRatio: "9/16", borderRadius: "2px" }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={reel.src}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/20 to-transparent pointer-events-none" />

      {/* Play/Pause button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
        <div className="w-12 h-12 border border-white/20 bg-white/[0.08] backdrop-blur-md flex items-center justify-center transform group-hover:border-[#C87941]/40 transition-all duration-200"
          style={{ borderRadius: "2px" }}
        >
          {playing
            ? <Pause className="h-5 w-5 text-white" strokeWidth={1.5} />
            : <Play className="h-5 w-5 text-white ml-0.5" strokeWidth={1.5} />
          }
        </div>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 w-7 h-7 border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-[#c8c8c8] hover:text-white hover:border-white/25 transition-colors z-10"
        style={{ borderRadius: "2px" }}
      >
        {muted ? <VolumeX className="h-3.5 w-3.5" strokeWidth={1.5} /> : <Volume2 className="h-3.5 w-3.5" strokeWidth={1.5} />}
      </button>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-2.5 h-2.5 fill-[#C87941]" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
          ))}
        </div>
        <p className="text-[#c8c8c8] text-[11px] leading-relaxed mb-3 italic line-clamp-3"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          "{reel.quote}"
        </p>
        <div className="w-5 h-px bg-[#C87941] mb-2.5" />
        <p className="text-white text-[13px] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{reel.name}</p>
        <p className="text-[#C87941] text-[11px] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{reel.role}</p>
        <p className="text-[#909090] text-[11px] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{reel.location}</p>
      </div>
    </motion.div>
  );
}

const CustomerReels = () => {
  return (
    <section className="py-20 md:py-28 bg-[#0f0f0f] overflow-hidden border-y border-white/[0.06]">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-label block mb-4">Real Founders, Real Results</span>
          <h2
            className="font-display font-light text-white leading-tight max-w-lg mt-2"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Hear from founders who{" "}
            <em className="not-italic gradient-text">set up in the UAE</em>
          </h2>
          <p
            className="text-[#a0a0a0] mt-4 text-[14px] max-w-md leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Watch short stories from entrepreneurs who navigated the UAE business setup process with IncorpUAE.
          </p>
        </motion.div>

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
