import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-4xl mx-auto py-20 space-y-8 px-4"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Discover Your Perfect Neighborhood
      </h1>

      <p className="text-lg md:text-xl text-white/90 leading-relaxed">
        NeighborFit finds your best-fit neighborhood using lifestyle preferences. It's fast, smart, and personalized — just the way it should be.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <a
          href="#preferences"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg text-lg transition shadow-md"
        >
          Get Started
        </a>
        <a
          href="/neighborhoods"
          className="border border-white/60 hover:border-white px-6 py-3 rounded-lg text-white/80 hover:text-white transition"
        >
          Browse All
        </a>
      </div>
    </motion.div>
  );
}
