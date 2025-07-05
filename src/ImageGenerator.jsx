import { generateImage } from "./apiService";
import React, { useState, useRef } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

 const handleGenerate = async () => {
  const prompt = inputRef.current.value.trim();
  if (!prompt) return;

   setLoading(true);
    try {
      const url = await generateImage(prompt); // ✅ use helper
      setImageUrl(url);
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
};


  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center px-4 py-12">
      
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI <span className="text-indigo-400">Image Generator</span>
      </motion.h1>

      <div className="w-full max-w-2xl bg-black/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/10">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            ref={inputRef}
            placeholder="Describe your image..."
            className="flex-1 p-3 text-white rounded-md w-full focus:outline-none"
          />
          <button
            onClick={handleGenerate}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white px-5 py-3 rounded-md flex items-center gap-2 shadow-md transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Generate
          </button>
        </div>

        <div className="mt-8 flex justify-center items-center h-80 bg-black/20 rounded-xl border border-white/10">
          {loading ? (
            <div className="flex items-center gap-2 text-lg text-indigo-400">
              <Loader2 className="animate-spin" /> Generating image...
            </div>
          ) : imageUrl ? (
            <motion.img
              key={imageUrl}
              src={imageUrl}
              alt="Generated"
              className="rounded-lg object-cover h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <p className="text-white/60">Image preview will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
